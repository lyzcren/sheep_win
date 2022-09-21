const axios = require('axios');
// 重试次数
axios.defaults.retry = 2;
// 请求的间隙
axios.defaults.retryDelay = 1000;
//请求超时时间
axios.defaults.timeout = 10000;

let ok = 0;
let err = 0;
main();

async function main() {
  const uid = process.argv[2];
	console.log('开始获取openid');
	const openid = await getOpenId(uid);
	while(openid == undefined) {
		console.log('获取openid失败');
		const openid = await getOpenId(uid);
	}
	console.log('已成功获取openid');
	console.log('开始获取token');
	const token = await getToken(openid);
	while(token == undefined) {
		console.log('获取token失败');
		const token = await getToken(openid);
	}
	console.log('已成功获取token');
	setInterval(() => {
		sheep_win(token)
	}, 1500)
}

// uid: 45942602
async function getOpenId(uid) {
	try {
		const res = await axios.get(`https://cat-match.easygame2021.com/sheep/v1/game/user_info?uid=${uid}`, 
		{
		headers: {
		  'Accept': '*/*',
		  'Accept-Encoding': 'gzip,compress,br,deflate',
		  'Connection': 'keep-alive',
		  'content-type': 'application/json',
		  'Referer': 'https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html', 
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		't': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1MDI0NDUsIm5iZiI6MTY2MzQwMDI0NSwiaWF0IjoxNjYzMzk4NDQ1LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo0NTk0MjYwMiwiZGVidWciOiIiLCJsYW5nIjoiIn0.1lXIcb1WL_SdsXG5N_i1drjjACRhRZUS2uadHlT6zIY'
		}
		});
		const response = res.data;
		const openid = response.data.wx_open_id;
		return openid;
  }catch(e){
		console.log(`游戏服务器响应超时或崩溃中未及时响应，缓缓吧，等待服务器恢复后再试！`);
	}
}

async function getToken(openid) {
	try {
		const res = await axios.post(`https://cat-match.easygame2021.com/sheep/v1/user/login_tourist`, 
			{ 'uuid': openid },
			{
		headers: {
		  'Accept': '*/*',
		  'Accept-Encoding': 'gzip,compress,br,deflate',
		  'Connection': 'keep-alive',
		  'content-type': 'application/json',
		  'Referer': 'https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html', 
		  'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
		't': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1MDI0NDUsIm5iZiI6MTY2MzQwMDI0NSwiaWF0IjoxNjYzMzk4NDQ1LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo0NTk0MjYwMiwiZGVidWciOiIiLCJsYW5nIjoiIn0.1lXIcb1WL_SdsXG5N_i1drjjACRhRZUS2uadHlT6zIY'
		}
	  });
		const response = res.data;
		const token = response.data.token;
		return token;
	}catch(e) {
		console.log('游戏服务器响应超时或崩溃中未及时响应，缓缓吧，等待服务器恢复后再试！');
	}
}

function sheep_win(token) {
  const rank_time = Math.floor(Math.random() * 10000);
  axios.get(`https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=${rank_time}&rank_role=1&skin=1`, {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip,compress,br,deflate',
      'Connection': 'keep-alive',
      'content-type': 'application/json',
      'Referer': 'https://servicewechat.com/wx141bfb9b73c970a9/16/page-frame.html', 
      'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2012K11C Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/4629 MicroMessenger/8.0.27.2220(0x28001B37) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
      't': token
    }
  })
  .then(res => {
    ok++;
    // console.log(res.data);
  })
  .catch(error => {
    console.log(error);
    err++;
  })
  .finally(() => {
    console.log(`====================羊了个羊勇敢通关${ok}次====================`);
    console.log(`====================羊了个羊闯关失败${err}次====================`);
  })
  ;
}
