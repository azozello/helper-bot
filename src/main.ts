import mongoose from 'mongoose'

import {startBot} from './bot'


const DB_URL = 'mongodb://localhost/helper'


// TODO: 1) Migrate to typescript [DONE]
// TODO: 2) Add language support
// TODO: 3) Add the possibility to mark am order as payed
// TODO: 4) Add the possibility to send code to the client
// TODO: 5) Deploy to my GCC.

// TODO: Optional - add github actions.
// TODO: Optional - add logger.
// TODO: Optional - add encrypt database.
const startApp = () => {
    return Promise.all([
        mongoose.connect(DB_URL),
        startBot()
    ])
}


startApp()
    .then(() => console.log('Bot started'))
    .catch((reason) => console.error(reason))