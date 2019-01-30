### koa2-generator框架安装

1. `npm i -g koa-generator`
2. `koa2 -e koa2-learn`  //用EJS引擎安装
3. `cd koa2-learn/`
4. `npm i`
5. `npm i --update-binary` //如果控制台报需要安装 就安装此步骤
6. `npm run dev`   //利用nodemon启动 刷页面实时刷新


### 文件夹
1. middleware 文件夹按照教程写的中间件例子  koa-pv.js 创建一个中间件
2. m1,m2,m3 测试中间件执行顺讯  这些都在APP.JS引入
3. `./routes/index.js` 做了测试接口 testAsync 并且使用了cookie 的读写
4. `dbs/config.js` 数据库的配置选项


### 数据库插入数据
1. 项目根目录下有个dbs文件夹 下边config.js导出了 27017端口下新建了DBS数据库
2. `dbs/models/person.js` 建立了一个 Person 表  表结构用的是personSchema
3. `app.js` 引入了mongoose 和  `dbs/config.js`
    并且做了链接数据库 
    ``` 
        mongoose.connect(dbConfig.dbs,{
            useNewUrlParser:true
        })
    ```
4.  `routes/users.js` 下 增加了 `addPerson`接口 POST形式 并返回状态码 0 或者 1
    在这接口内部实际是创建了一个Person的实例 接受的数据从 第5条方式传入
    服务器读写都需要异步方式  async await

5. 项目根目录下 GIT BASH 输入 `curl -d 'name=lilei&age=27' http://localhost:3000/users/addPerson`
curl代表发送请求  -d是POST方式 

6. 打开 studio 3T 刷新下 27017数据库 就看到 DBS这个数据库了


7. 查询 
   `routes/users.js` 下 增加了 `getPerson`接口 
   命令行输入  `curl -d 'name=hanmeimei' http://localhost:3000/users/getPerson`
   
8. 修改
   `routes/users.js` 下 增加了 `removePerson`接口 
   命令行输入  `curl -d 'name=lilei&age=11' http://localhost:3000/users/updatePerson`

9. 删除
   `routes/users.js` 下 增加了 `updatePerson`接口   
`curl -d 'name=lilei' http://localhost:3000/users/removePerson`


### redis

redis 是服务端处理session的工具  redis以键值对的形式记录session 返回给浏览器端种cookie

1. 下载安装redis  启动 http://www.runoob.com/redis/redis-install.html

2. koa2-learn根目录下 安装 npm i koa-generic-session koa-redis 这两个中间件

3. 在app.js中引入
```
app.keys = ['keys','keys123'] //用作session加密处理 随便写俩值
app.use(session({
  key:'mt', //在cookie中存储的字段名
  prefix:'mtpr',
  store:new Redis()
}))
```

4. `middleware/koa-pv.js` 里PV中间件加了统计用户登陆次数的代码
```
ctx.session.count++
```

5. 查询： 新建一个CMD窗口  进入redis目录
  输入 `redis-cli` 会自动打开一个 6379的端口服务，
  输入  `keys *` 可查询带有mtpr的值（在APP.JS设置了session前缀），
  输入 `get` 空格 复制一个 mtpr的值 可查看count （访问次数） 每次刷新页面请求加2
  因为ctx.session.count++    为什么是2不是1呢？（视频里说是因为network里有2个请求localhost  style.css） 所以加2


6. 上面我们只通过了`ctx.session.count++`这操作了session, 我们想用redis存储怎么做呢

在user.js中引入redis，并创建一个redis客户端
在`user.js` 中创建fix接口

项目根目录输入 curl http://localhost:3000/users/fix

在redis-cli在命令行输入  `keys *` 可查到fix
输入  hget fix name 可拿到 user.js中存的随机数
