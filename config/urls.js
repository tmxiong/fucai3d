let timeStamp = function () {
    return new Date().getTime();
};
let secret = 'eb7f104bd5c44f5fb6862b3b9a4b31af';

exports.get28 = function (type, page) {
    // type :
    // 1: 幸运28； 2:加拿大28； 3:丹麦28
    return 'http://www.dandan28kai.com/api.php?s=/index&page_no='+ page +'&page_size=20&type='+ type +'&sign=f135353cb74ab6ce8c7101977058ca44'
};
exports.getYuce = function (type, page) {
    return 'http://www.dandan28kai.com/api.php?s=/index/forecast&page_no=' + page + '&page_size=20&type='+ type +'&sign=f135353cb74ab6ce8c7101977058ca44'
};
exports.getHistory = function (type, page, date) {
    return 'http://www.dandan28kai.com/api.php?s=/index/history&date='+date+'&page_no='+page+'&page_size=20&type='+type+'&sign=79b76ffb49853a07a3f90823412f73f5'
};
// 彩票显示所有彩票最新一期开奖号码
exports.getNewestLotteryCode = function (id) {
    return 'https://route.showapi.com/44-1?code='+ id +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};
// 显示近20期开奖号码
exports.getHistoryLotteryCode = function (id) {
    return 'https://route.showapi.com/44-2?code='+ id +'&count=20&endTime='+ new Date().Format('yyyy-MM-dd hh:mm:ss') +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};
// 彩票玩法介绍
exports.getJieshao = function (type) {
    return 'http://pimg1.126.net/swdp/game_rule/'+ type +'.html?time='+timeStamp();
};

// 幸运28介绍
exports.getXingyunJieshao = function (type) {
    return 'https://www.dandan29.com/mobile.php?s=/index/introduce/type/'+type;
};