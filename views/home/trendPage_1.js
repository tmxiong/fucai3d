/**
 * Created by timxiong on 2017/9/6.
 */
import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ScrollView,
    FlatList
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './../home/homePage';
import LotteryPage from './../lottery/lotteryPage';
import MorePage from './../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
// import TrendTab from './trendTab'
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'

export default class articleDetailPage extends PureComponent {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state={

        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getTrend(),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data));
        // data=[
        //     ['2017213','123','0','1','2','3','4','5','6','7','8','9'],
        //     ['2017213','123','0','1','2','3','4','5','6','7','8','9'],
        //     ['2017213','123','0','1','2','3','4','5','6','7','8','9'],
        //     ['2017213','123','0','1','2','3','4','5','6','7','8','9'],
        // ]
    }

    setData(data) {
        data = this.formatData(data, 2);

        this.setState({
            data: data,
        })
    }

    formatData(data,weishu) {
        data = data.data.sub;
        // 百位2  十位3  个位4
        let newData = data[weishu].data;
        for(let i = 0; i < newData.length; i++) {
            // 开奖号
            newData[i].unshift(data[1].data[i][0]);
            // 期号
            newData[i].unshift(data[0].data[i][0]);
        }
       return newData;

    }

    renderCode(item) {
        let codes = [];
        for(let i = 0; i < 10; i++) {
            let codeStyle = {};
            if(item[i+2][1] == 1) {
                codeStyle = styles.codeStyle;
            }
            codes.push(
                <View style={styles.weishu}><Text style={[styles.weishuText,codeStyle]}>{item[i+2][0]}</Text></View>
            )
        }
        return codes;
    }

    renderItem({item,index}) {
        return(
            <View style={styles.item_row}>
                <View style={styles.qihao}>
                    <Text style={{fontSize:10}}>{item[0][0]}</Text>
                </View>
                <View style={styles.kaijiang}>
                    <Text style={{fontSize:10,color:'#f00'}}>{item[1][0].replace(/,/g,'  ')}</Text>
                </View>

                <View style={styles.code_row}>
                    {this.renderCode(item)}
                </View>

            </View>
        )
    }

    _keyExtractor=(item,index)=>index;

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.item_row}>
                    <View style={[styles.qihao,{height:cfn.picHeight(100)}]}>
                        <Text>期号</Text>
                    </View>
                    <View style={[styles.kaijiang,{height:cfn.picHeight(100)}]}>
                        <Text>开奖号码</Text>
                    </View>
                   <View>
                       <View style={[styles.weishuTitle]}>
                           <Text style={{fontSize:12}}>个位</Text>
                       </View>
                       <View style={[styles.code_row,{height:cfn.picHeight(50)}]}>
                           <View style={styles.weishu}><Text style={styles.weishuText}>0</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>1</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>2</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>3</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>4</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>5</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>6</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>7</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>8</Text></View>
                           <View style={styles.weishu}><Text style={styles.weishuText}>9</Text></View>
                       </View>
                   </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}

                />
                {/*<View style={{height:cfn.picHeight(100),width:1}}/>*/}

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        //backgroundColor:'#fff'
    },

    trendContainer: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'#fff'
    },

    item_row: {
        flexDirection:'row',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        backgroundColor:"#fff"
    },
    qihao: {
        width:cfn.deviceWidth()/16 * 3,
        height:cfn.picHeight(50),
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#eee'
    },
    kaijiang: {
        width:cfn.deviceWidth()/16 * 3,
        height:cfn.picHeight(50),
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#eee'
    },
    code_row: {
        width:cfn.deviceWidth()/16 * 10,
        height:cfn.picHeight(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    weishuTitle: {
        //backgroundColor:'#f00',
        height:cfn.picHeight(50),
        alignItems:'center',
        justifyContent:'center',
        width:cfn.deviceWidth()/16 * 10,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    weishu: {
        width:cfn.deviceWidth()/16,
        height:cfn.picHeight(50),
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#eee',

    },
    codeStyle: {
        width:cfn.deviceWidth()/16 - 3,
        height:cfn.deviceWidth()/16 - 3,
        backgroundColor:'#f00',
        color:'#fff',
        borderRadius:cfn.deviceWidth()/32 - 1.5,
        textAlign:'center',
        lineHeight:17
    },

    weishuText: {
        fontSize:10,
    }


});