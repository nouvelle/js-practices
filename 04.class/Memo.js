const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const { Select, Toggle } = require('enquirer')
const Database = require('./Database')

const db = new sqlite3.Database('./memo.db')
const database = new Database(db)

class Memo {
  async showData () {
    const allMemo = await database.getAllMemo()
    allMemo.forEach(choice => console.log(choice.memo.split('\n')[0]))
  }

  async viewSelect () {
    const allMemo = await database.getAllMemo()
    const choices = allMemo.map(choice => choice.memo.split('\n')[0])
    const prompt = new Select({
      name: 'viewMemos',
      message: 'Choose a note you want to see:',
      choices
    })
    prompt.run()
      .then(answer => {
        for (let i = 0; i < allMemo.length; i++) {
          if (answer === allMemo[i].memo.split('\n')[0]) {
            console.log('\n' + allMemo[i].memo)
            break
          }
        }
      })
      .catch(err => console.err(err))
  }

  async deleteSelect () {
    const allMemo = await database.getAllMemo()
    const choices = allMemo.map(choice => choice.memo.split('\n')[0])
    const prompt = new Select({
      name: 'deleteMemos',
      message: 'Choose a note you want to delete:',
      choices
    })
    prompt.run()
      .then(answer => {
        for (let i = 0; i < allMemo.length; i++) {
          if (answer === allMemo[i].memo.split('\n')[0]) {
            database.deleteMemo(allMemo[i].id)
            break
          }
        }
      })
      .catch(err => console.err(err))
  }

  async deleteAll () {
    const prompt = new Toggle({
      message: 'Can I delete all notes?',
      enabled: 'OK',
      disabled: 'NO'
    })
    prompt.run()
      .then(answer => {
        if (answer) database.deleteAllMemo()
      })
      .catch(err => console.err(err))
  }

  async addMemo () {
    const input = fs.readFileSync('/dev/stdin', 'utf8')
    if (input) await database.addMemo(input)
  }
}

module.exports = Memo
