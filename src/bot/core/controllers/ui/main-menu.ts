import TelegramBot from "node-telegram-bot-api"
import {unwrapIds} from "../../../utils"
import {createButton, createButtonsForm} from "../../markup"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {ROOTS} from "../../router/roots"


const showMainMenu = (bot: TelegramBot) => async ({from, message, language}: any) => {
  const {chatId} = unwrapIds(from, message)
  const translated = getTranslator(language || Languages.ENG)

  const form = createButtonsForm([
    createButton({text: 'main.subjects', action: ROOTS.SHOW_SUBJECTS}),
    createButton({text: 'main.language', action: ROOTS.SHOW_LANGUAGE_MENU})
  ])

  return await bot.sendMessage(chatId, translated('main.menu'), form)
}


export {showMainMenu}
