import { Message } from 'discord.js'

import songQueue from '../queues/song.queue'

async function skipController(args: string[], message: Message) {
  const { channel, guild } = message

  if (!guild) return

  const serverSongQueue = songQueue.get(guild.id)

  if (
    !serverSongQueue ||
    !serverSongQueue.player ||
    !serverSongQueue.audioStream
  )
    return await channel.send('There are no songs to skip!')

  serverSongQueue.audioStream.destroy()
  serverSongQueue.player.stop(true)
}

export default skipController
