import config from './config'
import { Bot } from './bot'

const bot: Bot = new Bot(config.prefix, config.token)

bot.start()
