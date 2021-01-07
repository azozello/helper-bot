import {Subject} from "../../../models/Subject"
import TelegramBot from "node-telegram-bot-api"
import {unwrapIds} from "../../../utils"
import {createButton, createButtonsForm} from "../../markup"
import {ROOTS} from "../../router/roots"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {getTasks} from "./select-task"

/*
 * TODO: Store in database
 */
const getSubjects = (): Array<Subject> => {
  return [
    {
      name: 'OOP',
      id: 'oop',
      tasks: getTasks('oop')
    },
    {
      name: 'ZAP',
      id: 'zap',
      tasks: getTasks('zap')
    },
    {
      name: 'Database',
      id: 'database',
      tasks: getTasks('database')
    },
    {
      name: 'Programming',
      id: 'programming',
      tasks: getTasks('database')
    },
  ]
}


const createTaskUrl = (id: string) => {
  return `${ROOTS.SHOW_TASKS}?subject=${id}`
}

const mapSubjectToButton = (subject: Subject) => {
  return createButton({text: subject.name, action: createTaskUrl(subject.id)})
}


const showSubjectMenu = (bot: TelegramBot) => async ({from, message, user}: any) => {
  const {chatId} = unwrapIds(from, message)
  const translated = getTranslator(user.language || Languages.ENG)

  const buttons = [
    ...getSubjects().map(mapSubjectToButton),
    createButton({text: translated('subjects.back'), action: ROOTS.SHOW_MAIN_MENU})
  ]
  const form = createButtonsForm(buttons)

  return await bot.sendMessage(chatId, translated('subjects.select'), form)
}


export {getSubjects, showSubjectMenu}


