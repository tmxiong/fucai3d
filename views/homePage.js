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
        })
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
    _keyExtractor = (item, index)=> item[0];
    renderItem({item, index}) {
        let codes = item[1].split(',');
        codes = codes.map((item)=>parseInt(item));
        let count = codes[0] + codes[1] + codes[2];
        let minus = codes[2] - codes[0];
        let oneColor = '#418dff'; // 三球不同
        let twoColor = '#d08f05';
        let threeColor = '#7c1cde';
        let roundColor = ['transparent','transparent','transparent','transparent','transparent','transparent',];
        let textColor = ['#aaa','#aaa','#aaa','#aaa','#aaa','#aaa'];
        let codeColor = oneColor;

        // 基本号码 球位
        let jbhm = item[2];
        let jbhmCopy = JSON.parse(JSON.stringify(jbhm));

        // 球的下标
        let codeIndex = [];
        for(let i = 0; i < jbhmCopy.length; i++) {
            if(jbhmCopy[i] == 0) {
                codeIndex.push(i);
            }
        }

        let length = codeIndex.length;
        // for(let i = 0; i < length; i++) {
        //     roundColor[codeIndex[i]] = oneColor;
        //     textColor[codeIndex[i]] = '#fff';
        //     jbhmCopy[codeIndex[i]] = codes[i];
        // }
        if(length == 1) {
            // 三球相同
            codeColor = threeColor;
            roundColor[codeIndex[0]] = threeColor;
            textColor[codeIndex[0]] = '#fff';
            jbhmCopy[codeIndex[0]] = codes[0];
        } else if(length == 2) {
            codeColor = twoColor;
            // 两球相同
            if(codes[0] == codes[1]) {
                // 左两球相同
                roundColor[codeIndex[0]] = twoColor;
                roundColor[codeIndex[1]] = oneColor;

                textColor[codeIndex[0]] = '#fff';
                textColor[codeIndex[1]] = '#fff';

                jbhmCopy[codeIndex[0]] = codes[0];
                jbhmCopy[codeIndex[1]] = codes[2];
            } else if(codes[1] == codes[2]) {
                // 右两球相同
                roundColor[codeIndex[0]] = oneColor;
                roundColor[codeIndex[1]] = twoColor;

                textColor[codeIndex[0]] = '#fff';
                textColor[codeIndex[1]] = '#fff';

                jbhmCopy[codeIndex[0]] = codes[0];
                jbhmCopy[codeIndex[1]] = codes[2];
            }
        } else {
            // 三球不同
            roundColor[codeIndex[0]] = oneColor;
            roundColor[codeIndex[1]] = oneColor;
            roundColor[codeIndex[2]] = oneColor;

            textColor[codeIndex[0]] = '#fff';
            textColor[codeIndex[1]] = '#fff';
            textColor[codeIndex[2]] = '#fff';

            jbhmCopy[codeIndex[0]] = codes[0];
            jbhmCopy[codeIndex[1]] = codes[1];
            jbhmCopy[codeIndex[2]] = codes[2];
        }

        return(
            <View style={styles.items}>
            <View style={styles.col}><Text>{item[0].substr(-2)}</Text></View>
            <View style={styles.col}><Text style={{color:codeColor}}>{item[1]}</Text></View>
            <View style={styles.col}><Text>{count}</Text></View>
            <View style={styles.col}><Text>{minus}</Text></View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[0]}]}>
                    <Text style={[styles.codeText,{color:textColor[0]}]}>{jbhmCopy[0]}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[1]}]}>
                    <Text style={[styles.codeText,{color:textColor[1]}]}>{jbhmCopy[1]}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[2]}]}>
                    <Text style={[styles.codeText,{color:textColor[2]}]}>{jbhmCopy[2]}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[3]}]}>
                    <Text style={[styles.codeText,{color:textColor[3]}]}>{jbhmCopy[3]}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[4]}]}>
                    <Text style={[styles.codeText,{color:textColor[4]}]}>{jbhmCopy[4]}</Text>
                </View>
            </View>
            <View style={styles.col}>
                <View style={[styles.codeRound,{backgroundColor:roundColor[5]}]}>
                    <Text style={[styles.codeText,{color:textColor[5]}]}>{jbhmCopy[5]}</Text>
                </View>
            </View>
        </View>)
    }
    render() {
        return (
            <View style={styles.container}>
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
                    <Text style={{marginLeft:cfn.picWidth(20),fontSize:20,fontWeight:'bold'}}>江苏快3</Text>
                    <Text style={{marginLeft:cfn.picWidth(20),fontSize:16}}>第 </Text>
                    <Text style={{color:config.baseColor,fontSize:16}}>{this.state.currentIssue}</Text>
                    <Text style={{fontSize:16}}> 期</Text>
                </View>
                <View style={styles.issueContainer}>
                    <TouchableOpacity
                        style={styles.drawBtn}
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('DrawerOpen')}>
                        <Image
                            style={{width:cfn.picWidth(150),height:cfn.picWidth(150)}}
                            source={require('../imgs/caizhong_btn.png')}/>
                    </TouchableOpacity>
                    <View style={styles.colLine}/>
                    <View style={styles.codesContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={this.state.currentCodeImg[0]} style={styles.codeImg}/>
                            <Image source={this.state.currentCodeImg[1]} style={styles.codeImg}/>
                            <Image source={this.state.currentCodeImg[2]} style={styles.codeImg}/>
                        </View>
                        <View style={{flexDirection: 'row',marginTop:cfn.picHeight(20)}}>

                            <Text style={{color:'#fff'}}>开奖号码：</Text>
                            <Text style={{color:config.baseColor}}>{this.state.currentCode.toString()}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.items}>
                        <View style={styles.col}><Text>期号</Text></View>
                        <View style={styles.col}><Text>奖号</Text></View>
                        <View style={styles.col}><Text>和值</Text></View>
                        <View style={styles.col}><Text>跨度</Text></View>
                        <View style={styles.col}><Text>1</Text></View>
                        <View style={styles.col}><Text>2</Text></View>
                        <View style={styles.col}><Text>3</Text></View>
                        <View style={styles.col}><Text>4</Text></View>
                        <View style={styles.col}><Text>5</Text></View>
                        <View style={styles.col}><Text>6</Text></View>
                    </View>

                </View>
            <FlatList
                data={this.state.data}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#000"
                        title="正在加载···"
                        titleColor="#000"
                        colors={['#000']}
                        progressBackgroundColor="#fff"
                    />}
            >

            </FlatList>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
    },
    issueContainer:{
        flexDirection:'row',
        height:cfn.picHeight(200),
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    codesContainer: {
        width:cfn.deviceWidth()-cfn.picWidth(240),
        backgroundColor:'#2a9028',
        borderRadius:cfn.picWidth(20),
        height:cfn.picHeight(160),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20)
    },
    codeImg: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        marginRight:cfn.picWidth(20),
        resizeMode:'contain'
    },
    drawBtn: {
        height:cfn.picHeight(160),
        width:cfn.picWidth(170),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:cfn.picHeight(10),
        borderRadius:cfn.picWidth(20),
        backgroundColor:'#ccc'
    },
    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(100),
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'flex-end',
        paddingBottom:cfn.picHeight(10)
    },
    colLine: {
        width:1,
        height:cfn.picHeight(140),
        backgroundColor:'#ddd',
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(20),
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
        width:cfn.picWidth(50),
        height:cfn.picHeight(50),
        borderRadius:cfn.picWidth(25),
        alignItems:'center',
        justifyContent:'center',
    },
    codeText: {
        color:'#aaa'
    }
});