//练习中间件
function pv(ctx) {
    //ctx 是全局信息 包含request 和 response信息
    //统计用户访问多少次，刷新浏览器 在COOKIE里就有在APP.JS里声明的mt字段
    ctx.session.count++

    global.console.log('pv: ' + ctx.path) //当前页面路径
}

module.exports = function () {
    return async function (ctx,next) {
        pv(ctx) 
        await next() //当前中间件运行完毕，交给下一个中间件
    }
}

//刷新页面  控制台打印出 
// pv: /
//  pv: /stylesheets/style.css
  