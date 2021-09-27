import { Message } from 'discord.js'

import { prefix } from '../configs/configs.json'

/* Controllers */
import playController from '../controllers/play.controller'

async function messageCreate(message: Message): Promise<void> {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (!command) return

  if (command === 'play') await playController(args, message)
  else await message.channel.send('**Command does not exist**')
}

export default messageCreate
