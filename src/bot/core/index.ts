import TelegramBot from "node-telegram-bot-api"
import {ROOTS} from "./router/roots"
import {showSubjectMenu} from "./controllers/ui/select-subject"
import {showTaskMenu} from "./controllers/ui/select-task"
import {mapController} from "./router/router"
import {createButton, createButtonsForm} from "./markup"
import {composedEnhancers} from "./request-enhancers"
import {showTaskDetail} from "./controllers/ui/task-detail"
import {showLanguageMenu} from "./controllers/ui/language"
import {showMainMenu} from "./controllers/ui/main-menu"
import {composeAsync} from "../utils"


const initApiCallback = (controllers: any) => async (request: any) => {
  const modifiedRequest = await composedEnhancers(request)
  return await controllers(modifiedRequest)
}


const initUICallback = (bot: TelegramBot) => async (request: any) => {
  const {chat} = await composedEnhancers(request)

  const buttons = [createButton({text: 'Back to subjects', action: 'ui/subjects'})]
  const form = createButtonsForm(buttons)

  await bot.sendMessage(chat.id, 'Select tasks', form)
}


const initControllers = (bot: TelegramBot) => {
  const composedControllers = composeAsync(
    mapController(ROOTS.SHOW_SUBJECTS, showSubjectMenu(bot)),
    mapController(ROOTS.SHOW_TASKS, showTaskMenu(bot)),
    mapController(ROOTS.SHOW_TASK_DETAILS, showTaskDetail(bot)),
    mapController(ROOTS.SHOW_MAIN_MENU, showMainMenu(bot)),
    mapController(ROOTS.SHOW_LANGUAGE_MENU, showLanguageMenu(bot)),
  )

  bot.on('callback_query', initApiCallback(composedControllers))
  bot.on('message', initUICallback(bot))
}


export {initControllers}
