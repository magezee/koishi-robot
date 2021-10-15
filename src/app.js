const { App } = require('koishi')
const config = require('./config')
require('koishi-adapter-onebot')

const app = new App({
  ...config
})

app.plugin(require('koishi-plugin-common'))   // 引入基本功能插件
app.plugin(require('./plugins'))              // 引入自己写的全部插件

app.start()