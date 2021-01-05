/*
 * Contains functions for converting internal objects to telegram API objects.
 */
const createButton = ({text, action}: any) => {
  return [{
    text: text,
    callback_data: action
  }]
}


const createButtonsForm = (buttons: any) => {
  return {
    reply_markup: {
      inline_keyboard: buttons
    }
  }
}


export {
  createButton, createButtonsForm
}
