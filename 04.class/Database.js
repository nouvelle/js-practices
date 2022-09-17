class Database {
  constructor (db) {
    this.db = db
  }

  async getAllMemo () {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM memos', (err, row) => {
          if (err) reject(err)
          if (row) resolve(row)
        })
      })
    })
  }

  deleteMemo (id) {
    this.db.run('DELETE FROM memos WHERE id = ?', id)
  }

  deleteAllMemo () {
    this.db.run('DROP table if exists memos')
  }

  addMemo (memo) {
    this.db.serialize(() => {
      this.db.run('CREATE TABLE if not exists memos(id INTEGER PRIMARY KEY AUTOINCREMENT, memo TEXT)')
      this.db.run('INSERT INTO memos( memo) values(?)', memo)
    })
  }
}

module.exports = Database
