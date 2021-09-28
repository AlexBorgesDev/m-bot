import { AudioPlayer, AudioResource, VoiceConnection } from '@discordjs/voice'
import { Message, StageChannel, VoiceChannel } from 'discord.js'
import { VideoSearchResult } from 'yt-search'
import { Readable } from 'stream'

export type SongObj = {
  user: { name: string; imageURL?: string | null }
  data: VideoSearchResult
}

export type SongQueue = {
  songs: SongObj[]
  volume: number
  player?: AudioPlayer | null
  playing: boolean
  textChannel: Message['channel']
  audioStream?: Readable
  voiceChannel: VoiceChannel | StageChannel
  audioResource?: AudioResource | null
  voiceConnection?: VoiceConnection | null
}

const songQueue = new Map<string, SongQueue>()

export default songQueue
