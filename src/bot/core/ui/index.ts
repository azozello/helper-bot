import {Actions} from "../actions/actions";
import {createBackButton, createButton, createRepresentation} from "./markup";
import {INode, Node} from "./node";


// TODO: Store this data in Database
const mockedData = {
  text: 'Select subject',
  action: Actions.SUBJECTS.SHOW_ROOT,
  key: 'subjects',
  children: [{
    text: 'Select problem for OOP',
    action: Actions.SUBJECTS.OOP.SHOW_ROOT,
    key: 'oop',
    children: [
      {
        text: 'Training',
        action: Actions.SUBJECTS.OOP.TRAINING.SHOW_ROOT,
        key: 'training',
        deadline: '2020-11-04',
        price: 50
      },
      {
        text: 'Project Ellen',
        action: Actions.SUBJECTS.OOP.PROJECT_ELLEN.SHOW_ROOT,
        key: 'projectEllen',
        deadline: '2020-12-26',
        price: 100
      }
    ]
  }, {
    text: 'Select problem for ZAP',
    action: Actions.SUBJECTS.ZAP.SHOW_ROOT,
    key: 'zap',
    children: [
      {
        text: 'Karel the Robot',
        action: Actions.SUBJECTS.ZAP.KAREL.SHOW_ROOT,
        key: 'karelTheRobot',
        deadline: '2020-10-04',
        price: 20,
        children: [
          {
            text: 'Buy Karel the robot. Please send 20 eshek na EBAN: 1234 5678 1234 1234. Spasibo',
            action: Actions.SUBJECTS.ZAP.KAREL.BUY.SHOW_ROOT,
            key: 'buy',
          }
        ]
      },
      {
        text: 'Numbers, Arrays',
        action: Actions.SUBJECTS.ZAP.NUMBERS.SHOW_ROOT,
        key: 'numberArrays',
        deadline: '2020-10-14',
        price: 20
      },
      {
        text: 'Hangman',
        action: Actions.SUBJECTS.ZAP.HANGMAN.SHOW_ROOT,
        key: 'hangman',
        deadline: '2020-10-24',
        price: 20
      },
      {
        text: 'QR code',
        action: Actions.SUBJECTS.ZAP.QR_CODE.SHOW_ROOT,
        key: 'qrCode',
        deadline: '2020-11-04',
        price: 20
      },
      {
        text: 'Files',
        action: Actions.SUBJECTS.ZAP.FILES.SHOW_ROOT,
        key: 'files',
        deadline: '2020-11-14',
        price: 20
      },
      {
        text: 'Curses',
        action: Actions.SUBJECTS.ZAP.CURSES.SHOW_ROOT,
        key: 'curses',
        deadline: '2020-11-24',
        price: 20
      }
    ]
  }, {
    text: "Select problem for Databazy",
    action: Actions.SUBJECTS.DATABASE.SHOW_ROOT,
    key: 'database',
    children: [
      {
        text: 'KPI',
        action: Actions.SUBJECTS.DATABASE.KPI.SHOW_ROOT,
        key: 'training',
        deadline: '2020-11-04',
        price: 50
      },
      {
        text: 'KKUI',
        action: Actions.SUBJECTS.DATABASE.KKUI.SHOW_ROOT,
        key: 'training',
        deadline: '2020-11-04',
        price: 50
      },
    ]
  }, {
    text: "Select problem for Programovanie",
    action: Actions.SUBJECTS.PROGRAMMING.SHOW_ROOT,
    key: 'programming',
    children: [
      {
        text: 'Top Secret',
        action: Actions.SUBJECTS.PROGRAMMING.TOP_SECRET.SHOW_ROOT,
        key: 'topSecret',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'K-chko',
        action: Actions.SUBJECTS.PROGRAMMING.K.SHOW_ROOT,
        key: 'k',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'Some problems to solve',
        action: Actions.SUBJECTS.PROGRAMMING.SOME_PROBLEMS.SHOW_ROOT,
        key: 'someProblems',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'BMP Transform',
        action: Actions.SUBJECTS.PROGRAMMING.BMP_TRANSFORM.SHOW_ROOT,
        key: 'bmpTransform',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'Adventure',
        action: Actions.SUBJECTS.PROGRAMMING.ADVENTURE.SHOW_ROOT,
        key: 'adventure',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'Master Mind',
        action: Actions.SUBJECTS.PROGRAMMING.MASTER_MIND.SHOW_ROOT,
        key: 'masterMind',
        deadline: '2020-11-04',
        price: 25
      },
      {
        text: 'Music Player',
        action: Actions.SUBJECTS.PROGRAMMING.MUSIC_PLAYER.SHOW_ROOT,
        key: 'musicPlayer',
        deadline: '2020-11-04',
        price: 25
      },
    ]
  }]
}


/**
 * Build a tree representation of the UI
 *
 * @param data - JSON representation of the tree
 *
 * @return {Node} - root of the tree
 */
const buildTree = (data = mockedData) => {
  const root: any = {}
  root[data.key] = _buildTreeRecursively(data, null, _convert)

  return root
}


/**
 * Converts JSON object to Node with telegram UI representation.
 *
 * @param {Object} source
 * @param {Node} parent
 *
 * @return {Node}
 *
 * @private
 */
const _convert = (source: any, parent: any): INode => {
  const {text, action, children} = source

  const buttons = (children || []).map(createButton)

  if (parent) {
    buttons.push(createBackButton(parent))
  }

  return Node({
    parent,
    representation: createRepresentation({text, action, buttons})
  })
}

/**
 * Recursively build a UI tree.
 *
 * @param {Object} source - JSON representation of the tree.
 * @param {Node} parent
 * @param {Function} convert - translates JSON object into {Node}
 *
 * @return {Node} - root of the tree
 *
 * @private
 */
const _buildTreeRecursively = (source: any, parent: any, convert: any) => {
  const node = convert(source, parent)

  if (source.children) {
    source.children.forEach((child: any) => node[child.key] = _buildTreeRecursively(child, node, convert))
  }

  return node
}


export {buildTree}
