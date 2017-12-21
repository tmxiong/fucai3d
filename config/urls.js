let timeStamp = function () {
    return new Date().getTime();
};

// 福彩3D开奖号码列表
exports.getOpenCodeList = function (listNum, page) {
    return 'http://www.zjt-cp.com/lot/getLotByPage?param={"pageSize":'+ listNum +',"clientId":"suma-tech.pc.zjt","lotteryCategory":"Magic3_Fc3D","pageNum":'+ page +'}'
};

// 福彩3d/高频彩/数字彩的列表链接
exports.getPlayTips = function (type,offset) {
    // type = fc/gpc/szc/csxw
    return 'https://m.qmcai.com/support/cmsv2/information/queryContent?parameter=%7B%22command%22:%22queryContent%22,%22categoryId%22:%22'+ type +'%22,%22offset%22:'+ offset +',%22size%22:15,%22platform%22:%22html%22,%22version%22:%225.2.16%22%7D&callback=jsonp5'
};

// 福彩3d/高频彩/数字彩的详情链接
exports.getPlayTipsDetail = function (id) {
    return 'https://m.qmcai.com/zixun/detail.html?_id=' + id +'&time=' + timeStamp();
};





// 获取车型列表
exports.getCarVersion = function (id) {
  return 'https://cars.app.autohome.com.cn/cars_v8.5.5/cars/seriesprice-pm2-b'+id+'-t16-v8.5.5-c110100.json'
};
// 品牌介绍
exports.getJieshao = function (id) {
    return 'https://cars.app.autohome.com.cn/cars_v8.5.5/cars/getbrandinfo-pm2-b'+id+'.json'
};

// 获取车型列表2
exports.getCarVersion2 = function (id) {
   return 'https://cars.app.autohome.com.cn/carinfo_v8.5.0/cars/seriessummary-pm2-s'+id+'-t-c110100-v8.5.5.json'
};

// 获取所售车型商店
exports.getShop = function (id) {
  return 'https://cars.app.autohome.com.cn/dealer_v8.4.5/dealer/pddealers-pm2-sp'+id+'-ss771-c110100-sc0-p1-s5-o0-lon0.0-lat0.0-pid110000.json'
};
// 获取车型详情
exports.getCarDetail = function (id) {
    return 'https://cars.app.autohome.com.cn/cfg_v8.5.0/cars/speccompare.ashx?pm=2&type=1&specids='+id+'&cityid=110100&site=2&pl=2'
};
// 获取PK的数据
exports.getPK = function (ids) {
    // 23370,21620
    return 'https://cars.app.autohome.com.cn/compare_v8.4.5/cars/speccomparefirstpage.ashx?pm=2&specids='+ids+'&cityid=110100';
};

// 获取新闻列表
exports.getCarNews = function (page) {
    let list = page*20;
    return "http://c.m.163.com/nc/auto/districtcode/list/110000/"+list+"-20.html";
};

exports.getCarNewsDetail = function (id) {
    return 'http://c.m.163.com/nc/article/'+id+'/full.html';
};