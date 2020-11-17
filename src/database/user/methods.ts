import {User, validateUser} from './model'


const createUser = async (telegramId: string, credentials: any, lastUsedCredential = 0) => {
  const validationResult = validateUser({telegramId, credentials, lastUsedCredential})

  if (validationResult.details) {
    return validationResult.details
  } else {
    try {
      const user = new User({telegramId, credentials, lastUsedCredential})
      await user.save()
      return user
    } catch (e) {
      return e
    }
  }
}

const getUserByTelegramId = async (telegramId: string) => {
  const [user] = await User.find({telegramId})
  return user
}


export {createUser, getUserByTelegramId}
