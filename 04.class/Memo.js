const sqlite3 = require('sqlite3').verbose()
const Database = require('./Database')

const db = new sqlite3.Database('./memo.db')
const database = new Database(db)

class Memo {
  async showData () {
    const allMemo = await database.showData()
    allMemo.forEach(choice => console.log(choice.memo.split('\n')[0]))
  }
}

module.exports = Memo
