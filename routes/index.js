const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  global.console.log('index');
  //访问首页种COOKIE
  ctx.cookies.set('pvid',Math.random())

  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookies:ctx.cookies.get('pvid') //取COOKIE
  }
})
//测试接口
router.get('/testAsync',async(ctx)=>{
   global.console.log('start',new Date().getTime())
   const a = await new Promise((resolve,reject)=>{
       setTimeout(()=>{
         global.console.log('doing...',new Date().getTime())
         resolve('wo cao')
       },1000)
   })
   const b = await 12 //相当于 await Promise.resolve(12),await后边会自动转为promise对象
   ctx.body = {
     'test':a  ,
     'test2' : b 
     
   }  // {
      // "test": "wo cao"
     //}
})

module.exports = router
