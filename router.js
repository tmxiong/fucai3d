import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/home/homePage'
import MainPage from './views/mainPage'


const routers = StackNavigator({
    //launch: {screen: launchPage},
    // 欢迎页 引导页
    //Welcome: {screen: welcomePage},
    Main:{screen: MainPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},
    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},

});
module.exports = routers;