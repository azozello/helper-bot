import {validateUser} from "../user/model"
import {OrderDTO} from "../../bot/models/OrderDTO"
import {OrderModel, validateOrder} from "./model"


const createOrder = async (order: OrderDTO) => {
  const validationResult = validateOrder(order)

  if (validationResult.details) {
    return validationResult.details
  } else {
    try {
      const newOrder = new OrderModel(order)
      await newOrder.save()
      return newOrder
    } catch (e) {
      return e
    }
  }
}

const markOrderAsPayed = async (orderId: string) => {
  await OrderModel.updateOne({_id: orderId}, {isPayed: true})
}

const addFileToOrder = async (orderId: string, fileId: string) => {
  await OrderModel.updateOne({_id: orderId}, {fileId})
}

const getOrderById = async (id: number) => {
  const order = await OrderModel.findById(id)
  return order
}

export {createOrder, markOrderAsPayed, addFileToOrder, getOrderById}
