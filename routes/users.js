const router = require('koa-router')()
//引入模型
const Person = require('../dbs/models/person')

const Redis = require('koa-redis')
//创建一个redis客户端
const Store = new Redis().client

//增加了公用路径
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//因为用了ctx.requeset.body 所以用post方式请求数据，
//如果用 get 就是 ctx.query.
router.post('/addPerson', async function (ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save() //增加数据
    code = 0
  } catch (e) {
    code = -1
  }

  ctx.body = {
    code
  }

})

//读取
router.post('/getPerson', async function (ctx) {
  //查询 注意，这里不能用person这个实列了 需要用模型Person
  //以name  查  查单个是findone 查多个是 find
  const result = await Person.findOne({ name: ctx.request.body.name })
  try {
    ctx.body = {
      code: 0,
      result
    }
  } catch (e) {
    ctx.body = {
      code: -1
    }
  }
})

//修改
router.post('/updatePerson',async function(ctx) {
   const result = await Person.where({
      name:ctx.request.body.name
   }).update({
     age:ctx.request.body.age
   })
   try {
    ctx.body = {
      code: 0
    }
  } catch (e) {
    ctx.body = {
      code: -1
    }
  }
})


//删除
router.post('/removePerson',async function(ctx) {
  const result = await Person.where({
     name:ctx.request.body.name
  }).remove()
  try {
   ctx.body = {
     code: 0
   }
 } catch (e) {
   ctx.body = {
     code: -1
   }
 }
})

//redis
router.get('/fix',async function(ctx) {
   const st = await Store.hset('fix','name',Math.random())
   ctx.body = {
     code : 0 
   }
})



module.exports = router
