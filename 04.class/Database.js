class Database {
  constructor (db) {
    this.db = db
  }

  async showData () {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM memos', (err, row) => {
          if (err) reject(err)
          if (row) resolve(row)
        })
      })
    })
  }
}

module.exports = Database
