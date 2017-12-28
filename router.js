import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/home/homePage'
import MainPage from './views/mainPage'
import LotteryDetailPage from './views/lottery/lotteryDetailPage'
import LotteryIntroducePage from './views/lottery/lotteryIntroducePage'
import allToolsPage from './views/home/allToolsPage'
import bonusCalculatePage from './views/home/bonusCalculatePage'
import trendPage from './views/home/trendPage'
import articleListPage from './views/home/articleListPage'
import articleDetailPage from './views/home/articleDetailPage'
const routers = StackNavigator({
    //launch: {screen: launchPage},
    // 欢迎页 引导页
    //Welcome: {screen: welcomePage},
    Main:{screen: MainPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},

    // 单个开奖号码
    lotteryDetail: {screen: LotteryDetailPage,navigationOptions: { header:null,}},
    // 玩法介绍
    lotteryIntroduce: {screen: LotteryIntroducePage,navigationOptions: { header:null,}},
    // 奖金计算
    bonusCalculate: {screen: bonusCalculatePage,navigationOptions: { header:null,}},
    // 所有工具
    allTools: {screen: allToolsPage,navigationOptions: { header:null,}},
    // 3D走势图
    trend: {screen: trendPage,navigationOptions: { header:null,}},

    // 福彩推荐/彩市新闻列表
    ArticleList: {screen: articleListPage, navigationOptions: { header:null,}},

    // 文章详情
    ArticleDetail: {screen: articleDetailPage, navigationOptions: { header:null,}},


    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},

});
module.exports = routers;