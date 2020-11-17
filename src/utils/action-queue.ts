/**
 *
 * @return {ActionQueue}
 * @constructor
 */
function ActionQueue(): IActionQueue {
  const map: Map<string, string> = new Map<string, string>()

  const popAction = (userId: string) => {
    const userActionQueue = map.get(userId)
    if (Array.isArray(userActionQueue)) {
      return userActionQueue.shift()
    }
  }

  const putAction = (userId: string, action: string) => {
    const userActionQueue = map.get(userId)
    if (Array.isArray(userActionQueue)) {
      userActionQueue.push(action)
    } else {
      map.set(userId, action)
    }
  }

  return {
    popAction, putAction
  }
}

interface IActionQueue {
  popAction(userId: string): any,
  putAction(userId: string, action: string): void
}


export {ActionQueue, IActionQueue}
