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
import cfn from '../../tools/commonFun';
const urls = require('../../config/urls');
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import NavBar from '../../component/NavBar';
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
            isLoading:false
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
                    middleText={'开奖走势'}
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
                         animation={'fade'}
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

    caizhong: {
        flexDirection: 'row',
        height:cfn.picHeight(120),
        backgroundColor:'#fff',
        alignItems:'center',
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
        backgroundColor:'#fff'
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
        width:cfn.picHeight(50),
        height:cfn.picHeight(50),
        borderRadius:cfn.picWidth(25),
        alignItems:'center',
        justifyContent:'center',
    },
    codeText: {
        color:'#aaa'
    }
});