import {createUser, getUserByTelegramId} from './user/methods'
import {UserApi} from "./api";


const userApi: UserApi = {createUser, getUserByTelegramId}
const subjectApi = {}


export {userApi, subjectApi}
