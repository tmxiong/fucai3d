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
import PKListPage from './views/detail/pkListPage'
import PKPage from './views/detail/pkPage';
import HistoryPage from './views/detail/historyPage';
import CollectCarPage from './views/detail/collectCarPage'
import CollectShopPage from './views/detail/collectShopPage'

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
    PKList: {screen:PKListPage,navigationOptions: {header:null}},
    // PK赛车
    PK: {screen:PKPage,navigationOptions: {header:null}},
    // 欢迎页 引导页
    Welcome: {screen: welcomePage},
    // 阅读历史
    History: {screen: HistoryPage, navigationOptions: {header:null}},
    // 收藏赛车
    CollectCar: {screen: CollectCarPage, navigationOptions: {header:null}},
    // 收藏店铺
    CollectShop: {screen: CollectShopPage, navigationOptions: {header:null}},
    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},

});
module.exports = routers;