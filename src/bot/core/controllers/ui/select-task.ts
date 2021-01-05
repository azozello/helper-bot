import TelegramBot from "node-telegram-bot-api"
import {getUrlParameter, unwrapIds} from "../../../utils"
import {createButton, createButtonsForm} from "../../markup"
import {getTranslator} from "../../../translator"
import {Task} from "../../../models/Task"
import {Languages} from "../../../translator/languages"
import {ROOTS} from "../../router/roots"


/*
 * TODO: Store in database
 */
const getTasks = (subjectId: string): Array<Task> => {
  switch (subjectId) {
    case 'oop':
      return [
        {name: 'Training', id: 'training'},
        {name: 'Project Alien', id: 'project_alien'}
      ]

    case 'zap':
      return [
        {name: 'Karel the robot', id: 'karel_the_robot'},
        {name: 'Numbers, Arrays', id: 'numberArrays'},
        {name: 'Hangman', id: 'hangman'},
        {name: 'QR code', id: 'qrCode'},
        {name: 'Files', id: 'files'},
        {name: 'Curses', id: 'curses'}
      ]

    case 'database':
      return [
        {name: 'KPI', id: 'database_kpi'},
        {name: 'KKUI', id: 'database_kkui'}
      ]

    case 'programming':
      return [
        {name: 'Top Secret', id: 'topSecret'},
        {name: 'K-chko', id: 'k'},
        {name: 'Some problems to solve', id: 'someProblems'},
        {name: 'BMP Transform', id: 'bmpTransform'},
        {name: 'Adventure', id: 'adventure'},
        {name: 'Master Mind', id: 'masterMind'},
        {name: 'Music Player', id: 'musicPlayer'}
      ]

    default:
      return []
  }
}

const createButtonMapper = (subject: string) => (task: Task) => {
  return createButton({
    text: task.name,
    action: `${ROOTS.SHOW_TASK_DETAILS}?subject=${subject}&task=${task.id}`
  })
}


const showTaskMenu = (bot: TelegramBot) => async ({from, message, data, language}: any) => {
  const {chatId} = unwrapIds(from, message)
  const translated = getTranslator(language || Languages.ENG)
  const subjectId: string = getUrlParameter(data || '', 'subject')

  const form = createButtonsForm([
    ...getTasks(subjectId).map(createButtonMapper(subjectId)),
    createButton({text: 'tasks.details.back', action: ROOTS.SHOW_SUBJECTS})
  ])

  return await bot.sendMessage(chatId, translated('tasks.select'), form)
}


export {getTasks, showTaskMenu}
