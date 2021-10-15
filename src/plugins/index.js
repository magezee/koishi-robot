/// 用于统一应用全部自定义插件并且输出
const blive = require('./blive')

module.exports.apply = (ctx) => {
  ctx.plugin(blive)
}