/**
 * Created by xiongtm on 2017/9/6.
 */
import {Platform} from 'react-native'
var appid = {

    sx: 2834699,
    def:28177990,
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

    appName: '赛车PK10平台',
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
        'https://appid-apkk.xx-app.com/frontApi/getAboutUs?appid='+appid.sg,
    cars : [
        {img:require('../imgs/cars/bsj.png'),name:'保时捷',id:40},
        {img:require('../imgs/cars/lbjn.png'),name:'兰博基尼',id:48},
        {img:require('../imgs/cars/bc.png'),name:'奔驰',id:36},
        {img:require('../imgs/cars/ad.png'),name:'奥迪',id:33},
        {img:require('../imgs/cars/bm.png'),name:'宝马',id:15},
        {img:require('../imgs/cars/bl.png'),name:'宾利',id:39},
        {img:require('../imgs/cars/fll.png'),name:'法拉利',id:42},
        {img:require('../imgs/cars/msld.png'),name:'玛莎拉蒂',id:57},
        {img:require('../imgs/cars/lts.png'),name:'路特斯',id:50},
        {img:require('../imgs/cars/asdmd.png'),name:'阿斯顿·马丁',id:35},
    ]
};
