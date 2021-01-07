import TelegramBot from "node-telegram-bot-api"
import {unwrapIds} from "../../../utils"
import {getTranslator} from "../../../translator"
import {Languages} from "../../../translator/languages"
import {createButton, createButtonsForm} from "../../markup"
import {ROOTS} from "../../router/roots"


const showLanguageMenu = (bot: TelegramBot) => async ({from, message, user}: any) => {
  const {chatId} = unwrapIds(from, message)
  const translated = getTranslator(user.language || Languages.ENG)

  const form = createButtonsForm([
    createButton({text: translated('language.russian'), action: `${ROOTS.DO_SET_LANGUAGE}?language=${Languages.RU}`}),
    createButton({text: translated('language.english'), action: `${ROOTS.DO_SET_LANGUAGE}?language=${Languages.ENG}`}),
    createButton({text: translated('language.slovak'), action: `${ROOTS.DO_SET_LANGUAGE}?language=${Languages.SK}`}),
    createButton({text: translated('language.ukrainian'), action: `${ROOTS.DO_SET_LANGUAGE}?language=${Languages.UA}`}),
    createButton({text: translated('language.back'), action: ROOTS.SHOW_MAIN_MENU})
  ])

  return await bot.sendMessage(chatId, translated('language.select'), form)
}


export {showLanguageMenu}
