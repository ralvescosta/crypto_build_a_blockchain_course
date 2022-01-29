import { Block } from '@/block'

(function main () {
  const block = Block.genesis()
  console.log(block.toString())
})()
