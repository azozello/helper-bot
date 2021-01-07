import English from './eng'
import Russian from './ru'
import Ukrainian from './ua'
import Slovak from './sk'
import {Languages} from "./languages"


const lens = (key: string, object: any) => {
  const found = key
    .split('.')
    .reduce((acc: any, cur: any) => acc[cur] || {}, object)

  return typeof found === 'string' ? found : key
}


const getTranslator = (language: Languages) => (key: string) => {
  switch (language) {
    case Languages.ENG:
      return lens(key, English)

    case Languages.RU:
      return lens(key, Russian)

    case Languages.UA:
      return lens(key, Ukrainian)

    case Languages.SK:
      return lens(key, Slovak)

    default:
      return key
  }
}


export {getTranslator}
