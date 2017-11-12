import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import HomePage from './views/homePage'
import MainPage from './views/mainPage'
import CarVersionPage from './views/detail/carVersionPage'



const routers = StackNavigator({
    launch: {screen: launchPage},
    Main:{screen: MainPage, navigationOptions: { header:null,}},
    Home: {screen: HomePage,navigationOptions: { header:null,}},
    // 汽车型号列表
    CarVersion: {screen: CarVersionPage,navigationOptions: { header:null,}},


    // 欢迎页 引导页
    Welcome: {screen: welcomePage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},

});
module.exports = routers;