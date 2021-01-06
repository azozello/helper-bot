import TelegramBot from "node-telegram-bot-api"
import {unwrapIds} from "../../../utils"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {createButton, createButtonsForm} from "../../markup"
import {ROOTS} from "../../router/roots"
import {getOrdersByUserId} from "../../../../database/order/methods"


const showOrdersMenu = (bot: TelegramBot) => async ({from, message, data, language}: any) => {
  const {chatId, userId} = unwrapIds(from, message)
  const translated = getTranslator(language || Languages.ENG)

  const orders = await getOrdersByUserId(userId)
  const ordersText = orders
    .map((order: any) => `\n userId: ${order.userId}\n taskId : ${order.taskId}\n isPayed: ${order.isPayed}\n fileId : ${order.fileId}\n`)
    .reduce((acc, cur) => `${acc}${cur}`)

  const form = createButtonsForm([
    createButton({text: 'orders.back', action: ROOTS.SHOW_MAIN_MENU})
  ])

  return await bot.sendMessage(chatId, `${translated('tasks.select')}\n${ordersText}`, form)
}


export {showOrdersMenu}
