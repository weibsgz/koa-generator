const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

//mongoDB
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')


//自己写的例子。。。
const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/m1')
const m2 = require('./middleware/m2')
const m3 = require('./middleware/m3')

//redis
const session = require('koa-generic-session')
const Redis = require('koa-redis')


// error handler
onerror(app)

//redis处理session
app.keys = ['keys','keys123'] //用作session加密处理 随便写俩值
app.use(session({
  key:'mt', //在cookie中存储的字段名
  prefix:'mtpr',
  store:new Redis()
}))

app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())
//想想一下环状 比如m1里声明了一个变量  在M2里给覆盖了 这时候m2执行完还会回到M1 就没事
// m1 start
// m1
// m2 start
// m2
// m3 start
// m3
//   <-- GET /stylesheets/style.css
// m3 end
// m2 end
// m1 end





// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


//MONGO链接
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
