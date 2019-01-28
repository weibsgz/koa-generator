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
4. 