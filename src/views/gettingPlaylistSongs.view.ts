import { MessageEmbed, TextBasedChannels } from 'discord.js'
import { Author } from 'yt-search'

export type GettingPlaylistSongsProps = {
  channel: TextBasedChannels
  title: string
  author: Author
  userImageUrl?: string
}

async function gettingPlaylistSongsView(props: GettingPlaylistSongsProps) {
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Getting songs from the playlist:', props.userImageUrl)
    .setDescription(`${props.title} by ${props.author.name}`)

  await props.channel.send({ embeds: [embed] })
}

export default gettingPlaylistSongsView
