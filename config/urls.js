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
  return 'https://cars.app.autohome.com.cn/dealer_v8.4.5/dealer/pddealers-pm2-sp30493-ss771-c110100-sc0-p1-s5-o0-lon0.0-lat0.0-pid110000.json'
};
