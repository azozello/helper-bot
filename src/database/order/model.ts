import mongoose from 'mongoose'
import joi from 'joi'


const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  taskId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  isPayed: {
    type: Boolean,
    required: true
  },
  fileId: {
    type: String,
    required: false
  },
})

const orderSchemaValidator = joi.object({
  userId: joi.number().required(),
  timestamp: joi.number().required(),
  isPayed: joi.boolean().required(),
  taskId: joi.string().required(),
  fileId: joi.string().required()
})


const OrderModel = mongoose.model('orders', orderSchema)

const validateOrder = (order: any): any => {
  return orderSchemaValidator.validate(order)
}


export {OrderModel, validateOrder}
