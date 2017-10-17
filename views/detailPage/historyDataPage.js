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
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config';
import Loading from '../../component/loading'
import fetchp from '../../tools/fetch-polyfill';
import DatePicker from 'react-native-datepicker'
import urls from '../../config/urls'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.loading = '正在加载...';
        this.error = '加载错误，点击重试';
        this.noData = '没有数据';

        this.state={
            data:[],
            isError:false,
            isLoading: false,
            loadState: this.loading,
            date: new Date().Format('yyyy-MM-dd')
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        const {data} = this.props.navigation.state.params;
        if(data) {
            this.setState({
                data:data.items
            })
        } else {
            //this.getHistoryData(0);
        }
    }
    goBack() {
        this.props.navigation.goBack();
    }

    setDate(date) {
        if(this.state.date != date) {
            this.setState({date:date});
            let timestamp = this.dateToTimestamp(date);
            this.getHistoryData(timestamp)
        }
    }
    dateToTimestamp(date) {
        return Date.parse(new Date(date))/1000;
    }
    getHistoryData(timestamp) {
        this.setState({
            data:[],
            loadState: this.loading
        });
        fetchp(urls.getHistoryData(timestamp),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setHistoryData(data))
            .catch((error)=>this.setError(error));
    }
    setHistoryData(data) {
        //console.log(data)
        if(data.items.length != 0) {
            this.setState({
                data: data.items
            })
        } else {
            this.setState({
                loadState: this.noData
            })
        }

    }
    setError(error) {
        this.setState({
            data:[],
            loadState:this.error,
        })
    }

    renderItem({item, index}) {
        return (
            <View
                key={item.period}
                style={styles.itemContainer}>
                <Text style={styles.qishu}>{item.period}</Text>
                <Text style={styles.shijian}>{item.time}</Text>
                <View style={styles.codesContainer_1}>
                    {this.renderCode(item.result.split(','))}
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
    _keyExtractor = (item, index) => item.period;

    reLoad() {
        if(this.state.loadState == this.error) {
            this.getHistoryData(this.dateToTimestamp(this.state.date))
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText="开奖记录"
                    leftFn={()=>this.goBack()}
                />
                {this.state.data.length == 0 ? null : <View
                    key={'head'}
                    style={styles.itemContainer}>
                    <Text style={[styles.qishu,{color:'#071244'}]}>期数</Text>
                    <Text style={[styles.shijian,{color:'#071244'}]}>时间</Text>
                    <View style={styles.codesContainer_1}>
                        <Text style={[styles.kaijiangjieguo,{color:'#071244'}]}>开奖结果</Text>
                    </View>
                </View>}
                {this.state.data.length == 0 ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=> this.reLoad()}
                        style={{top:cfn.deviceWidth()/2}}>
                        <Text>{this.state.loadState}</Text>
                    </TouchableOpacity> :
                    <FlatList
                        //style={styles.flatListStyle}
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        refreshing={true}
                        initialNumToRender={40}
                        legacyImplementation={true} // listView 实现方式
                        getItemLayout={(data, index) => ( {length: cfn.picHeight(80), offset: cfn.picHeight(80) * index, index} )}
                    />}
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
                                format='YYYY-MM-DD' confirmBtnText='确定'
                                cancelBtnText='取消'
                                onDateChange={(date)=>this.setDate(date)}/>
                </View>

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
        flexDirection:'row',
        alignItems:'center',
        width:cfn.deviceWidth(),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        height:cfn.picHeight(80),
        backgroundColor:'#fff'
    },
    // 开奖记录
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
        height:cfn.deviceHeight()
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
        color:'#fff',
        fontSize:12
    },
});
