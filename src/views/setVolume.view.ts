import { MessageEmbed, TextBasedChannels } from 'discord.js'

import { SongObj } from '../queues/song.queue'

export type SetVolumeViewProps = {
  channel: TextBasedChannels
  user: SongObj['user']
  volume: number
}

async function setVolumeView({ channel, user, volume }: SetVolumeViewProps) {
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Changed volume', user.imageURL || undefined)
    .setDescription(`**${user.name} set the volume to ${volume}!**`)

  await channel.send({ embeds: [embed] })
}

export default setVolumeView
