/// b站直播相关的插件
const axios = require('axios')

/**
 * @param {Context} ctx
 */
function apply(ctx) {
ctx
  .command('nanami.live', '查询海子姐开播状态')
  .shortcut('海子姐开播了吗')
  .action(async ({ session }) => {
    const data = await getLiveInit(1832207)

    const liveStatus = {
      '0': '未开播',
      '1': '直播中',
      '2': '轮播中'
    }[data.live_status]

    session.send(`海子姐直播间状态：${liveStatus}`)
  })
}

/**
 * @description 通过直播间号获取房间信息
 * @param roomid 直播间号 
 */
async function getLiveInit(roomid) {
  const { data } = await axios.get(
    'https://api.live.bilibili.com/room/v1/Room/room_init',
    {
      params: { id: roomid },
      headers: {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0'
      }
    }
  )
  return data && data.data
}

module.exports = {
  name: 'plugin-blive-test',
  apply
}

