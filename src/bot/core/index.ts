import TelegramBot from "node-telegram-bot-api"
import {ROOTS} from "./router/roots"
import {showSubjectMenu} from "./controllers/ui/select-subject"
import {showTaskMenu} from "./controllers/ui/select-task"
import {mapController} from "./router/router"
import {composedEnhancers} from "./request-enhancers"
import {showTaskDetail} from "./controllers/ui/task-detail"
import {showLanguageMenu} from "./controllers/ui/language"
import {showMainMenu} from "./controllers/ui/main-menu"
import {composeAsync} from "../utils"
import {doSetLanguage} from "./controllers/api/language"
import {UserRole} from "./user-roles"
import {saveTaskSolution} from "./controllers/files/files"
import {doCreateOrder} from "./controllers/api/order"


const initApiCallback = (controllers: any) => async (request: any) => {
  const modifiedRequest = await composedEnhancers(request)
  return await controllers(modifiedRequest)
}


const initUICallback = (bot: TelegramBot) => async (rawRequest: any) => {
  const request = await composedEnhancers(rawRequest)
  const {text} = request

  if (request.document && request.caption) {
    saveTaskSolution(bot)(request)
  } else if (text && typeof text === 'string' && text.startsWith('/')) {
    showMainMenu(bot)(request)
  } else {
    console.log('Hello')
  }
}


const initControllers = (bot: TelegramBot) => {
  const composedControllers = composeAsync(
    mapController(ROOTS.SHOW_SUBJECTS, showSubjectMenu(bot)),
    mapController(ROOTS.SHOW_TASKS, showTaskMenu(bot)),
    mapController(ROOTS.SHOW_TASK_DETAILS, showTaskDetail(bot)),
    mapController(ROOTS.SHOW_MAIN_MENU, showMainMenu(bot)),
    mapController(ROOTS.SHOW_LANGUAGE_MENU, showLanguageMenu(bot)),

    mapController(ROOTS.DO_SET_LANGUAGE, doSetLanguage(bot)),
    mapController(ROOTS.DO_CREATE_ORDER, doCreateOrder(bot))
  )

  bot.on('callback_query', initApiCallback(composedControllers))
  bot.on('message', initUICallback(bot))
}


export {initControllers}
