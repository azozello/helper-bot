/**
 * Represents a node in representation tree.
 *
 * @constructor
 *
 * @param {Node} parent - Parent node. Target of go back action.
 * @param {Object} representation - The actual json send to bot.
 */
function Node({parent, representation}: any): INode {
  return {parent, representation}
}

interface INode {
  parent: any,
  representation: any
}


export {Node, INode}