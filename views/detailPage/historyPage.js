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
import Spinner from 'react-native-loading-spinner-overlay'
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
            isLoading:true,
        };

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
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
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
            isLoading:false,
        })
    }
    setError(error) {
        this.setState({
            isRefreshing:false,
            isLoading:false,
        },()=>{
            Alert.alert('加载错误，请下拉刷新重试！')
        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.getData(this.type, this.date);
    }
    _keyExtractor = (item, index)=> item[0];
    renderItem({item, index}) {
        let bgColor = index%2==0 ? '#efefef' : '#fff';

        let jishu = 0; //奇数量；
        let codes = item[1].split(',');
        codes = codes.map((item)=>parseInt(item));
        let count = codes[0] + codes[1] + codes[2];
        let minus = codes[2] - codes[0];

        let daxiao = count > 10 ? '大' : '小';
        let danshuang = count%2 == 0 ? '双' : '单';
        let dxdsColor = [config.baseColor, '#f89'];

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

           <View style={[styles.items,{backgroundColor:bgColor}]}>
               <View style={styles.itemTitle}>
                   <View style={styles.icon}/>
                   <Text style={styles.titleText}>开奖结果：第</Text>
                   <Text style={[styles.titleText,{color:config.baseColor}]}>{item[0]}</Text>
                   <Text style={styles.titleText}>期</Text>
                   <Text style={[styles.titleText,styles.jiou]}>奇偶数量(奇):{jishu}</Text>
               </View>
               <View style={styles.itemContent}>

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
                   <View style={styles.colLine}/>
                   <View style={[styles.codeSquare,{backgroundColor:daxiao=='大'?config.baseColor:'#f89'}]}><Text style={styles.codeText}>{daxiao}</Text></View>
                   <View style={[styles.codeSquare,{marginLeft:cfn.picWidth(20),backgroundColor:danshuang=='双'?config.baseColor:'#f89'}]}><Text style={styles.codeText}>{danshuang}</Text></View>
                   <View style={[styles.codeSquare,{width:cfn.picWidth(100),marginLeft:cfn.picWidth(20),borderColor:'#ddd',borderWidth:1}]}>
                       <Text >跨度{minus}</Text>
                   </View>
               </View>
           </View>


       )

    }

    onChangeBack(index, date) {
        this.cbutton1.buttonRef(index);
        this.cbutton2.buttonRef(index);
        this.cbutton3.buttonRef(index);
        this.cbutton4.buttonRef(index);
        this.cbutton5.buttonRef(index);
        this.getData(this.type,date);
        this.setState({
            isLoading:true,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={'历史号码'}
                    leftFn={this.goBack.bind(this)}
                />
                <StatusBar hidden={false}
                           translucent= {true}
                           animated={true}
                           backgroundColor={this.state.isLoading ? 'rgba(0,0,0,0.7)':'transparent'}/>
                <Spinner visible={this.state.isLoading}
                         textContent={"正在加载..."}
                         overlayColor="rgba(0,0,0,0.7)"
                         color="rgb(217,29,54)"
                         animation='fade'
                         textStyle={{color: '#fff',fontSize:15}} />

                <View style={[styles.caizhong]}>
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
    },

    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(120),
        backgroundColor:'#fff',
        alignItems:'center',
    },
    colLine: {
        width:1,
        height:cfn.picHeight(70),
        backgroundColor:'#ddd',
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(20),
    },

    items: {
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        backgroundColor:'#fff',
        marginTop:cfn.picHeight(20)
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
        //backgroundColor:'#f90',
        width:cfn.picHeight(60),
        height:cfn.picHeight(60),
        borderRadius:cfn.picWidth(30),
        alignItems:'center',
        justifyContent:'center',
    },
    codeSquare: {
      width:cfn.picWidth(60),
        height:cfn.picHeight(60),
        borderRadius:cfn.picWidth(5),
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'#f90'
    },
    codeText: {
        color:'#fff'
    },
    mark: {
        marginLeft:cfn.picWidth(10),
        marginRight:cfn.picWidth(10)
    },
    itemTitle: {
        flexDirection:'row',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(50),
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center',
        paddingLeft:cfn.picWidth(20)
    },
    titleText: {
      fontSize:11,
        color:'#888'
    },
    icon: {
        backgroundColor:config.baseColor,
        width:cfn.picWidth(10),
        height:cfn.picHeight(30),
        marginRight:cfn.picWidth(20)
    },
    itemContent: {
        flexDirection:'row',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        alignItems:'center',
        paddingLeft:cfn.picWidth(20)
    },
    jiou: {
        position:'absolute',
        right:cfn.picWidth(20)
    },

    dxds: {

    },
    kuadu: {
        width:cfn.picWidth(100),
        height:cfn.picHeight(60)
    },
});