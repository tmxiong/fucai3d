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
    Animated,
    ScrollView,
    Platform,
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loading'
import config from '../config/config'
const urls = require('../config/urls');
import dateBase from '../tools/dateBase';
import CountDown from '../component/countDown';
import Race from '../component/Race';
import fetchp from '../tools/fetch-polyfill';
import NavBar from '../component/NavBar'
import Notice from '../component/Notice';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false,
            isRefreshing: false,
            isAuto: true,  // true 为首次加载或自动加载 false 为下拉刷新
            raceState:'yiJing',
            raceNum:[5, 6, 4, 9, 10, 3, 8, 7, 1, 2],
            period: '*',// 当前期号,
            result: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*',], // 开奖号码
            items: null,
        };
    }

    static defaultProps = {};


    componentDidMount() {
        // true 为首次加载或自动加载
        // false 为下拉刷新
        //this.getData();
        //this.getHistoryData(0);
    }

    componentWillUnmount() {
        this.clearDaojishi();
    }

    getData() {
        let url = urls.getAwardData();

        fetchp(url, {timeout: 10 * 1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))

    }

    formatTime(timeStamps) {
        var hour = "", minute = "", second = "", formatEndTime = "";
        var endTime = timeStamps;

        /*格式化时间*/
        // if (endTime > 3600) {
        //     hour = parseInt(endTime / 3600);
        //     minute = parseInt((endTime % 3600) / 60);
        //     formatEndTime = dateBase.formatDay(hour) + ":" + dateBase.formatDay(minute);
        // }
        // else {
        minute = parseInt(endTime / 60);
        second = parseInt(endTime % 60);
        formatEndTime = dateBase.formatDay(minute) + ":" + dateBase.formatDay(second);
        // }

        //console.log(formatEndTime);
        return formatEndTime;
    }

    setData(data) {
        //console.log(new Date().getTime() - this.timer);
        //console.log(data);

        if (data.items) {
            let items = data.items;
            let endTime = parseInt(items.next.interval / 1000);
            this.daojishi(endTime);
            if(this.state.period == items.current.period && this.state.isAuto) {
                setTimeout(()=>{
                   this.getData();
                },3*1000)
            }else {
                this.getHistoryData(0);
                let result = items.current.result.split(',');
                this.setState({
                    period: items.current.period,
                    result: result,
                    isRefreshing:false,
                    isAuto: true,

                });
                this.startRace(result);
            }
        }
    }
    startRace(receNum) {

        this._raceRef._setRace('zhunBei',receNum);
        setTimeout(()=>{
            this._raceRef._setRace('zhengZai',receNum);
        },2*1000);
    }
    clearDaojishi() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    daojishi(time) {
        this.clearDaojishi();
        if(time <=0 ) {
            this.countDownRef._startCountDown('正在开奖');
            return;
        }

        let formatEndTime = this.formatTime(time);
        //alert(formatEndTime);
        this.countDownRef._startCountDown(formatEndTime);

        this.timer = setInterval(()=> {
            time --;
            let formatEndTime = this.formatTime(time);
            this.countDownRef._startCountDown(formatEndTime);
            if (time == 0) {
                this.clearDaojishi();
                this.countDownRef._startCountDown('正在开奖');
                setTimeout(()=>{
                    this.getData();
                },40*1000)
            }
        }, 1000);
    }

    setError(error) {
       setTimeout(()=>{
            this.getData();
       },2*1000);
        console.log(error);
    }


    goToDetail(route, params) {
        this.props.navigation.navigate(route, params);
    }


    _onRefresh() {
        this.setState({
            isRefreshing: true,
            isAuto: false,
        });
        this.getData();
        this.getHistoryData(0);
    }

    getHistoryData(timestamp) {
        fetchp(urls.getHistoryData(timestamp),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setHistoryData(data))
    }
    setHistoryData(data) {
        //console.log(data)
        let items = [
            <View
                key={'head'}
                style={styles.itemContainer}>
                <Text style={[styles.qishu,{color:'#071244'}]}>期数</Text>
                <Text style={[styles.shijian,{color:'#071244'}]}>时间</Text>
                <View style={styles.codesContainer_1}>
                    <Text style={[styles.kaijiangjieguo,{color:'#071244'}]}>开奖结果</Text>
                </View>
            </View>
        ];
        for(let i = 0; i < 10; i++) {
            items.push(this.renderItem(data.items[i]))
        }
        this.setState({
            historyData:data,
            items:items,
        })
    }
    renderItem(rowData) {
        return (
            <View
                key={rowData.period}
                style={styles.itemContainer}>
                <Text style={styles.qishu}>{rowData.period}</Text>
                <Text style={styles.shijian}>{rowData.time}</Text>
                <View style={styles.codesContainer_1}>
                    {this.renderCode(rowData.result.split(','))}
                </View>
            </View>
        )
    }
    renderCode(codes) {
        let bgColor = '#000';
        let codeView = [];
        for(let i = 0; i < codes.length; i++) {
            bgColor = cfn.getPK10Color(codes[i]);
            codeView.push(
                <View key={'c'+i} style={[styles.codeContainer_1,{backgroundColor:bgColor}]}>
                    <Text style={styles.codeStyle_1}>{codes[i]}</Text>
                </View>
            )
        }
        return codeView;
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                bgImg={require('../imgs/banner/pk10_banner.png')}
                bgColor='transparent'
                middleText='北京赛车'
                leftIcon={null}
                />
                <ScrollView
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
                    <View>
                        <View style={{flexDirection:'row',height:cfn.picHeight(100),alignItems:'center'}}>
                            <Text style={{fontSize:15,marginLeft:cfn.picWidth(20)}}>第 </Text>
                            <Text style={{color:'#f11',fontSize:15}}>{this.state.period}</Text>
                            <Text style={{fontSize:15}}> 期开奖号码：</Text>
                        </View>

                        <View style={styles.codesContainer}>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[0]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[1]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[2]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[3]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[4]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[5]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[6]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[7]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[8]}</Text></View>
                            <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[9]}</Text></View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:cfn.picHeight(10),marginBottom:cfn.picHeight(10)}}>
                            <Text style={{marginLeft:cfn.picWidth(20)}}>距{parseInt(this.state.period)+1 || '*'}期开奖剩余时间：</Text>
                            <CountDown
                                ref={(ref)=>this.countDownRef = ref}
                            />
                        </View>
                    </View>
                    <Race
                        ref={(ref)=>this._raceRef = ref}
                    />
                    {/*开奖号码*/}
                    <View style={styles.historyHead}>
                        <Text style={{fontSize:15,marginLeft:cfn.picWidth(20),color:'#071244'}}>开奖记录</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginRight:cfn.picWidth(20)}}
                            onPress={()=>this.goToDetail('HistoryData',{data:this.state.historyData})}
                        >
                            <Text style={{fontSize:15}}>查看更多>></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.historyBody}>
                        {this.state.items == null ? <Text>正在加载...</Text> : this.state.items}
                    </View>
                </ScrollView>
                <View style={{height:cfn.picHeight(100)}}/>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
        backgroundColor:'#fff'
    },
    nav: {
        width: cfn.deviceWidth(),
        height:cfn.picHeight(200),
        alignItems:'center',
        justifyContent:'center',
        resizeMode:'cover'
    },
    codesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        backgroundColor: '#fff'
    },
    codeContainer: {
        width: cfn.picHeight(50),
        height: cfn.picHeight(50),
        borderRadius: cfn.picHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:cfn.picWidth(10),
        backgroundColor:'#f22'
    },
    code:{
        color:'#fff'
    },

    // 开奖记录
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        width:cfn.deviceWidth(),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        height:cfn.picHeight(60),
        backgroundColor:'#fff'
    },
    historyHead: {
        height:cfn.picHeight(90),
        width:cfn.deviceWidth(),
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        justifyContent:'space-between'
    },
    historyBody: {
        alignItems:'center',
        justifyContent:'center',
        minHeight:cfn.picHeight(300)
    },
    codesContainer_1: {
        flexDirection: 'row',
        alignItems:'center',
        width:cfn.deviceWidth() - cfn.picWidth(100+150),
        justifyContent:'center'
    },
    codeContainer_1: {
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        backgroundColor:'#f95',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:cfn.picWidth(5),
    },
    qishu: {
        width:cfn.picWidth(150),
        textAlign:'center',
        color:'#555',
        fontSize:13
    },
    shijian: {
        width:cfn.picWidth(100),
        textAlign:'center',
        color:'#555',
        fontSize:13
    },
    kaijiangjieguo: {
        color:'#071244',
        fontSize:13
    },
    codeStyle_1: {
        color:'#222',
        fontSize:12
    },


});