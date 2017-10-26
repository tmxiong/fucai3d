import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/homePage'
import DrawPage from './views/drawPage/drawPage'
import YucePage from './views/detailPage/yucePage'
import HistoryDataPage from './views/detailPage/historyDataPage'
import OrderPage from './views/orderPage'
import SingleKaijiangPage from './views/detailPage/singleKJDetailPage'
import JieshaoDetailPage from './views/detailPage/jieshaoDetailPage'
import XingyunJieshaoPage from './views/detailPage/xinyunJieshaoDetailPage'
import GongluePage from './views/detailPage/gongluePage';
import GonglueDetailPage from './views/detailPage/gonglueDetailPage';

import TestPage from './views/TestPage';

const routers = StackNavigator({
    launch: {screen: launchPage},
    Draw: {screen: DrawPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},
    // 历史查询
    HistoryData: {screen: HistoryDataPage,navigationOptions: { header:null,}},
    // 更多彩种
    Order: {screen: OrderPage,navigationOptions: { header:null,}},
    // 彩种介绍
    jieshaoDetail: {screen: JieshaoDetailPage, navigationOptions: { header:null,}},
    xinyunJieshao: {screen: XingyunJieshaoPage, navigationOptions: { header:null,}},
    // 单个开奖
    SingleKaijiang: {screen: SingleKaijiangPage, navigationOptions: {header:null}},
    Gonglue: {screen: GongluePage, navigationOptions: {header:null}},
    GonglueDetail: {screen: GonglueDetailPage, navigationOptions: {header:null}},

    // 欢迎页 引导页
    Welcome: {screen: welcomePage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},
    // 专家预测
    Yuce: {screen: YucePage, navigationOptions: { header:null,}},

    Test: {screen: TestPage, navigationOptions: { header:null,}}
});
module.exports = routers;