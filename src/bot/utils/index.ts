const compose = (...funcs: any[]) => (value: any) => funcs.reduceRight((prev, func) => func(prev), value)

const composeAsync = (...funcs: any[]) => (value: any) => funcs.reduceRight(
  (prev, func) => prev.then(func),
  Promise.resolve(value)
)

const unwrapIds = (from: any, message: any, chat?: any) => {
  console.log(from, message, chat)
  const chatId = message ? message.chat.id : chat.id
  const userId = from.id

  return {chatId, userId}
}


const getUrlParameter = (url: string, name: string, defaultValue = ''): string => {
  const dividedUrl = url.split('?')

  if (dividedUrl.length === 2) {
    const parameters = dividedUrl[1].split('&')

    for (let i = 0; i < parameters.length; i++) {
      const [parameterName, value] = parameters[i].split('=')

      if (parameterName === name) {
        return value
      }
    }

    return defaultValue
  }

  return defaultValue
}


export {
  compose,
  composeAsync,
  unwrapIds,
  getUrlParameter
}
