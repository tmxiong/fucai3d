/**
 * Created by xiongtm on 2017/9/6.
 * https://github.com/connected-lab/react-native-xml2js
 */
import {Platform} from 'react-native'
var appid = {

    sx: 2834699,
    def:8726407030,
    bd: 10456825,
    tx: 1106565862,
    xm: 675365,
    pp: 563576,
    op: 26856560,
    mz: 5910167,
    hw: 100152235,
    sll: 100152233,
    sg: 100152234,
    iOS: 1300453217,

};
module.exports = {

    appName: '福彩3D',
    baseColor:'#d81e06',
    myCheck: 'http://aite.ngrok.cc',
    launchImg:require('../imgs/launch/launch.png'),
    welcomeImg:[
        require('../imgs/welcome/welcome_1.png'),
        require('../imgs/welcome/welcome_2.png'),
        require('../imgs/welcome/welcome_3.png'),
    ],
    jumpUrl: Platform.OS == 'ios' ?
        'https://appid-ioss.xx-app.com/frontApi/getAboutUs?appid='+appid.iOS :
        'https://appid-apkk.xx-app.com/frontApi/getAboutUs?appid='+appid.def,
};
