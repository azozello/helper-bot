import TelegramBot from "node-telegram-bot-api"
import {unwrapIds} from "../../../utils"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {createButton, createButtonsForm} from "../../markup"
import {ROOTS} from "../../router/roots"


const showLanguageMenu = (bot: TelegramBot) => async ({from, message, language}: any) => {
  const {chatId} = unwrapIds(from, message)
  const translated = getTranslator(language || Languages.ENG)

  const form = createButtonsForm([
    createButton({text: 'language.russian', action: ROOTS.SHOW_MAIN_MENU}),
    createButton({text: 'language.english', action: ROOTS.SHOW_MAIN_MENU}),
    createButton({text: 'language.slovak', action: ROOTS.SHOW_MAIN_MENU}),
    createButton({text: 'language.ukrainian', action: ROOTS.SHOW_MAIN_MENU}),
    createButton({text: 'language.back', action: ROOTS.SHOW_MAIN_MENU})
  ])

  return await bot.sendMessage(chatId, translated('language.select'), form)
}


export {showLanguageMenu}
