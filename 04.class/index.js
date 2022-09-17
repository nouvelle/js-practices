const Memo = require('./Memo')

const memo = new Memo()
const arg = process.argv[2]

if (arg === '-l') {
  memo.showData()
} else if (arg === '-r') {
  memo.viewSelect()
} else if (arg === '-d') {
  console.log('削除')
  // memo.deleteSelect()
} else if (arg === '-e') {
  console.log('編集')
  // memo.editSelect()
} else if (!arg) {
  memo.addMemo()
}
