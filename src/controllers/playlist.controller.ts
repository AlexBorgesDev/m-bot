import { VideoSearchResult } from 'yt-search'
import { joinVoiceChannel } from '@discordjs/voice'
import { Message } from 'discord.js'

import songQueue, { SongQueue } from '../queues/song.queue'
import playService from '../services/play.service'
import searchService from '../services/search.service'
import addPlaylistSongsQueueView from '../views/addPlaylistSongsQueue.view'
import gettingPlaylistSongsView from '../views/gettingPlaylistSongs.view'

async function playlistController(args: string[], message: Message) {
  const { member, channel, client, guild } = message

  if (!member || !member.voice.channel || !client.user || !guild)
    return channel.send('You need to be in a voice channel to play music!')

  const permissions = member.voice.channel.permissionsFor(client.user)

  if (!permissions?.has('CONNECT') || !permissions.has('SPEAK'))
    return await channel.send(
      'I need the permissions to join and speak in your voice channel!'
    )

  if (args.length <= 0)
    return await channel.send('Enter the id of the playlist')

  const serverSongQueue = songQueue.get(guild.id)
  const playlist = await searchService.findPlaylist(args[0])

  if (!playlist) return channel.send('**Playlist not found**')

  await gettingPlaylistSongsView({
    channel,
    author: playlist.author,
    title: playlist.title,
    userImageUrl: member.user.avatarURL() || undefined,
  })

  const playlistSong: VideoSearchResult[] = []

  for (const song of playlist.videos) {
    const result = await searchService.findById(song.videoId)
    playlistSong.push({ ...result, type: 'video' })
  }

  const user = {
    name: member.user.username,
    imageURL: member.user.avatarURL(),
  }

  if (serverSongQueue) {
    playlistSong.forEach(song =>
      serverSongQueue.songs.push({ data: song, user })
    )

    if (!serverSongQueue.player) {
      await playService({
        channel,
        guild,
        song: { data: serverSongQueue.songs[0].data, user },
      })
    } else if (!serverSongQueue.playing) serverSongQueue.player.unpause()

    return await addPlaylistSongsQueueView({
      channel,
      author: playlist.author,
      title: playlist.title,
      userImageUrl: member.user.avatarURL() || undefined,
    })
  }

  const songQueueConstructor: SongQueue = {
    songs: playlistSong.map(song => ({ data: song, user })),
    volume: 75,
    playing: false,
    textChannel: channel,
    voiceChannel: member.voice.channel,
  }

  try {
    const voiceConnection = joinVoiceChannel({
      guildId: guild.id,
      channelId: member.voice.channel.id,
      adapterCreator: guild.voiceAdapterCreator,
    })

    songQueueConstructor.voiceConnection = voiceConnection
    songQueue.set(guild.id, songQueueConstructor)

    await addPlaylistSongsQueueView({
      channel,
      author: playlist.author,
      title: playlist.title,
      userImageUrl: member.user.avatarURL() || undefined,
    })

    await playService({ channel, guild, song: songQueueConstructor.songs[0] })
  } catch (error: any) {
    return await channel.send(error.message)
  }
}

export default playlistController
