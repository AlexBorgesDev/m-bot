import { joinVoiceChannel } from '@discordjs/voice'
import { Message } from 'discord.js'

import songQueue, { SongObj, SongQueue } from '../queues/song.queue'
import playService from '../services/play.service'
import searchService from '../services/search.service'
import addSongQueueView from '../views/addSongQueue.view'

async function playController(args: string[], message: Message) {
  const { member, channel, client, guild } = message

  if (!member || !member.voice.channel || !client.user || !guild)
    return channel.send('You need to be in a voice channel to play music!')

  const permissions = member.voice.channel.permissionsFor(client.user)

  if (!permissions?.has('CONNECT') || !permissions.has('SPEAK'))
    return channel.send(
      'I need the permissions to join and speak in your voice channel!'
    )

  const serverSongQueue = songQueue.get(guild.id)

  if (serverSongQueue && serverSongQueue.player && !args.join(' ')) {
    serverSongQueue.player.unpause()
    return channel.send('The song was played again')
  } else if (!args.join(' ') || serverSongQueue?.songs.length === 0)
    return channel.send('There is no paused song to be played again')

  const song = await searchService.findOne(args.join(' ').trim())

  if (serverSongQueue) {
    const songQueueData: SongObj = {
      data: song,
      user: { name: member.user.username, imageURL: member.user.avatarURL() },
    }

    serverSongQueue.songs.push(songQueueData)
    return addSongQueueView({
      channel,
      data: songQueueData,
      index: serverSongQueue.songs.length,
    })
  }

  const songQueueConstructor: SongQueue = {
    songs: [
      {
        data: song,
        user: { name: member.user.username, imageURL: member.user.avatarURL() },
      },
    ],
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

    await playService({ channel, guild, song: songQueueConstructor.songs[0] })
  } catch (error: any) {
    return channel.send(error.message)
  }
}

export default playController
