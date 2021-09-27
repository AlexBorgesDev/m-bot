import { Guild, TextBasedChannels } from 'discord.js'
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} from '@discordjs/voice'

import ytdl from 'ytdl-core'

import songQueue, { SongObj } from '../queues/song.queue'
import playerView from '../views/player.view'

export type PlayServiceProps = {
  channel: TextBasedChannels
  guild: Guild
  song: SongObj
}

async function playService({ channel, guild, song }: PlayServiceProps) {
  const serverSongQueue = songQueue.get(guild.id)
  if (!serverSongQueue || !serverSongQueue.voiceConnection) return

  const audioStream = ytdl(song.data.url, { filter: 'audioonly' })
  const audioResource = createAudioResource(audioStream, { inlineVolume: true })

  serverSongQueue.audioResource = audioResource

  const player = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
  })

  player.on('error', error => {
    serverSongQueue.playing = false
    channel.send(error.message)
  })

  player.on(AudioPlayerStatus.Idle, () => {
    const nextServerSongQueue = songQueue.get(guild.id)
    if (!nextServerSongQueue) return
    else if (nextServerSongQueue.songs.length <= 1) return

    nextServerSongQueue.songs.shift()
    playService({ channel, guild, song: nextServerSongQueue.songs[0] })
  })

  player.play(audioResource)
  serverSongQueue.player = player

  serverSongQueue.voiceConnection.subscribe(player)
  serverSongQueue.playing = true

  await playerView({ channel, song })
}

export default playService
