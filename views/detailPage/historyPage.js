/**
 * Created by timxiong on 2017/9/6.
 */
// SyntaxError: Unexpected token < in JSON at position 0
import React, {Component} from 'react';
import {
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
import cfn from '../../tools/commonFun';
const urls = require('../../config/urls');
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import NavBar from '../../component/NavBar'
import Cbutton from '../../component/cbutton';
export default class HomePage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.type = props.navigation.state.params.type;
        this.name = props.navigation.state.params.name;
        this.state = {
            data: null,
            currentIssue: '*',
            items: null,
            nextIssue: '*',
            btnColor:['#fff','#fff',config.baseColor,'#fff','#fff',],
            btnText:['#aaa','#aaa','#fff','#aaa','#aaa',],
            isRefreshing: true,
        };

        this.type = 'k3js';
        this.date = 0;
    }

    componentDidMount() {
        this.getData(this.type, this.date);
    }
    goBack() {
        this.props.navigation.goBack();
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
        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.getData(this.type, this.date);
    }
    _keyExtractor = (item, index)=> item[0];
    renderItem({item, index}) {
        let jishu = 0; //奇数量；
        let codes = item[1].split(',');
        codes = codes.map((item)=>parseInt(item));
        let count = codes[0] + codes[1] + codes[2];
        let minus = codes[2] - codes[0];
        let oneColor = '#418dff'; // 三球不同
        let twoColor = '#d08f05';
        let threeColor = '#7c1cde';
        let codeColor = [oneColor,oneColor,oneColor,oneColor];
        if(codes[0] == codes[1] && codes[1] != codes[2]) {
            codeColor = [twoColor, twoColor, oneColor, twoColor]
        } else if(codes[0] != codes[1] && codes[1] == codes[2]) {
            codeColor = [oneColor, twoColor, twoColor ,twoColor]
        } else if(codes[0] == codes[2]) {
            codeColor = [threeColor, threeColor, threeColor, threeColor]
        }

        for(let i = 0; i < codes.length; i++) {
            if(codes[i]%2 == 1) {
                jishu ++;
            }
        }

       return(
           <View style={styles.items}>
               <View style={styles.col}><Text>{item[0].substr(-2)}</Text></View>
               <View style={styles.col}><Text>{jishu}</Text></View>
               <View style={styles.col}><Text>{minus}</Text></View>
               <View style={[styles.col,{width:cfn.deviceWidth()/2}]}>
                   <View style={[styles.codeSquare,{backgroundColor:codeColor[0]}]}>
                       <Text style={styles.codeText}>{codes[0]}</Text>
                   </View>
                   <Text style={styles.mark}>+</Text>
                   <View style={[styles.codeSquare,{backgroundColor:codeColor[1]}]}>
                       <Text style={styles.codeText}>{codes[1]}</Text>
                   </View>
                   <Text style={styles.mark}>+</Text>
                   <View style={[styles.codeSquare,{backgroundColor:codeColor[2]}]}>
                       <Text style={styles.codeText}>{codes[2]}</Text>
                   </View>
                   <Text style={styles.mark}>=</Text>
                   <View style={[styles.codeRound,{backgroundColor:codeColor[3]}]}>
                       <Text style={styles.codeText}>{count}</Text>
                   </View>
               </View>
           </View>
       )

    }

    changeDate(index) {
        let btnColor = ['#fff','#fff','#fff','#fff','#fff'];
        let btnText = ['#888','#888','#888','#888','#888'];
        btnColor[index] = config.baseColor;
        btnText[index] = '#fff';
        this.setState({
            btnColor:btnColor,
            btnText:btnText
        })
    }
    onChangeBack(index, date) {
        this.cbutton1.buttonRef(index);
        this.cbutton2.buttonRef(index);
        this.cbutton3.buttonRef(index);
        this.cbutton4.buttonRef(index);
        this.cbutton5.buttonRef(index);
        this.getData(this.type,date);
        //alert('点击了第'+index+1+'个按钮');
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={'历史号码'}
                    leftFn={this.goBack.bind(this)}
                />


                <View style={[styles.caizhong,{borderBottomWidth:0,marginTop:cfn.picHeight(20)}]}>
                    <Text style={{marginLeft:cfn.picWidth(20),marginRight:cfn.picWidth(20),fontSize:20,fontWeight:'bold'}}>{this.name}</Text>
                    <Cbutton
                        ref={(ref)=>this.cbutton1 = ref}
                        btnIndex={0}
                        btnState={0}
                        btnText='100期'
                        date="2"
                        onChangeBack={this.onChangeBack.bind(this)}
                    />
                    <Cbutton
                        ref={(ref)=>this.cbutton2 = ref}
                        btnIndex={1}
                        btnState={0}
                        btnText='50期'
                        date="1"
                        onChangeBack={this.onChangeBack.bind(this)}
                    />
                    <Cbutton
                        ref={(ref)=>this.cbutton3 = ref}
                        btnIndex={2}
                        btnState={1}
                        btnText='今天'
                        date="0"
                        onChangeBack={this.onChangeBack.bind(this)}
                    />
                    <Cbutton
                        ref={(ref)=>this.cbutton4 = ref}
                        btnIndex={3}
                        btnState={0}
                        btnText='昨天'
                        date="-1"
                        onChangeBack={this.onChangeBack.bind(this)}
                    />
                    <Cbutton
                        ref={(ref)=>this.cbutton5 = ref}
                        btnIndex={4}
                        btnState={0}
                        btnText='前天'
                        date="-2"
                        onChangeBack={this.onChangeBack.bind(this)}
                    />

                </View>
                <View style={[styles.caizhong]}>
                    <Text style={{marginLeft:cfn.picWidth(20),fontSize:16}}>第 </Text>
                    <Text style={{color:config.baseColor,fontSize:16}}>{this.state.currentIssue}</Text>
                    <Text style={{fontSize:16}}> 期开奖号码：{this.state.currentCode}</Text>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.items}>
                        <View style={styles.col}><Text>期号</Text></View>
                        <View style={styles.col}><Text>奇数量</Text></View>
                        <View style={styles.col}><Text>跨度</Text></View>
                        <View style={[styles.col,{width:cfn.deviceWidth()/2}]}><Text>开奖结果</Text></View>
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
                />

            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
        backgroundColor:'#fff',
    },

    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(80),
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center',
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
        borderBottomWidth:1,
        backgroundColor:'#fff',
    },
    col: {
        width:cfn.deviceWidth()/6,
        height:cfn.picHeight(70),
        alignItems:'center',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:'#ddd',
        flexDirection: 'row',
    },
    codeRound: {
        backgroundColor:'#f90',
        width:cfn.picHeight(50),
        height:cfn.picHeight(50),
        borderRadius:cfn.picWidth(25),
        alignItems:'center',
        justifyContent:'center',
    },
    codeSquare: {
      width:cfn.picWidth(50),
        height:cfn.picHeight(50),
        borderRadius:cfn.picWidth(5),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f90'
    },
    codeText: {
        color:'#fff'
    },
    mark: {
        marginLeft:cfn.picWidth(10),
        marginRight:cfn.picWidth(10)
    }
});