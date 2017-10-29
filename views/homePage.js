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
export default class HomePage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentCode: ['*', '*', '*'],
            currentIssue: '*',
            items: null,
            nextIssue: '*',
            name: '北京幸运28',
            isRefreshing: true,
        };

        this.type = 1;
        this.page = 1;
    }

    componentDidMount() {
        this.getData(this.type, this.page);
        this.setLotteryListener = DeviceEventEmitter.addListener('setLottery', (data)=> {
            this.goToPage('DrawerClose');
            this.setState({
                name: data.name,
            });
            if (this.type == data.type) return;
            this.type = data.type;
            this.getData(this.type, this.page);
        })
    }

    componentWillUnmount() {
        this.setLotteryListener.remove();
        this.clearDaojishi();
    }

    goToPage(route, params) {
        // DrawerOpen
        // DrawerClose
        this.props.navigation.navigate(route, params)
    }

    clearDaojishi() {
        clearInterval(this.timer);
    }

    getData(type, page) {
        this.clearDaojishi();
        fetchp(urls.get28(type, page), {timeout: 5 * 1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data));
    }

    setData(data) {
        try {
            data = data.data;
        } catch (e) {
        }

        let currentCode = data.list[1].result;
        let currentIssue = data.list[1].issue;
        let items = this.renderItem(data.list);
        let nextIssue = data.current.issue;
        let leftTime = parseInt(data.current.left_time);
        if (leftTime != 0) {
            let formatLeftTime = this.formatTime(leftTime);
            this._countDown._startCountDown(formatLeftTime);
            this.timer = setInterval(()=> {
                leftTime--;
                formatLeftTime = this.formatTime(leftTime);
                this._countDown._startCountDown(formatLeftTime);
                if (leftTime == 0) {
                    this.clearDaojishi();
                    this._countDown._startCountDown('正在开奖');
                    setTimeout(()=> {
                        this.getData(this.type, this.page);
                    }, 40 * 1000)
                }
            }, 1000);
        } else {
            setTimeout(()=> {
                this._countDown._startCountDown('正在开奖');
                this.getData(this.type, this.page);
            }, 5 * 1000)
        }


        this.setState({
            data: data,
            currentCode: currentCode,
            currentIssue: currentIssue,
            items: items,
            nextIssue: nextIssue,
            isRefreshing: false,
        })
    }

    formatTime(timeStamps) {
        var hour = "", minute = "", second = "", formatEndTime = "";
        var endTime = timeStamps;
        /*格式化时间*/
// if (endTime > 3600) {
// hour = parseInt(endTime / 3600);
// minute = parseInt((endTime % 3600) / 60);
// formatEndTime = dateBase.formatDay(hour) + ":" + dateBase.formatDay(minute);
// }
// else {
        minute = parseInt(endTime / 60);
        second = parseInt(endTime % 60);
        formatEndTime = dateBase.formatDay(minute) + ":" + dateBase.formatDay(second);
// }
//console.log(formatEndTime);
        return formatEndTime;
    }

    copyData(data) {
        return JSON.parse(JSON.stringify(data));
    }

    renderItem(data) {
        let items = [];
        let datas = this.copyData(data);
        let length = datas.length;
        length = length > 8 ? 8 : length;
        for (let i = 1; i < length; i++) {

            let timestamp = datas[i].open_time;
            let newDate = new Date();
            newDate.setTime(timestamp * 1000);
            let time = newDate.toLocaleTimeString().split(':').splice(0, 2).join(':');
            let date = newDate.toLocaleDateString();
            let codes = datas[i].result;
            let result = codes.splice(3, 1);
            codes = codes.splice(0, 3);
            let daxiao =  "小";
            let danshuang = "单";

            if(parseInt(result) > 13) {
                daxiao = "大";
            }
            if(parseInt(result)%2 == 0) {
                danshuang = "双";
            }


            items.push(
                <View
                    key={datas[i].issue}
                    style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <View style={styles.itemIcon}/>
                        <Text style={styles.headerText}>第</Text>
                        <Text style={[styles.headerText, {color: config.baseColor}]}>{datas[i].issue}</Text>
                        <Text style={styles.headerText}>期开奖结果：</Text>
                        <Text style={[styles.headerText,{position:'absolute',right:cfn.picWidth(20)}]}>{date+"  "+time}</Text>
                    </View>
                    <View style={styles.itemBody}>
                        <View style={styles.itemCode}>
                            <Text style={styles.itemCodeText}>{codes[0]}</Text>
                        </View>
                        <Text>+</Text>
                        <View style={styles.itemCode}>
                            <Text style={styles.itemCodeText}>{codes[1]}</Text>
                        </View>
                        <Text>+</Text>
                        <View style={styles.itemCode}>
                            <Text style={styles.itemCodeText}>{codes[2]}</Text>
                        </View>
                        <Text>=</Text>
                        <View style={[styles.itemCode, {backgroundColor: config.baseColor}]}>
                            <Text style={[styles.itemCodeText, {color: '#fff'}]}>{result}</Text>
                        </View>
                        <View style={styles.colBorder}/>
                        <View style={[styles.itemCode_1, {backgroundColor: daxiao == "小" ? config.baseColor : '#4b90de'}]}>
                            <Text style={[styles.itemCodeText, {color: '#fff'}]}>{daxiao}</Text>
                        </View>
                        <View style={[styles.itemCode_1, {backgroundColor: danshuang == "单" ? config.baseColor : '#4b90de'}]}>
                            <Text style={[styles.itemCodeText, {color: '#fff'}]}>{danshuang}</Text>
                        </View>
                    </View>

                </View>
            )
        }
        return items;
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.getData(this.type, this.page);
    }

    render() {
        return (
            <View style={styles.container}>
            <NavBar
                middleText={this.state.name}
                leftIcon={require('../imgs/mine_icon.png')}
                leftFn={this.goToPage.bind(this, 'DrawerOpen')}
                rightText={'玩法介绍'}
                rightFn={()=>this.goToPage('xinyunJieshao',{type:this.type,name:this.state.name})}
            />
                <UpdateModal
                    url={this.props.navigation.state.params.url}
                    modalVisible={this.props.navigation.state.params.showWebView}
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
                <View style={{
                    backgroundColor: '#fff', borderBottomColor: '#ddd',
                    borderBottomWidth: 1
                }}>
                    <View style={styles.issueContainer}>
                        <Text>第</Text>
                        <Text style={{color: config.baseColor}}>{this.state.currentIssue}</Text>
                        <Text>期开奖号码</Text>
                    </View>
                    <View style={styles.codeContainer}>
                        <View style={styles.codeBg}>
                            <Text style={styles.codeText}>{this.state.currentCode[0]}</Text>
                        </View>
                        <View style={styles.codeBg}>
                            <Text style={styles.codeText}>{this.state.currentCode[1]}</Text>
                        </View>
                        <View style={styles.codeBg}>
                            <Text style={styles.codeText}>{this.state.currentCode[2]}</Text>
                        </View>
                    </View>
                    <View style={styles.issueContainer}>
                        <Text>距{this.state.nextIssue}期剩余开奖时间：</Text>
                        <CountDown
                            ref={(ref)=>this._countDown = ref}
                        />
                    </View>
                    <Image
                        style={{width:cfn.deviceWidth()/2,resizeMode:'contain',height:cfn.deviceWidth()/4,
                            position:'absolute',right:0,top:5,opacity:0.2
                        }}
                        source={require('../imgs/home/xingyun_1.png')}/>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.optionCell, {
                            backgroundColor: '#b31800',
                            marginLeft: cfn.picWidth(10)
                        }]}
                        onPress={()=>this.goToPage('Yuce',{type:this.type, name:this.state.name})}>
                        <Image
                            style={styles.optionImg}
                            source={require('../imgs/home/yuce_icon.png')}/>
                        <Text style={styles.optionText}>专家预测</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.optionCell, {backgroundColor: '#2e6a88'}]}
                        onPress={()=>this.goToPage('HistoryData', {type: this.type})}>
                        <Image
                            style={styles.optionImg}
                            source={require('../imgs/home/search_icon.png')}/>
                        <Text style={styles.optionText}>历史查询</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.optionCell, {
                            backgroundColor: '#56a36e',
                            marginRight: cfn.picWidth(10)
                        }]}
                        onPress={()=> this.goToPage('Gonglue')}>
                        <Image
                            style={styles.optionImg}
                            source={require('../imgs/home/jieshao_icon.png')}/>
                        <Text style={styles.optionText}>秘籍攻略</Text>
                    </TouchableOpacity>

                </View>
                {this.state.items}

            </ScrollView>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
    },
    issueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: cfn.picWidth(20),
        marginTop: cfn.picHeight(30),
        marginBottom: cfn.picHeight(20)
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: cfn.picHeight(10),
    },
    codeBg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: cfn.picWidth(80),
        height: cfn.picWidth(80),
        borderRadius: cfn.picWidth(40),
        backgroundColor: config.baseColor,
        marginLeft: cfn.picWidth(20)
    },
    codeText: {
        fontSize: 20,
        color: '#fff'
    },
    optionsContainer: {
        height: cfn.picHeight(140),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        marginTop: cfn.picHeight(20),
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    optionCell: {
        flexDirection: 'row',
        width: (cfn.deviceWidth() - cfn.picWidth(60)) / 3,
        height: cfn.picHeight(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cfn.picHeight(20)
    },
    optionText: {
        color: '#fff',
        //marginLeft:cfn.picWidth(10),
        fontSize: 15,
        marginLeft: cfn.picWidth(10)
    },
    optionImg: {
        width: cfn.picWidth(70),
        height: cfn.picWidth(70),
        resizeMode: 'contain',
    },

    itemContainer: {
        width: cfn.deviceWidth() - cfn.picWidth(40),
        alignSelf: 'center',
        marginTop: cfn.picHeight(20)
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e1efff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: cfn.picHeight(60),

    },
    headerText: {
        fontSize: 12,
        color: '#888'
    },
    itemIcon: {
        width: cfn.picWidth(8),
        height: cfn.picHeight(30),
        backgroundColor: config.baseColor,
        marginLeft: cfn.picWidth(20),
        marginRight: cfn.picWidth(20)
    },
    itemBody: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: cfn.picHeight(120),
        paddingLeft: cfn.picWidth(10)
    },
    itemCode: {
        width: cfn.picWidth(60),
        height: cfn.picWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cfn.picHeight(30),
        borderColor: config.baseColor,
        borderWidth: 1,
        margin: cfn.picWidth(10)
    },
    itemCodeText: {
        color: config.baseColor,
        fontSize: 15
    },
    itemCode_1: {
        width: cfn.picWidth(60),
        height: cfn.picWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
        margin: cfn.picWidth(10)
    },
    itemCodeText_1: {
        color: config.baseColor,
        fontSize: 15
    },
    colBorder: {
        width: 1,
        height: cfn.picHeight(60),
        backgroundColor: '#ddd',
        marginLeft: cfn.picWidth(20),
        marginRight: cfn.picWidth(20)
    }
});