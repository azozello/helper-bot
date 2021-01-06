import {UserModel, validateUser} from './model'
import {UserDTO} from "../../bot/models/UserDTO"


const createUser = async (user: UserDTO) => {
  const validationResult = validateUser(user)

  if (validationResult.details) {
    return validationResult.details
  } else {
    try {
      const newUser = new UserModel(user)
      await newUser.save()
      return newUser
    } catch (e) {
      return e
    }
  }
}

const getUserByTelegramId = async (telegramId: number) => {
  const [user] = await UserModel.find({telegramId})
  return user
}

const getOrCreate = async (user: UserDTO) => {
  const existingUser = await getUserByTelegramId(user.telegramId)

  if (existingUser) {
    return existingUser
  } else {
    return createUser(user)
  }
}

const update = async (id: number, newFields: any) => {
  await UserModel.updateOne({telegramId: id}, newFields)
}


export {createUser, getUserByTelegramId, getOrCreate, update}
