import {actionToRepresentation} from "../utils";
import TelegramBot from "node-telegram-bot-api";


interface IUI {
  respond(chatId: string, action: string): any
}


/**
 * Create a wrapper upon telegram bot UI.
 *
 * @param {TelegramBot} bot
 * @param {Node} root
 *
 */
function BotUI(bot: TelegramBot, root: any): IUI {
  const respond = async (chatId: string, action: string) => {
    const {text, form} = actionToRepresentation(root, action)

    if (text && form) {
      return await bot.sendMessage(chatId, text, form)
    }
  }

  return {respond}
}


const deleteMessageEnhancer = (createBotFunction: any) => {

  return function (bot: TelegramBot, root: any) {
    const ui = createBotFunction(bot, root)
    const lastMessageMap = new Map()

    const respond = async (chatId: any, action: any) => {
      const lastMessageId = lastMessageMap.get(chatId)

      if (lastMessageId) {
        await bot.deleteMessage(chatId, lastMessageId)
      }

      const message = await ui.respond(chatId, action)
      lastMessageMap.set(chatId, message.message_id)

      return message
    }

    return {...ui, respond}
  }
}


export {BotUI, IUI, deleteMessageEnhancer}