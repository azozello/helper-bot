import mongoose from 'mongoose'
import {startBot} from "./bot"



const DB_URL = 'mongodb://localhost/helper'


// TODO: Store this data in Database
// const mockedData = {
//   text: 'Select subject',
//   action: Actions.SUBJECTS.SHOW_ROOT,
//   key: 'subjects',
//   children: [
//     {
//       text: 'Select problem for OOP',
//       action: Actions.SUBJECTS.OOP.SHOW_ROOT,
//       key: 'oop',
//       children: [
//         {
//           text: 'Training',
//           action: Actions.SUBJECTS.OOP.TRAINING.SHOW_ROOT,
//           key: 'training',
//           deadline: '2020-11-04',
//           price: 50
//         },
//         {
//           text: 'Project Ellen',
//           action: Actions.SUBJECTS.OOP.PROJECT_ELLEN.SHOW_ROOT,
//           key: 'projectEllen',
//           deadline: '2020-12-26',
//           price: 100
//         }
//       ]
//     },
//     {
//       text: 'Select problem for ZAP',
//       action: Actions.SUBJECTS.ZAP.SHOW_ROOT,
//       key: 'zap',
//       children: [
//         {
//           text: 'Karel the Robot',
//           action: Actions.SUBJECTS.ZAP.KAREL.SHOW_ROOT,
//           key: 'karelTheRobot',
//           deadline: '2020-10-04',
//           price: 20,
//           children: [
//             {
//               text: 'Buy Karel the robot. Please send 20 eshek na EBAN: 1234 5678 1234 1234. Spasibo',
//               action: Actions.SUBJECTS.ZAP.KAREL.BUY.SHOW_ROOT,
//               key: 'buy',
//             }
//           ]
//         },
//         {
//           text: 'Numbers, Arrays',
//           action: Actions.SUBJECTS.ZAP.NUMBERS.SHOW_ROOT,
//           key: 'numberArrays',
//           deadline: '2020-10-14',
//           price: 20
//         },
//         {
//           text: 'Hangman',
//           action: Actions.SUBJECTS.ZAP.HANGMAN.SHOW_ROOT,
//           key: 'hangman',
//           deadline: '2020-10-24',
//           price: 20
//         },
//         {
//           text: 'QR code',
//           action: Actions.SUBJECTS.ZAP.QR_CODE.SHOW_ROOT,
//           key: 'qrCode',
//           deadline: '2020-11-04',
//           price: 20
//         },
//         {
//           text: 'Files',
//           action: Actions.SUBJECTS.ZAP.FILES.SHOW_ROOT,
//           key: 'files',
//           deadline: '2020-11-14',
//           price: 20
//         },
//         {
//           text: 'Curses',
//           action: Actions.SUBJECTS.ZAP.CURSES.SHOW_ROOT,
//           key: 'curses',
//           deadline: '2020-11-24',
//           price: 20
//         }
//       ]
//     },
//     {
//       text: "Select problem for Databazy",
//       action: Actions.SUBJECTS.DATABASE.SHOW_ROOT,
//       key: 'database',
//       children: [
//         {
//           text: 'KPI',
//           action: Actions.SUBJECTS.DATABASE.KPI.SHOW_ROOT,
//           key: 'training',
//           deadline: '2020-11-04',
//           price: 50
//         },
//         {
//           text: 'KKUI',
//           action: Actions.SUBJECTS.DATABASE.KKUI.SHOW_ROOT,
//           key: 'training',
//           deadline: '2020-11-04',
//           price: 50
//         },
//       ]
//     },
//     {
//       text: "Select problem for Programovanie",
//       action: Actions.SUBJECTS.PROGRAMMING.SHOW_ROOT,
//       key: 'programming',
//       children: [
//         {
//           text: 'Top Secret',
//           action: Actions.SUBJECTS.PROGRAMMING.TOP_SECRET.SHOW_ROOT,
//           key: 'topSecret',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'K-chko',
//           action: Actions.SUBJECTS.PROGRAMMING.K.SHOW_ROOT,
//           key: 'k',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'Some problems to solve',
//           action: Actions.SUBJECTS.PROGRAMMING.SOME_PROBLEMS.SHOW_ROOT,
//           key: 'someProblems',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'BMP Transform',
//           action: Actions.SUBJECTS.PROGRAMMING.BMP_TRANSFORM.SHOW_ROOT,
//           key: 'bmpTransform',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'Adventure',
//           action: Actions.SUBJECTS.PROGRAMMING.ADVENTURE.SHOW_ROOT,
//           key: 'adventure',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'Master Mind',
//           action: Actions.SUBJECTS.PROGRAMMING.MASTER_MIND.SHOW_ROOT,
//           key: 'masterMind',
//           deadline: '2020-11-04',
//           price: 25
//         },
//         {
//           text: 'Music Player',
//           action: Actions.SUBJECTS.PROGRAMMING.MUSIC_PLAYER.SHOW_ROOT,
//           key: 'musicPlayer',
//           deadline: '2020-11-04',
//           price: 25
//         },
//       ]
//     }]
// }


// TODO: 1) Migrate to typescript [DONE]
// TODO: 2) Add language support [DONE]
// TODO: 3) Add the possibility to mark an order as payed
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
