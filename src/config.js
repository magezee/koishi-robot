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
    selfId: '850300443',
    token: '199678xq',
  }],
  plugins: {
    common: {},
    blive: {}
  },
  
}
