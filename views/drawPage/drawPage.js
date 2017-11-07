import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import OrderPage from '../orderPage'
import MinePage from '../minePage'
import HomePage from '../homePage'
import DrawItems from './drawItems';
function setLottery(data) {
    DeviceEventEmitter.emit("setLottery",data);
}
const CustomDrawerContentComponent = (props) => (
    <DrawItems
        navigation={props.navigation}
    />
);
const MyDraw = DrawerNavigator({
        Home: {
            screen: HomePage,
        },

        Mine: {
            screen: MinePage,
        }
    },
    {
        drawerWidth: cfn.deviceWidth()/3*2, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
        // contentOptions: {
        //     initialRouteName: MyHomeScreen, // 默认页面组件
        //     activeTintColor: 'white',  // 选中文字颜色
        //     activeBackgroundColor: '#ff8500', // 选中背景颜色
        //     inactiveTintColor: '#666',  // 未选中文字颜色
        //     inactiveBackgroundColor: '#fff', // 未选中背景颜色
        //     style: {  // 样式
        //
        //     }
        // }
    });

module.exports = MyDraw;
const styles = StyleSheet.create({
    appIcon: {
      width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        borderRadius:cfn.picWidth(50),
        marginTop:cfn.picHeight(30)
    },
    icon: {
        width: 24,
        height: 24,
    },
    drawPage: {
        width:cfn.deviceWidth()/2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    itemContainer: {
        height:cfn.picHeight(100),
        width:cfn.deviceWidth()/2,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    itemText: {
        marginLeft:cfn.picWidth(30)
    }
});