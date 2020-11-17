/**
 * @param message
 *
 * @constructor
 */
function InvalidParametersException(message: string): any {
  return {
    message,
    name: 'InvalidParametersException'
  }
}


async function AsyncObjectsPool(initObject: any, destroyObject: any, refreshObject: any,
                                {size = 6, expandBorder = 2}) {
  if (typeof initObject !== 'function' || typeof destroyObject !== 'function' || typeof refreshObject !== 'function') {
    throw InvalidParametersException('initObject, destroyObject and refreshObject should be functions.')
  }


  const pool: Array<any> = []
  const promiseArray = new Array(size)
    .fill(size)
    .map(async () => pool.push(await initObject()))

  await Promise.all(promiseArray)

  const _tryEnlargePool = async () => {
    if (pool.length <= expandBorder + 1) {
      pool.push(await initObject())
    }
  }


  const pick = async () => {
    _tryEnlargePool().then()
    return pool.pop()
  }

  const put = async (object: any) => {
    if (pool.length < size) {
      await refreshObject(object)
      pool.unshift(object)
    } else {
      await destroyObject(object)
    }
  }

  const empty = () => {
    pool.forEach((object) => destroyObject(object))
    pool.length = 0
  }


  return {pick, put, empty}
}


export {AsyncObjectsPool}
