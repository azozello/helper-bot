import TelegramBot from "node-telegram-bot-api"
import {getUrlParameter, unwrapIds} from "../../../utils"
import {createButton, createButtonsForm} from "../../markup"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {ROOTS} from "../../router/roots"


const showTaskDetail = (bot: TelegramBot) => async ({from, message, data, language}: any) => {
  const {chatId} = unwrapIds(from, message)

  const translated = getTranslator(language || Languages.ENG)

  const subjectId: string = getUrlParameter(data || '', 'subject')
  const taskId: string = getUrlParameter(data || '', 'task')

  const form = createButtonsForm([
    createButton({
      text: translated('tasks.details.order'),
      action: `${ROOTS.DO_CREATE_ORDER}?taskId=${taskId}`
    }),
    createButton({
      text: translated('tasks.details.back'),
      action: `${ROOTS.SHOW_TASKS}?subject=${subjectId}`
    })
  ])

  return await bot.sendMessage(chatId, `${taskId} - ${translated('tasks.details.info')}`, form)
}


export {showTaskDetail}

