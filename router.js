import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import MainPage from './views/mainPage';
import singleKJDetailPage from './views/detailPage/singleKJDetailPage';
import allKJDetailPage from './views/detailPage/allKJDetailPage';
import historyDataPage from './views/detailPage/historyDataPage'
import tipsDetailPage from './views/detailPage/tipsDetailPage'
import playTipsPage from './views/playTips';
import moreArticle from './views/moreArticle';
import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import readHistoryPage from './views/detailPage/readHistoryPage'
import cpCollectionPage from './views/detailPage/cpCollectionPage'
import articleCollectionPage from './views/detailPage/articleCollectionPage'
import CPWebViewPage from './views/CPWebViewPage';
import morePlayTips from './views/morePlayTips'
import jieshaoDetailPage from './views/detailPage/jieshaoDetailPage'
import jieshaoPage from './views/jieshaoPage';
const routers = StackNavigator({
    launch: {screen: launchPage},
    Main: {screen: MainPage,},

    // 显示10期的开奖号码
    SingleKaijiang: {screen: singleKJDetailPage,},
    jieshao: {screen: jieshaoPage},
    jieshaoDetail: {screen: jieshaoDetailPage},


    PlayTips: {screen: playTipsPage},

    // 更多购彩资讯
    MoreArticle: {screen: moreArticle},
    HistoryData: {screen: historyDataPage,},

    // 更多购彩攻略
    MorePlayTips: {screen: morePlayTips},
    tipsDetail: {screen: tipsDetailPage},

    // 欢迎页 引导页
    Welcome: {screen: welcomePage},

    // 阅读记录页面
    ReadHistory: {screen: readHistoryPage},
    CpCollection: {screen: cpCollectionPage},

    // 收藏记录页面
    ArticleCollection: {screen: articleCollectionPage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},
});
module.exports = routers;