import { MessageEmbed, TextBasedChannels } from 'discord.js'
import { Author } from 'yt-search'

export type AddPlaylistSongsQueueProps = {
  channel: TextBasedChannels
  title: string
  author: Author
  userImageUrl?: string
}

async function addPlaylistSongsQueueView(props: AddPlaylistSongsQueueProps) {
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Added the songs from the playlist:', props.userImageUrl)
    .setDescription(`${props.title} by ${props.author.name}`)

  await props.channel.send({ embeds: [embed] })
}

export default addPlaylistSongsQueueView
