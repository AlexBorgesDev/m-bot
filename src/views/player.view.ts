import { MessageEmbed, TextBasedChannels } from 'discord.js'

import { SongObj } from '../queues/song.queue'

export type PlayerViewProps = {
  channel: TextBasedChannels
  song: SongObj
}

async function playerView({ channel, song }: PlayerViewProps) {
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Playing', song.user.imageURL || undefined)
    .setDescription(
      `[${song.data.title}](${song.data.url}) by [${song.data.author.name}](${song.data.author.url}) [${song.data.duration.timestamp}]`
    )

  await channel.send({ embeds: [embed] })
}

export default playerView
