import {Actions} from "../actions/actions";

/*
 * Contains functions for converting internal objects to telegram API objects.
 */

const createButton = ({text, action}: any) => {
  return [{
    text: text,
    callback_data: action
  }]
}

const createBackButton = ({representation}: any) => {
  const {action} = representation || {}

  return [{
    text: 'BACK',
    callback_data: action || Actions.SUBJECTS.SHOW_ROOT
  }]
}

const createRepresentation = ({text, action, buttons}: any) => {
  return {
    text, action,
    form: {
      reply_markup: {
        inline_keyboard: buttons
      }
    }
  }
}


export {
  createButton, createBackButton, createRepresentation
}