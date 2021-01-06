import TelegramBot from "node-telegram-bot-api"
import {getUrlParameter, unwrapIds} from "../../../utils"
import {createOrder} from "../../../../database/order/methods"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"

const doCreateOrder = (bot: TelegramBot) => async (request: any) => {
  const {from, message, data, id, user} = request || {}

  const translated = getTranslator(user.language || Languages.ENG)

  const {userId} = unwrapIds(from, message)
  const taskId = getUrlParameter(data || '', 'taskId')

  const newOrder = await createOrder({
    taskId, userId,
    timestamp: Date.now(),
    isPayed: false,
  })
  return await bot.answerCallbackQuery({
    callback_query_id: id,
    text: `${translated('order.created')} : ${newOrder._id}`,
    show_alert: true
  })
}


export {doCreateOrder}
