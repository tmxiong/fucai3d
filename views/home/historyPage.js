import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './../home/homePage';
import LotteryPage from './lotteryPage';
import MorePage from './../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import TrendPage_1 from '../trend/trendPage_1'
import {TabView} from "react-navigation";
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'
import config from '../../config/config'
export default class articleDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    componentDidMount() {
        this.getFCData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route,params) {
        this.props.navigation.navigate(route,params)
    }
    // 福彩开奖号码
    getFCData() {
        fetchp(urls.getOpenCodeList(100,1),{timeout:10*1000})
            .then((res)=>res.json())
            .then((data)=>this.setFCData(data));

    }

    setFCData(data) {
        this.setState({
            data:data.items,
        });
    }

    renderItem({item,index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.itemContainer}
                onPress={()=>this.goToPage('KaijiangDetail',{FCData:item})}
            >
                <Image style={styles.icon} source={require('../../imgs/lotteryIcons/fc3d.png')}/>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.fucaiText}>福彩3D</Text>
                        <Text style={{fontSize:12,color:'#999'}}>第{item.qiHao}期</Text>
                        <Text style={{fontSize:12,color:'#999',marginLeft:cfn.picWidth(10)}}>{item.lotDate}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:cfn.picHeight(5)}}>
                        <Text>开奖号：</Text>
                        <View style={styles.codeContainer}><Text style={styles.codeText}>{item.lottery.split(',')[0]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.codeText}>{item.lottery.split(',')[1]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.codeText}>{item.lottery.split(',')[2]}</Text></View>

                        <Text style={{marginLeft:cfn.picWidth(20)}}>试机号：</Text>
                        <Text>{item.sjh}</Text>
                    </View>
                </View>
                <Image style={styles.rightIcon} source={require('../../imgs/more_r_icon.png')}/>

            </TouchableOpacity>
        )
    }

    _keyExtractor=(item,index)=>index;

    render() {
        return(
            <View>
                <NavBar
                    middleText={'历史开奖'}
                    rightText='走势图'
                    leftFn={()=>this.goBack()}
                    rightFn={()=>this.goToPage('trend',{})}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={<Text style={{marginTop:cfn.picHeight(20),alignSelf:'center'}}>加载中...</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    itemContainer: {
        flexDirection:'row',
        backgroundColor:'#fff',
        height:cfn.picHeight(120),
        alignItems:'center',
        paddingLeft:cfn.picWidth(20),
        borderBottomWidth:1,
        borderBottomColor:'#ddd'
    },
    icon: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        marginRight:cfn.picWidth(20)
    },
    fucaiText: {
        fontSize: 14,
        color:'#000',
        marginRight:cfn.picWidth(20)
    },
    codeContainer: {
        width:cfn.picWidth(40),
        height:cfn.picWidth(40),
        borderRadius:cfn.picWidth(20),
        backgroundColor:'#f00',
        alignItems:'center',
        justifyContent:'center',
        marginRight:cfn.picWidth(5)
    },
    codeText: {
        color:'#fff'
    },
    rightIcon: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        resizeMode:'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    }
});