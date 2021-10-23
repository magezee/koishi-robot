/// b站直播相关的插件
const { segment, Time } = require('koishi')
const axios = require('axios')
const dayjs = require('dayjs')

let status = 0
let statusSwitch = false

function apply(ctx) {
  ctx.on('connect', () => {
    
    setInterval(async () => {
      console.log('查询状态：' + status +  '时间：' + new Date())
      const data = await getLiveInit(21452505)

      if(status !== data.live_status) {
        statusSwitch = true
        status = data.live_status
      } else {
        statusSwitch = false
      }

      // 如果直播状态变更，就朝指定渠道发送信息
      if(statusSwitch) {
        const liveStatus = {
          '0': '未开播',
          '1': '直播中',
          '2': '轮播中'
        }[data.live_status]

        const liveStartTime = data.live_time > 0 
          ? `\n开播时间：${dayjs(data.live_time).format('YY年MM月DD日HH时mm分')}`
          : ''

        const liveTime = data.live_time > 0
          ? `\n直播时长：${Time.formatTime(Date.now() - data.live_time)}`
          : ''

        const brief = status ? '海子姐下播啦' : '海子姐开播啦'
        

        ctx.broadcast(
          ['onebot:614874145'],
          brief
        )

        // ctx.broadcast(
        //   ['onebot:614874145'], 
        //   segment('xml', { data:  
        //     `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
        //     <msg serviceID="1" templateID="1" action="web" brief="${brief}" sourceMsgId="0" url="https://live.bilibili.com/21452505?spm_id_from=333.999.0.0" flag="0" adverSign="0" multiMsgFlag="0">
        //       <item layout="6" advertiser_id="0" aid="0">
        //         <picture cover="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-094758B3DD39603D0E8563D47959D8E7/0" w="0" h="0" />
        //       </item>
        //       <item layout="6" advertiser_id="0" aid="0">
        //         <title>海子姐直播间</title>
        //         <summary>直播状态：${liveStatus}${liveStartTime}${liveTime}</summary>
        //       </item>
        //       <source name="哔哩哔哩" icon="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-01006648643525F8630A9A97C5959700/0" action="" appid="-1" />
        //     </msg>
        //     `
        //   })
        //   `海子姐直播间状态：${liveStatus}${liveStartTime}${liveTime}`
        // )
      } 
    }, 60 * 1000)
  })




  // 命令行 主要用于测试
  ctx
    .command('live', '查询海子姐开播状态')
    .shortcut('海子姐开播了吗')
    .action(async ({ session }) => {
      const data = await getLiveInit(21452505)
      
      const liveStatus = {
        '0': '未开播',
        '1': '直播中',
        '2': '轮播中'
      }[data.live_status]

      console.log(data)
      const liveStartTime = data.live_time > 0 
        ? `\n开播时间：${dayjs(data.live_time).format('YY年MM月DD日HH时mm分ss秒SSS毫秒')}`
        : ''

      const liveTime = data.live_time > 0
        ? `\n直播时长：${Time.formatTime(Date.now() - data.live_time)}`
        : ''


      return (
        segment('xml', { data:  
          `<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
          <msg serviceID="1" templateID="1" action="web" brief="点击进入直播间" sourceMsgId="0" url="https://live.bilibili.com/21452505?spm_id_from=333.999.0.0" flag="0" adverSign="0" multiMsgFlag="0">
            <item layout="6" advertiser_id="0" aid="0">
              <picture cover="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-094758B3DD39603D0E8563D47959D8E7/0" w="0" h="0" />
            </item>
            <item layout="6" advertiser_id="0" aid="0">
              <title>海子姐直播间</title>
              <summary>直播状态：${liveStatus}${liveStartTime}${liveTime}</summary>
            </item>
            <source name="哔哩哔哩" icon="http://gchat.qpic.cn/gchatpic_new/0/530077417-0-01006648643525F8630A9A97C5959700/0" action="" appid="-1" />
          </msg>
          `
        })
      )
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

