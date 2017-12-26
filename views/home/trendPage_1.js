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
    ScrollView
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
            .then((data)=>console.log(data))
    }

    setData(data) {
        this.setState({
            data:data.sub
        })
    }

    renderItem({rowData,index}) {
        return(
            <View style={styles.item_row}>
                <View style={styles.qihao}>
                    <Text>2017323</Text>
                </View>
                <View style={styles.kaijiang}>
                    <Text>666</Text>
                </View>

                <View style={styles.code_row}>
                    <View style={styles.weishu}><Text>0</Text></View>
                    <View style={styles.weishu}><Text>1</Text></View>
                    <View style={styles.weishu}><Text>2</Text></View>
                    <View style={styles.weishu}><Text>3</Text></View>
                    <View style={styles.weishu}><Text>4</Text></View>
                    <View style={styles.weishu}><Text>5</Text></View>
                    <View style={styles.weishu}><Text>6</Text></View>
                    <View style={styles.weishu}><Text>7</Text></View>
                    <View style={styles.weishu}><Text>8</Text></View>
                    <View style={styles.weishu}><Text>9</Text></View>
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
                           <View style={styles.weishu}><Text>0</Text></View>
                           <View style={styles.weishu}><Text>1</Text></View>
                           <View style={styles.weishu}><Text>2</Text></View>
                           <View style={styles.weishu}><Text>3</Text></View>
                           <View style={styles.weishu}><Text>4</Text></View>
                           <View style={styles.weishu}><Text>5</Text></View>
                           <View style={styles.weishu}><Text>6</Text></View>
                           <View style={styles.weishu}><Text>7</Text></View>
                           <View style={styles.weishu}><Text>8</Text></View>
                           <View style={styles.weishu}><Text>9</Text></View>
                       </View>
                   </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}

                />

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
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
        borderRightColor:'#eee'
    },


});