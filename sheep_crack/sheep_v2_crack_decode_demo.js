// cd sheep_crack/ 
// vi sheep_v2_crack_decode_demo.js
const protobuf = require('protobufjs');

// 输入完成挑战时的MatchPlayInfo
const success_challenge_playinfo = "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"

protobuf.load("sheep_crack/yang.proto", function(err, root) {
    if (err)
        throw err;

    // 获得 message 类型
    var MatchPlayInfo = root.lookupType("yang.MatchPlayInfo");
	var MatchStepInfo = root.lookupType("yang.MatchStepInfo");
    
    var _debase64 = Buffer.from(success_challenge_playinfo, 'base64');
	const message = MatchPlayInfo.decode(_debase64);
	console.log(message)
	console.log(message.stepInfoList[10])
});