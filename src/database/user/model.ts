import mongoose from 'mongoose'
import joi from 'joi'


const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true
  },
  credentials: [{
    login: {
      type: String
    },
    password: {
      type: String
    }
  }],
  lastUsedCredential: {
    type: Number,
    required: true
  }
})

const userSchemaValidator = joi.object({
  telegramId: joi.number().required(),
  credentials: joi.array().required(),
  lastUsedCredential: joi.number().required()
})


const User = mongoose.model('users', userSchema)

const validateUser = (user: any): any => {
  return userSchemaValidator.validate(user)
}


export {User, validateUser}
