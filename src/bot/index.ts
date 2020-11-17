import TelegramBot from 'node-telegram-bot-api'
import config from 'config'

import {ActionQueue, IActionQueue} from '../utils/action-queue'
import {buildTree} from "./core/ui";
import {Actions} from "./core/actions/actions";
import {compose} from "./core/utils";
import {BotUI, deleteMessageEnhancer, IUI} from "./core/ui/ui";


const token: string = config.get('telegram.key')
const options = {
    polling: true
}


async function startBot() {
    const bot = new TelegramBot(token, options)

    const actionQueue: IActionQueue = ActionQueue()

    const root = buildTree()

    addMessageHandler(bot, root, actionQueue)
}

/**
 *
 * @param {TelegramBot} bot
 * @param {Node} root
 * @param {ActionQueue} actionQueue
 */
const addMessageHandler = (bot: TelegramBot, root: any, actionQueue: IActionQueue) => {
    const enhancers = compose(deleteMessageEnhancer)
    const ui = enhancers(BotUI)(bot, root)

    bot.on('callback_query', onCallbackQuery(ui))
    bot.on('message', onMessage(ui))
}

const onMessage = (ui: IUI) => async ({from, chat, text}: any) => {
    const chatId = chat.id

    await ui.respond(chatId, Actions.SUBJECTS.SHOW_ROOT)
}

const onCallbackQuery = (ui: any) => async ({from, message, data}: any) => {
    const chatId = message.chat.id
    const userId = from.id

    await ui.respond(chatId, data)
}


export {startBot}
