import { Client, Intents } from 'discord.js'
import { config } from 'dotenv'

/* Events imports */
import messageCreate from './events/messageCreate'

// Read environment variables from .env file
config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  restTimeOffset: 0,
})

client.once('ready', () => console.log(`Logged in as ${client.user?.tag}`))

client.on('messageCreate', messageCreate)

client.login(process.env.BOT_TOKEN)
