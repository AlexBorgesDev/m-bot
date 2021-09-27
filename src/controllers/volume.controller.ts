import { Message } from 'discord.js'

import songQueue from '../queues/song.queue'
import setVolumeView from '../views/setVolume.view'

async function volumeController(args: string[], message: Message) {
  const { channel, member, guild } = message

  if (!guild || !member)
    return await channel.send('There is no music list to change the volume')

  const serverSongQueue = songQueue.get(guild.id)

  if (!serverSongQueue || !serverSongQueue.audioResource)
    return await channel.send('There is no music list to change the volume')

  const volume = Number(args[0])

  if (volume > 100) return message.channel.send('The maximum volume is 100')
  else if (volume < 0) return message.channel.send('The minimum volume is 0')

  serverSongQueue.volume = volume
  serverSongQueue.audioResource.volume?.setVolume(volume / 100)

  return await setVolumeView({
    channel,
    user: {
      name: member.user.username,
      imageURL: member.user.avatarURL() || undefined,
    },
    volume,
  })
}

export default volumeController
