// 获取车型列表
exports.getCarVersion = function (id) {
  return 'https://cars.app.autohome.com.cn/cars_v8.5.5/cars/seriesprice-pm2-b'+id+'-t16-v8.5.5-c110100.json'
};
// 品牌介绍
exports.getJieshao = function (id) {
    return 'https://cars.app.autohome.com.cn/cars_v8.5.5/cars/getbrandinfo-pm2-b'+id+'.json'
};


