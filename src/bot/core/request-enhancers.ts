import {Languages} from "../translator/languages"
import {composeAsync} from "../utils"


const languageEnhancer = async (request: any) => {
  const {from} = request || {}
  return {
    ...request,
    language: from && from.language_code === 'en' ? Languages.RU : Languages.ENG
  }
}


const composedEnhancers = composeAsync(languageEnhancer)


export {composedEnhancers}
