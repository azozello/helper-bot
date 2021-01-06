import {fromLanguageCode, Languages} from "../translator/languages"
import {composeAsync} from "../utils"
import config from 'config'
import {UserRole} from "./user-roles"
import {getOrCreate} from "../../database/user/methods"


const adminIds: number[] = JSON.parse(config.get('telegram.admins'))


const getUserRole = (id: number) => adminIds.includes(id) === true ? UserRole.ADMIN : UserRole.USER


const userDataEnhancer = async (request: any) => {
  const {from} = request

  const user = await getOrCreate({
    telegramId: from.id,
    role: getUserRole(from.id),
    language: fromLanguageCode(from.language_code),
    firstName: from.first_name,
    username: from.username
  })

  return {
    ...request,
    user
  }
}


const composedEnhancers = composeAsync(userDataEnhancer)


export {composedEnhancers}
