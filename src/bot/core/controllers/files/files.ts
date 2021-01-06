import TelegramBot from "node-telegram-bot-api"
import {addFileToOrder, getOrderById, markOrderAsPayed} from "../../../../database/order/methods"
import config from 'config'
import * as fs from "fs"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"


const staticFolder = `${config.get('telegram.root')}/solutions/`


const createFileName = ({file_name, file_id}: any): string => {
  const [name, extension] = file_name.split('.')

  return `${file_id}.${extension}`
}


const writeFile = (bot: TelegramBot) => async (document: any) => {
  const readable = await bot.getFileStream(document.file_id)
  const writable = fs.createWriteStream(`${staticFolder}${createFileName(document)}`)
  readable.pipe(writable)
}


const saveTaskSolution = (bot: TelegramBot) => async (request: any) => {
  const {from, document, caption, user} = request
  const translated = getTranslator(user.language || Languages.ENG)

  const order = await getOrderById(caption)

  if (order) {
    await writeFile(bot)(document)
    await addFileToOrder(order._id, document.file_id)
    await markOrderAsPayed(order._id)
    await bot.sendMessage(from.id, `${translated('order.file.payed')} - ${translated('order.file.added')}`)
  }
}


export {saveTaskSolution}
