import { MessageEmbed, TextBasedChannels } from 'discord.js'

import { SongObj } from '../queues/song.queue'

export type AddSongQueueViewProps = {
  channel: TextBasedChannels
  data: SongObj
  index: number
}

async function addSongQueueView({
  channel,
  data,
  index,
}: AddSongQueueViewProps) {
  const embed = new MessageEmbed()
    .setAuthor(`Queued at position #${index}`, data.user.imageURL || undefined)
    .setColor('BLUE')
    .setDescription(
      `[${data.data.title}](${data.data.url}) by [${data.data.author.name}](${data.data.author.url}) [${data.data.duration.timestamp}]`
    )

  channel.send({ embeds: [embed] })
}

export default addSongQueueView
