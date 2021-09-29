import { Message } from 'discord.js'

import helpView from '../views/help.view'

async function helpController(message: Message) {
  return await helpView(message.channel, message.member || undefined)
}

export default helpController
