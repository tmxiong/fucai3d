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
import Notice from '../component/Notice'
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
            name: '江苏快3',
            isRefreshing: false,
            newsItem: null,
        };

        this.type = 'k3js';
        this.date = 0;
    }

    componentDidMount() {
        this.getData(this.type, this.date);
        this.getNews();
        this.setLotteryListener = DeviceEventEmitter.addListener('setLottery', (data)=> {
            this.goToPage('DrawerClose');
            this.setState({
                name: data.name,
            });
            if (this.type == data.type) return;
            this.type = data.type;
            this.getData(this.type, this.date);
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

    getNews() {
        fetchp(urls.getNews(0),{timeout:5*1000})
            .then((res)=>res.text())
            .then((data)=>this.setNews(data))
    }
    setNews(data) {
        data = data.substring(7,data.length-1);
        data = JSON.parse(data);
        data = data.data.dataConfig.data;
        let views = [];
        let length = data.length < 5 ? data.length : 5;
        for(let i = 0; i < length; i++) {
            let item = data[i];
            views.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={i}
                    onPress={()=>this.goToPage('ArticleDetail', {
                            id: item.id,
                            //name: item.title,
                            name: '资讯详情',
                            rowData: item,
                        }
                    )}
                    style={styles.item_container}>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{item.title}</Text>
                        <Text style={styles.item_source}>{config.appName}</Text>
                        <Text style={styles.item_time}>{new Date(item.publishTime).toLocaleString().split(' ')[0]}</Text>
                    </View>
                    <Image
                        style={styles.item_img}
                        source={{uri: item.imageList[0]}}/>
                </TouchableOpacity>
            )
        }
        this.setState({newsItem: views})
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
                <Notice/>

                <Image source={require('../imgs/home/menu_bg_5.png')}  style={styles.issueContainer}>
                    <View style={styles.caizhong}>
                        <Text style={{marginLeft:cfn.picWidth(10),fontSize:12,color:config.baseColor}}>已选：</Text>
                        <Text style={{fontSize:18,color:'#fff'}}>{this.state.name}</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('History',{type:this.type, name:this.state.name})}
                            style={{position:'absolute',right:cfn.picWidth(20),bottom:cfn.picHeight(10)}}
                        >
                            <Text style={{color:'#fff'}}>更多号码>></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={styles.drawBtn}
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('DrawerOpen')}>
                            <Image
                                style={{width:cfn.picWidth(160),height:cfn.picWidth(160)}}
                                source={require('../imgs/caizhong_btn.png')}/>
                        </TouchableOpacity>
                        <View style={styles.colLine}/>
                        <View style={styles.codesContainer}>
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
                        </View>
                    </View>

                </Image>

                <View style={styles.menuContainer}>
                    <View style={styles.menuTitle}>
                        <Text style={{color:'#000'}}>快3工具 </Text>
                        <Text style={{color:'#ccc'}}> Kuai3 Tools</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('MoreTools',{type:this.type, name:this.state.name})}
                            style={{position:'absolute',right:cfn.picWidth(20),}}
                        >
                            <Text>更多工具>></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('Trend',{type:this.type, name:this.state.name})}>
                            <Image
                                style={styles.menuItem}
                                source={require('../imgs/home/menu_bg_s_1.png')}>
                                <Image  source={require('../imgs/home/trend_icon.png')} style={styles.menuIcon}/>
                                <View>
                                    <Text style={styles.menuText1}>快3走势图</Text>
                                    <Text style={styles.menuText2}>走势规律一目了然</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('Order')}>
                            <Image
                                style={styles.menuItem}
                                source={require('../imgs/home/menu_bg_s_2.png')}>
                                <Image  source={require('../imgs/home/lottery_icon.png')} style={styles.menuIcon}/>
                                <View>
                                    <Text style={styles.menuText1}>全国彩票</Text>
                                    <Text style={styles.menuText2}>全国各类彩票都在这里</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('Gonglue')}>
                            <Image
                                style={styles.menuItem}
                                source={require('../imgs/home/menu_bg_s_3.png')}>
                                <Image  source={require('../imgs/home/gonglue_icon.png')} style={styles.menuIcon}/>
                                <View>
                                    <Text style={styles.menuText1}>秘籍攻略</Text>
                                    <Text style={styles.menuText2}>来吧，助你一臂之力</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('History',{type:this.type, name:this.state.name})}>
                            <Image
                                style={styles.menuItem}
                                source={require('../imgs/home/menu_bg_s_4.png')}>
                                <Image  source={require('../imgs/home/history_icon.png')} style={styles.menuIcon}/>
                                <View>
                                    <Text style={styles.menuText1}>开奖记录</Text>
                                    <Text style={styles.menuText2}>查看快3历史开奖记录</Text>
                                </View>
                            </Image>
                        </TouchableOpacity>

                        <View style={{height:cfn.picHeight(20),width:cfn.picWidth(300)}}/>
                    </View>

                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.menuTitle}>
                        <Text style={{color:'#000'}}>彩票资讯 </Text>
                        <Text style={{color:'#ccc'}}> Lottery News</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('MoreNews')}
                            style={{position:'absolute',right:cfn.picWidth(20),}}
                        >
                            <Text>更多资讯>></Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.newsItem}
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
        height:cfn.picHeight(300),
        width:cfn.deviceWidth(),
        alignItems:'center',
        backgroundColor:'#fff',
    },
    codesContainer: {
        width:cfn.deviceWidth()-cfn.picWidth(240),
        borderRadius:cfn.picWidth(20),
        height:cfn.picHeight(200),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20),
    },
    codeImg: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        marginRight:cfn.picWidth(20),
        resizeMode:'contain'
    },
    drawBtn: {
        height:cfn.picHeight(180),
        width:cfn.picWidth(180),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:cfn.picWidth(20),
        //backgroundColor:'#ccc'
    },
    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(100),
        width:cfn.deviceWidth(),
        //backgroundColor: '#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'flex-end',
        paddingBottom:cfn.picHeight(10),
        borderTopColor:'#eee',
        borderTopWidth:1
    },
    colLine: {
        width:1,
        height:cfn.picHeight(200),
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
        backgroundColor:'#fff',
        marginTop:cfn.picHeight(20),
        borderTopColor:'#eee',
        borderTopWidth:1
    },
    menuTitle: {
      flexDirection:'row'  ,
        alignItems:'flex-end',
        height:cfn.picHeight(60),
        marginLeft:cfn.picWidth(20),
    },
    itemContainer: {
        flexDirection:'row',
        flexWrap:'wrap'
    },
    menuItem: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/2,
        height:(cfn.deviceWidth()-cfn.picWidth(60))/4,
        resizeMode:'stretch',
        flexDirection:'row',
        alignItems:'center',
        marginTop:cfn.picHeight(20),
        marginLeft:cfn.picWidth(20)
    },
    menuIcon: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        margin:cfn.picWidth(20),
        resizeMode:'contain'
    },
    menuText1: {
        color:'#fff',
        fontSize:15,
        fontWeight:'bold'
    },
    menuText2: {
        color:'#fff',
        fontSize:8,
        marginTop:cfn.picHeight(10)
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#444'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }
});