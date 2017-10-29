/**
 * Created by timxiong on 2017/9/6.
 */
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
    ActivityIndicator,
    RefreshControl,
    Alert,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config';
import Loading from '../../component/updateModal'
import fetchp from '../../tools/fetch-polyfill';
import DatePicker from 'react-native-datepicker'
import urls from '../../config/urls'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.loadState = ['点击加载','没有更多数据','加载失败 点击重试'];
        this.state={
            data:[],
            animating: false,
            loadCode: 0,
            isRefreshing: true,
            date: new Date().Format('yyyy/MM/dd'),
        };

        this.page = 1;
        this.type = 1;
    }
    static defaultProps = {

    };

    componentDidMount() {
        const {type} = this.props.navigation.state.params;
        this.type = type;

        this.getHistoryData(type, this.page, this.state.date);

    }
    goBack() {
        this.props.navigation.goBack();
    }

    setDate(date) {
        this.page = 1;
        this.setState({
            date:date,
            isRefreshing:true,
            data:[],
        });
        this.getHistoryData(this.type, this.page, date);

    }
    dateToTimestamp(date) {
        return Date.parse(new Date(date))/1000;
    }

    _keyExtractor=(item, index) => item.issue;

    getHistoryData(type,page,date) {

        fetchp(urls.getHistory(type,page,date),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setHistoryData(data))
            .catch((error)=>this.setError(error));
    }
    setHistoryData(data) {
        //console.log(data)
        if(data.data.length != 0) {
            this.setState({
                data: this.state.data.concat(data.data),
                animating:false,
                isRefreshing:false,
            })
        } else {
            if(this.state.animating) {
                this.setState({
                    loadCode:1,
                    animating:false,
                })
            } else {
                Alert.alert("提示：","没有数据！")
            }

        }

    }
    setError(error) {
        if(this.state.animating) {
            this.page --;
            this.setState({
                animating:false,
                loadCode:2
            })
        } else {
            this.setState({
                isRefreshing:false,
            });
            Alert.alert('提示：',"加载错误，请下拉刷新重试！");
        }

    }

    loadMore() {
        if(!this.state.animating){
            this.setState({
                animating:true,
                loadCode:0
            });
            this.page++;
            this.getHistoryData(this.type, this.page, this.state.date);
        }

    }

    renderItem({item, index}) {
        let timestamp = item.open_time;
        let newDate = new Date();
        newDate.setTime(timestamp * 1000);
        let time = newDate.toLocaleTimeString().split(':').splice(0, 2).join(':');
        //let date = newDate.toLocaleDateString();

            return(
                <View
                    key={item.issue}
                    style={styles.itemContainer}>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemText}>{item.issue}</Text>
                    </View>
                    <View style={[styles.itemContent, styles.colBorder]}>
                        <Text style={styles.itemText}>{time}</Text>
                    </View>
                    {item.result.length == 0 ?
                        <View style={styles.itemContent}>
                        <Text>等待开奖</Text></View> :
                        <View style={styles.itemContent}>
                        <Text style={styles.itemText}>{item.result[0]}</Text>
                        <Text style={styles.itemText}>+</Text>
                        <Text style={styles.itemText}>{item.result[1]}</Text>
                        <Text style={styles.itemText}>+</Text>
                        <Text style={styles.itemText}>{item.result[2]}</Text>
                        <Text style={styles.itemText}>=</Text>
                        <View style={styles.codeResult}>
                            <Text style={styles.codeResultText}>{item.result[3]}</Text>
                        </View>
                    </View>}
                </View>
            );
        // }

    }

    _onRefresh() {
        this.page = 1;
        this.setState({
            isRefreshing:true
        });
        this.state.data = [];
        this.getHistoryData(this.type, this.page, this.state.date);
    }

    render() {
       return(
        <View style={styles.container}>
            <NavBar
            middleText="开奖记录"
            leftFn={()=>this.goBack()}
            />
            <View style={styles.historyTitleContainer}>
                <View style={styles.historyTitle}>
                    <Text>期号</Text>
                </View>
                <View style={[styles.historyTitle, styles.colBorder]}>
                    <Text>时间</Text>
                </View>
                <View style={styles.historyTitle}>
                    <Text>开奖号码</Text>
                </View>
            </View>


            <View style={{position:'absolute', top:0,
                right:0,height:cfn.picHeight(200),width:cfn.picWidth(200),
                alignItems:'center',justifyContent:'center'}}>
                <DatePicker date={this.state.date}
                            customStyles={{
                                dateInput:{
                                    //marginRight:cfn.picWidth(100),
                                    borderColor:'transparent',
                                    height:cfn.picHeight(200)
                                },
                                dateText: {
                                    color:'#fff',
                                    fontSize:15
                                }
                            }}
                            mode='date' showIcon={false}
                            androidMode='spinner'
                            format='YYYY/MM/DD' confirmBtnText='确定'
                            cancelBtnText='取消'
                            onDateChange={(date)=>this.setDate(date)}/>
            </View>
            <FlatList
                data={this.state.data}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={this._keyExtractor}
                style={{width:cfn.deviceWidth(),minHeight:100}}
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
                ListFooterComponent={
                    this.state.data.length == 0 ? null : <View
                        style={{height:cfn.picHeight(100),
                            width:cfn.deviceWidth(), backgroundColor:'#fff',alignItems:'center',
                            justifyContent:'center'}}>
                        {this.state.animating ?
                            <ActivityIndicator
                                animating={this.state.animating}
                                style={{height: cfn.picHeight(100),width:cfn.deviceWidth(), alignItems:'center',justifyContent:'center'}}
                                color="#000"
                                size="small"
                            /> :
                            <TouchableOpacity
                                style={{width:cfn.deviceWidth(),height:cfn.picHeight(100),alignItems:'center',justifyContent:'center'}}
                                activeOpacity={0.9}
                                onPress={()=>this.loadMore()}
                            >
                                <Text>{this.loadState[this.state.loadCode]}</Text>
                            </TouchableOpacity>}

                    </View>}
            />

        </View>)
    }
}

const styles = StyleSheet.create({
   container: {
       justifyContent:'flex-start',
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
       alignItems:'center'
   },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor:'#fff'
    },
    itemContent: {
        width: cfn.deviceWidth() / 3,
        height: cfn.picHeight(60),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    colBorder: {
        borderLeftColor: '#ddd',
        borderLeftWidth: 1,
        borderRightColor: '#ddd',
        borderRightWidth: 1
    },
    historyTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: cfn.deviceWidth(),
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#eee'
    },
    historyTitle: {
        width: cfn.deviceWidth() / 3,
        height: cfn.picHeight(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeResult: {
        width: cfn.picWidth(40),
        height: cfn.picWidth(40),
        borderRadius: cfn.picWidth(20),
        backgroundColor: config.baseColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: cfn.picWidth(10)
    },
    codeResultText: {
        fontSize: 12,
        color: '#fff'
    },
});