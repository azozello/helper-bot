import mongoose from 'mongoose'
import joi from 'joi'


const userSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  language: {
    type: Number,
    required: true
  },
  role: {
    type: Number,
    required: true
  },
})

const userSchemaValidator = joi.object({
  telegramId: joi.number().required(),
  language: joi.number().required(),
  role: joi.number().required(),
  firstName: joi.string().required(),
  username: joi.string().required()
})


const UserModel = mongoose.model('users', userSchema)

const validateUser = (user: any): any => {
  return userSchemaValidator.validate(user)
}


export {UserModel, validateUser}
