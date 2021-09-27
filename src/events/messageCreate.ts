import { Message } from 'discord.js'

import { prefix } from '../configs/configs.json'

async function messageCreate(message: Message): Promise<void> {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (!command) return
}

export default messageCreate
