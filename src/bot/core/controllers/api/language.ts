import {update} from "../../../../database/user/methods"
import TelegramBot from "node-telegram-bot-api"
import {getUrlParameter, unwrapIds} from "../../../utils"
import {showMainMenu} from "../ui/main-menu"
import {Languages} from "../../../translator/languages"


const userLanguageLens = (request: any, language: Languages) => {
  return {
    ...request,
    user: {
      ...request.user,
      language: language
    }
  }
}

const doSetLanguage = (bot: TelegramBot) => async (request: any) => {
  const {from, message, data} = request || {}
  const {userId} = unwrapIds(from, message)
  const language = getUrlParameter(data || '', 'language')

  await update(userId, {language: +language})

  return await showMainMenu(bot)(userLanguageLens(request, +language))
}

export {doSetLanguage}
