import { GuildMember, MessageEmbed, TextBasedChannels } from 'discord.js'

async function helpView(channel: TextBasedChannels, member?: GuildMember) {
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Help', member?.user.avatarURL() || undefined)
    .addFields(
      {
        name: '`!play <value>`',
        value:
          'Use the *play* command by entering the name of a song to add it to a new playlist or an existing one.',
      },
      {
        name: '`!playlist <listId>`',
        value:
          'Use the *playlist* command, informing the id to add it to a new or existing playlist.',
      },
      {
        name: '`!skip`',
        value: 'Use the *skip* command to skip the song being played.',
      },
      {
        name: '`!volume <value>`',
        value:
          'Use the *volume* command by passing a new volume to the player.',
      },
      {
        name: '`!help`',
        value:
          'Use the *help* command to see all commands and what each one does.',
      }
    )

  return await channel.send({ embeds: [embed] })
}

export default helpView
