import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import {initControllers} from "./core"


const token: string = config.get('telegram.key')
const options = {
  polling: true
}


async function startBot() {
  const bot = new TelegramBot(token, options)

  // const actionQueue: IActionQueue = ActionQueue()

  initControllers(bot)
}


export {startBot}
