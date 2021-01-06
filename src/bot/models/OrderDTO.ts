export interface OrderDTO {
  userId: number,
  timestamp: number,
  isPayed: boolean,
  taskId: string,
  fileId?: string
}
