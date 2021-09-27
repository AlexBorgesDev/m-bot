import { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice'
import { Message, StageChannel, VoiceChannel } from 'discord.js'

import { YTSearchResult } from '../services/search.service'

export type SongQueue = {
  songs: { user: { name: string; imageURL?: string }; data: YTSearchResult }[]
  volume: number
  player?: AudioPlayer
  playing: boolean
  textChannel: Message['channel']
  voiceChannel: VoiceChannel | StageChannel
  audioResource?: AudioResource
  voiceConnection?: VoiceConnection
}

const songQueue = new Map<string, SongQueue>()

export default songQueue
