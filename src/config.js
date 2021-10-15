// 配置项文档：https://koishi.js.org/api/app.html
module.exports = {
  // Koishi 服务器监听的端口
  port: 8080,
  onebot: {
    path: '',
    secret: '',
  },
  bots: [{
    type: 'onebot:ws',
    server: 'http://localhost:6700',
    selfId: 'QQ号',
    token: 'QQ密码',
  }],
  plugins: {
    common: {},
    blive: {}
  },
  
}
