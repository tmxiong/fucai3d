/**
 * Created by xiongtm on 2017/9/6.
 */
var appid = {
    def:666888
};
module.exports = {

    sourceName: '时时彩开奖宝典',
    appName: '时时彩开奖宝典',
    version:'v2.0',
    coreVersion:'v20',
    copyright:['Copyright © 2014-2017 256彩票.All Rights Reserved', '256彩票 版权所有'],
    myCheck: 'http://aite.ngrok.cc',
    launchImg:require('../imgs/launch/launch.png'),
    welcomeImg:[
        require('../imgs/welcome/welcome_1.png'),
        require('../imgs/welcome/welcome_2.png'),
        require('../imgs/welcome/welcome_3.png'),
    ],
    jumpUrl:'https://appid-apk.zz-app.com/frontApi/getAboutUs?appid='+appid.def
};
