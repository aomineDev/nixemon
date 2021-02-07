import config from './config'
import Bot from './bot'

const { bot: { prefix, token } } = config

const bot: Bot = new Bot(prefix, token)

bot.start()
