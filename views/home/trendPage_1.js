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
    FlatList,
    RefreshControl,
    Alert,
    TouchableOpacity
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
            data:[],
            isError:false,
        }
    }
    static defaultProps = {
        data:[],
        weishu:'',
    };

    componentWillReceiveProps(props) {
        //console.log(props.data);
        //return;
        try{
            if(props.isError) {
                this.setState({
                    isError:true,
                });
                return;
            }
            else if(this.state.data.length != 0) return;
            let data = this.formatData(props.data,props.weiIndex);
            this.setState({
                data:data,
                isRefreshing:false,
            })
        }catch (e) {

        }


    }

    componentDidMount() {

    }

    goBack() {
        this.props.navigation.goBack();
    }

    formatData(data,weishu) {
        try{
            data = data.data.sub;
            // 百位2  十位3  个位4
            var newData = data[weishu].data;
            for(let i = 0; i < newData.length; i++) {
                // 开奖号
                newData[i].unshift(data[1].data[i][0]);
                // 期号
                newData[i].unshift(data[0].data[i][0]);
            }
        }catch (e) {

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
                <View key={'k'+i} style={styles.weishu}><Text style={[styles.weishuText,codeStyle]}>{item[i+2][0]}</Text></View>
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

    reload() {
        if(!this.state.isError) return;
        this.props.reload();

        this.setState({
            isError:false,
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={[styles.item_row,{backgroundColor:this.props.bgColor}]}>
                    <View style={[styles.qihao,{height:cfn.picHeight(100)}]}>
                        <Text>期号</Text>
                    </View>
                    <View style={[styles.kaijiang,{height:cfn.picHeight(100)}]}>
                        <Text>开奖号码</Text>
                    </View>
                   <View>
                       <View style={[styles.weishuTitle]}>
                           <Text style={{fontSize:12}}>{this.props.weishu}</Text>
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
                    ListEmptyComponent={
                        <TouchableOpacity
                            style={{marginTop:cfn.picHeight(50)}}
                            activeOpacity={0.8} onPress={()=>this.reload()}>
                            <Text>{this.state.isError ? "加载错误，点击重试" : "数据加载中..."}</Text>
                        </TouchableOpacity>

                    }

                />
                {/*<View style={{height:cfn.picHeight(100),width:1}}/>*/}

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'#fff'
    },

    trendContainer: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        //backgroundColor:'#fff'
    },

    item_row: {
        flexDirection:'row',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        //backgroundColor:"#fff"
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