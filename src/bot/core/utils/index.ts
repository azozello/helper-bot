/**
 * Gets telegram UI representation from the tree by action.
 *
 * @param {Node} root
 * @param {String} action
 *
 * @return {Object} - Representation
 */
const actionToRepresentation = (root: any, action: string) => {
  const path = action.split('.')
  let tempNode = root

  for (let i = 0; i < path.length; i++) {
    if (!tempNode) {
      return null
    }
    tempNode = tempNode[path[i]]
  }

  return tempNode.representation
}


const compose = (...funcs: any[]) => (value: any) => funcs.reduceRight((prev, func) => func(prev), value)


export {actionToRepresentation, compose}