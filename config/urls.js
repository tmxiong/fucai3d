exports.getAwardData = function () {
    return 'https://mo.1394x.com/pk10/GetAwardData?version=3000'
};
exports.getHistoryData = function (timestamp) {
    return 'https://mo.1394x.com/pk10/History?version=3000&timestamp='+timestamp
};
// 专家推荐
exports.getTuijianData = function () {
  return 'https://mo.1394x.com/pk10/BetGame?version=3000'
};



const url_id = 'T1356600029035';
let timeStamp = function () {
    return new Date().getTime();
};
let secret = 'eb7f104bd5c44f5fb6862b3b9a4b31af';
exports.getUrlId = ()=>{
    return url_id;
};
// 彩票玩法介绍
exports.getJieshao = function (type) {
    return 'http://pimg1.126.net/swdp/game_rule/'+ type +'.html?time='+timeStamp();
};

// 获取文章
exports.getArticleList = function (now,next) {
    return 'http://c.m.163.com/nc/article/list/'+ url_id +'/'+ now +'-'+ next +'.html'
};
// 根据docid获取文章详情
exports.getArticleDetail = function (docid) {
    return 'http://c.m.163.com/nc/article/' + docid + '/full.html'
};

// 购彩攻略 --------------------------------------------

// 福彩3d/高频彩/数字彩的列表链接
exports.getPlayTips = function (type,offset) {
    // type = fc/gpc/szc/csxw
    return 'https://m.qmcai.com/support/cmsv2/information/queryContent?parameter=%7B%22command%22:%22queryContent%22,%22categoryId%22:%22'+ type +'%22,%22offset%22:'+ offset +',%22size%22:15,%22platform%22:%22html%22,%22version%22:%225.2.16%22%7D&callback=jsonp5'
};

// 福彩3d/高频彩/数字彩的详情链接
exports.getPlayTipsDetail = function (id) {
    return 'https://m.qmcai.com/zixun/detail.html?_id=' + id +'&time=' + timeStamp();
};

// 彩票显示所有彩票最新一期开奖号码
exports.getNewestLotteryCode = function (id) {
    return 'https://route.showapi.com/44-1?code='+ id +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

// 显示近20期开奖号码
exports.getHistoryLotteryCode = function (id) {
    return 'https://route.showapi.com/44-2?code='+ id +'&count=20&endTime='+ new Date().Format('yyyy-MM-dd hh:mm:ss') +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

//查询某一期的彩票开奖号码
exports.getSearchLotteryCode = function (issue, id) {
    return 'https://route.showapi.com/44-3?code='+ id +'&expect='+ issue +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};