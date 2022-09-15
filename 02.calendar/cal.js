const dayjs = require('dayjs')
const argv = require('minimist')

const WEEK = ['日', '月', '火', '水', '木', '金', '土']

// 今日の日付を取得
const today = dayjs()
let showYear = Number(today.format('YYYY'))
let showMonth = Number(today.format('M'))

// 引数を取得
const params = argv(process.argv.slice(2))
const year = params.y
const month = params.m

// 表示する月を決める処理
if (Number.isInteger(month) && Number.isInteger(year)) {
  if ((month >= 1 && month <= 12) && (year >= 1970 && year <= 2100)) {
    showYear = year
    showMonth = month
  } else if ((month >= 1 && month <= 12) && !(year >= 1970 && year <= 2100)) {
    showMonth = month
  }
}

// タイトル（年月・曜日）出力
console.log(`      ${showMonth}月 ${showYear}`)
console.log(WEEK.join(' '))

// 表示月の日付データ取得
const lastDay = Number(dayjs().year(showYear).month(showMonth - 1).endOf('month').format('D'))

// 1日の左のスペースを表示
const startWeek = dayjs().year(showYear).month(showMonth - 1).startOf('month').day()
process.stdout.write('   '.repeat(startWeek))

// カレンダー表示
const dayArray = [...Array(lastDay)].map((_, i) => i + 1)
dayArray.forEach(day => {
  const targetWeek = Number(dayjs().year(showYear).month(showMonth - 1).date(day).format('d'))
  process.stdout.write(String(day).padStart(3, ' '))
  if (targetWeek === 6) console.log()
})
console.log()
