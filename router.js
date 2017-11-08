import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/homePage'
import DrawPage from './views/drawPage/drawPage'

import TrendPage from './views/detailPage/trendPage'
import HistoryPage from './views/detailPage/historyPage'
import MoreTools from './views/detailPage/moreToolsPage'
import YucePage from './views/detailPage/yucePage'

import OrderPage from './views/orderPage'
import SingleKaijiangPage from './views/detailPage/singleKJDetailPage'
import JieshaoDetailPage from './views/detailPage/jieshaoDetailPage'
import XingyunJieshaoPage from './views/detailPage/xinyunJieshaoDetailPage'
import GongluePage from './views/detailPage/gongluePage';
import ArticleDetailPage from './views/detailPage/articleDetailPage';
import MoreToolsPage from './views/detailPage/moreToolsPage';
import MoreNewsPage from './views/detailPage/moreNewsPage';
import TestPage from './views/TestPage';

const routers = StackNavigator({
    launch: {screen: launchPage},
    Draw: {screen: DrawPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},
    // 开奖走势
    Trend: {screen: TrendPage,navigationOptions: { header:null,}},
    // 历史开奖
    History: {screen: HistoryPage,navigationOptions: { header:null,}},
    // 专家预测
    Yuce: {screen: YucePage,navigationOptions: { header:null,}},
    // 秘籍攻略
    Gonglue: {screen: GongluePage, navigationOptions: {header:null}},
    // 更多工具
    MoreTools: {screen: MoreToolsPage, navigationOptions: {header:null}},
    // 更多新闻
    MoreNews: {screen: MoreNewsPage, navigationOptions: {header:null}},

    // 文章详情 攻略和新闻
    ArticleDetail: {screen: ArticleDetailPage, navigationOptions: {header:null}},

    // 更多彩种
    Order: {screen: OrderPage,navigationOptions: { header:null,}},
    // 彩种介绍
    jieshaoDetail: {screen: JieshaoDetailPage, navigationOptions: { header:null,}},
    xinyunJieshao: {screen: XingyunJieshaoPage, navigationOptions: { header:null,}},
    // 单个开奖
    SingleKaijiang: {screen: SingleKaijiangPage, navigationOptions: {header:null}},



    // 欢迎页 引导页
    Welcome: {screen: welcomePage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},


    Test: {screen: TestPage, navigationOptions: { header:null,}}
});
module.exports = routers;