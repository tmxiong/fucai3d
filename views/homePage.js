/**
 * Created by timxiong on 2017/9/6.
 */
// SyntaxError: Unexpected token < in JSON at position 0
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
    RefreshControl,
    ScrollView,
    Platform,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import cfn from '../tools/commonFun';
const urls = require('../config/urls');
import dateBase from '../tools/dateBase';
import CountDown from '../component/countDown';
import config from '../config/config'
import fetchp from '../tools/fetch-polyfill';
import NavBar from '../component/NavBar'
import UpdateModal from '../component/updateModal';
import Banner from '../component/Banner';
export default class HomePage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.codeImg = [
          require('../imgs/touzi/tz_1.png'),
          require('../imgs/touzi/tz_2.png'),
          require('../imgs/touzi/tz_3.png'),
          require('../imgs/touzi/tz_4.png'),
          require('../imgs/touzi/tz_5.png'),
          require('../imgs/touzi/tz_6.png'),
        ];

        this.state = {
            data: null,
            currentCode: ['*', '*', '*'],
            currentCodeImg: [this.codeImg[5],this.codeImg[5],this.codeImg[5]],
            currentIssue: '*',
            items: null,
            nextIssue: '*',
            name: '北京幸运28',
            isRefreshing: false,
        };

        this.type = 'k3js';
        this.date = 0;
    }

    componentDidMount() {
        this.getData(this.type, this.date);
        this.setLotteryListener = DeviceEventEmitter.addListener('setLottery', (data)=> {
            this.goToPage('DrawerClose');
            this.setState({
                name: data.name,
            });
            if (this.type == data.type) return;
            this.type = data.type;
            //this.getData(this.type, this.date);
        });
    }

    componentWillUnmount() {
        this.setLotteryListener.remove();
    }

    goToPage(route, params) {
        // DrawerOpen
        // DrawerClose
        this.props.navigation.navigate(route, params)
    }

    getData(type, date) {
        fetchp(urls.getKuai3(type, date), {timeout: 5 * 1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data));
    }

    setData(data) {
       let currentIssue = data.datas[data.datas.length - 1][0];
        let currentCode = data.datas[data.datas.length - 1][1];
        let currentCodeArr = currentCode.split(',');
        this.setState({
            data:data.datas,
            currentIssue:currentIssue,
            currentCode:currentCode,
            isRefreshing:false,
            currentCodeImg:[
                this.codeImg[currentCodeArr[0]-1],
                this.codeImg[currentCodeArr[1]-1],
                this.codeImg[currentCodeArr[2]-1]
            ]
        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.getData(this.type, this.date);
    }

    render() {
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                tintColor="#000"
                                title="正在加载···"
                                titleColor="#000"
                                colors={['#000']}
                                progressBackgroundColor="#fff"
                            />}>
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <UpdateModal
                    url={this.props.navigation.state.params.url}
                    modalVisible={this.props.navigation.state.params.showWebView}
                />
                <Banner
                    bannerList={[
                        require('../imgs/banner/banner_1.png'),
                        require('../imgs/banner/banner_2.png'),
                        require('../imgs/banner/banner_3.png'),
                    ]}
                />
                <View style={styles.caizhong}>
                    <Text style={{marginLeft:cfn.picWidth(10),fontSize:12,color:config.baseColor}}>已选：</Text>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>江苏快3</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('History')}
                        style={{position:'absolute',right:cfn.picWidth(20),bottom:cfn.picHeight(10)}}
                    >
                        <Text>历史开奖号码>></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.issueContainer}>
                    <TouchableOpacity
                        style={styles.drawBtn}
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('DrawerOpen')}>
                        <Image
                            style={{width:cfn.picWidth(160),height:cfn.picWidth(160)}}
                            source={require('../imgs/caizhong_btn.png')}/>
                    </TouchableOpacity>
                    <View style={styles.colLine}/>
                    <Image source={require('../imgs/home/menu_bg_5.png')} style={styles.codesContainer}>
                        <View style={{flexDirection:'row',}}>
                            {/*<Text style={{fontSize:12,color:'#eee',marginBottom:cfn.picHeight(10)}}>第 </Text>*/}
                            <Text style={{color:'#eee',fontSize:12}}>{this.state.currentIssue}</Text>
                            <Text style={{fontSize:12,color:'#eee',marginBottom:cfn.picHeight(30)}}> 期开奖号码：</Text>
                            <Text style={{color:config.baseColor,fontSize:12}}>{this.state.currentCode.toString()}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={this.state.currentCodeImg[0]} style={styles.codeImg}/>
                            <Image source={this.state.currentCodeImg[1]} style={styles.codeImg}/>
                            <Image source={this.state.currentCodeImg[2]} style={styles.codeImg}/>
                        </View>
                        <View style={{flexDirection: 'row',marginTop:cfn.picHeight(10)}}>


                        </View>
                    </Image>
                </View>

                <View style={styles.menuContainer}>
                    <View style={styles.menuTitle}>
                        <Text style={{color:'#000'}}>快3工具 </Text>
                        <Text style={{color:'#ccc'}}> Kuai3 Tools</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('History')}
                    >
                        <Image
                            source={require('../imgs/home/menu_bg_1.png')}
                            style={styles.menuItem}>
                            <View style={styles.menuIcon}/>
                            <View>
                                <Text style={styles.menuText}>历史开奖号码</Text>
                                <Text style={styles.menuSubText}>昨天/前天/50期/100期</Text>
                            </View>
                            <Text style={styles.look}>我要查看</Text>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('Trend')}
                    >
                        <Image
                            source={require('../imgs/home/menu_bg_2.png')}
                            style={styles.menuItem}>
                            <View style={styles.menuIcon}/>
                            <View>
                                <Text style={styles.menuText}>快3走势图</Text>
                                <Text style={styles.menuSubText}>走势规律一目了然</Text>
                            </View>
                            <Text style={styles.look}>我要查看</Text>
                        </Image>
                    </TouchableOpacity>

                    <Image
                        source={require('../imgs/home/menu_bg_3.png')}
                        style={styles.menuItem}>
                        <View style={styles.menuIcon}/>
                        <View>
                            <Text style={styles.menuText}>秘籍攻略</Text>
                            <Text style={styles.menuSubText}>来吧，助你一臂之力</Text>
                        </View>
                        <Text style={styles.look}>我要查看</Text>
                    </Image>
                    <Image
                        source={require('../imgs/home/menu_bg_4.png')}
                        style={styles.menuItem}>
                        <View style={styles.menuIcon}/>
                        <View>
                            <Text style={styles.menuText}>玩法详解</Text>
                            <Text style={styles.menuSubText}>知己知彼，方能百投百中</Text>
                        </View>
                        <Text style={styles.look}>我要查看</Text>
                    </Image>

                    <View style={{height:cfn.picHeight(20)}}/>
                </View>



        </ScrollView>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
    },
    issueContainer:{
        flexDirection:'row',
        height:cfn.picHeight(220),
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    codesContainer: {
        width:cfn.deviceWidth()-cfn.picWidth(240),
        backgroundColor:'#0066CC',
        borderRadius:cfn.picWidth(20),
        height:cfn.picHeight(200),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20),
        resizeMode:'stretch'
    },
    codeImg: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        marginRight:cfn.picWidth(20),
        resizeMode:'contain'
    },
    drawBtn: {
        height:cfn.picHeight(200),
        width:cfn.picWidth(200),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:cfn.picHeight(10),
        borderRadius:cfn.picWidth(20),
        backgroundColor:'#ccc'
    },
    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(100),
        backgroundColor: '#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'flex-end',
        paddingBottom:cfn.picHeight(10),
    },
    colLine: {
        width:1,
        height:cfn.picHeight(140),
        backgroundColor:'#ddd',
        marginLeft:cfn.picWidth(10),
        marginRight:cfn.picWidth(10),
    },

    items: {
        flexDirection:'row',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    col: {
        width:cfn.deviceWidth()/10,
        height:cfn.picHeight(60),
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#ddd',
    },
    codeRound: {
        backgroundColor:'#f90',
        width:cfn.picHeight(50),
        height:cfn.picHeight(50),
        borderRadius:cfn.picWidth(25),
        alignItems:'center',
        justifyContent:'center',
    },
    codeText: {
        color:'#aaa'
    },
    menuContainer: {
      width:cfn.deviceWidth(),
        backgroundColor:'#fff'
    },
    menuTitle: {
      flexDirection:'row'  ,
        alignItems:'flex-end',
        height:cfn.picHeight(60),
        marginLeft:cfn.picWidth(20),
    },
    menuItem: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(200),
        alignSelf:'center',
        borderRadius:25,
        marginTop:cfn.picHeight(20),
        resizeMode:'stretch',
        flexDirection:'row',
        alignItems:'center'
    },
    menuText: {
        color:'#fff',
        backgroundColor:'transparent',
        fontSize: 18
    },
    menuIcon: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        backgroundColor:'#fff',
        borderRadius:40,
        margin:cfn.picWidth(30)
    },
    menuSubText: {
        color:'#fff',
        fontSize:10,
        marginTop:cfn.picHeight(10)
    },
    look: {
        color:'#fff',fontSize:12,
        position:'absolute',
        right:cfn.picWidth(30)
    }
});