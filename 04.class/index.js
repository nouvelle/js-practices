const Memo = require('./Memo')

const memo = new Memo()
const arg = process.argv[2]

if (arg === '-l') {
  memo.showData()
} else if (arg === '-r') {
  memo.viewSelect()
} else if (arg === '-d') {
  memo.deleteSelect()
} else if (arg === '-D') {
  memo.deleteAll()
} else if (arg === '-e') {
  memo.editSelect()
} else if (!arg) {
  memo.addMemo()
}
