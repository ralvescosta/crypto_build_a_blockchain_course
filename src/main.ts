import { Block } from './block'

(function main () {
  const block = new Block(Date.now(), 'aasdf', 'asdf', ['asdf'])
  console.log(block.toString())
})()
