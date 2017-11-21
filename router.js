import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/homePage'
import NewsDetailPage from './views/detail/newsDetailPage'
import MainPage from './views/mainPage'
import CarVersionPage from './views/detail/carVersionPage'
import CarVersionPage2 from './views/detail/carVersionPage2'
import JieshaoPage from './views/detail/jieshaoPage'
import CarVersionDetailPage from './views/detail/carVertionDetailPage'
import ShopPage from './views/detail/shopPage';
import PKPage from './views/detail/pkPage';


const routers = StackNavigator({
    launch: {screen: launchPage},
    Main:{screen: MainPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},
    NewsDetail: {screen: NewsDetailPage,navigationOptions: { header:null,}},
    // 汽车型号列表
    CarVersion: {screen: CarVersionPage,navigationOptions: { header:null,}},
    CarVersion2: {screen: CarVersionPage2,navigationOptions: { header:null,}},
    // 汽车配置详情
    CarVersionDetail: {screen: CarVersionDetailPage,navigationOptions: { header:null,}},
    // 售车商店
    Shop: {screen: ShopPage,navigationOptions: { header:null,}},
    // 品牌介绍
    Jieshao: {screen:JieshaoPage,navigationOptions: {header:null}},
    // PK赛车
    PK: {screen:PKPage,navigationOptions: {header:null}},
    // 欢迎页 引导页
    Welcome: {screen: welcomePage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},

});
module.exports = routers;