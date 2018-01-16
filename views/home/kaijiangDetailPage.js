import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './../home/homePage';
import LotteryPage from './lotteryPage';
import MorePage from './../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import TrendPage_1 from '../trend/trendPage_1'
import {TabView} from "react-navigation";
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'
import config from '../../config/config'
export default class articleDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
        this.FCData = props.navigation.state.params.FCData;
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route, params)
    }

    render() {
        return(
            <View>
                <NavBar
                    middleText={'开奖详情'}
                    leftFn={()=>this.goBack()}
                    rightFn={()=>this.goToPage('lotteryIntroduce',{title:'福彩3D',jieshao:'x3d'})}
                    rightText="玩法介绍"
                />
                <View style={styles.titleContent}>
                    <View style={styles.banner_icon_container}>
                        <Image
                            style={styles.banner_icon_3d}
                            source={require('../../imgs/lotteryIcons/fc3d.png')}/>
                        <View style={styles.banner_title_container}>
                            <Text style={styles.banner_title_1}>福彩3D</Text>
                            <Text style={styles.banner_title_2}>第{this.FCData.qiHao}期  {this.FCData.lotDate}</Text>
                        </View>

                    </View>
                    <View activeOpacity={0.8}
                                      style={{flexDirection:'row',alignItems:'center',marginTop:cfn.picHeight(20)}}>
                        <View>
                            <Text style={styles.banner_code_title}>开奖号:</Text>
                            <View style={styles.banner_code_container}>
                                <View style={styles.banner_code_content_kj}>
                                    <Text style={styles.banner_code_text_kj}>{this.FCData.lottery.split(',')[0]}</Text>
                                </View>
                                <View style={styles.banner_code_content_kj}>
                                    <Text style={styles.banner_code_text_kj}>{this.FCData.lottery.split(',')[1]}</Text>
                                </View>
                                <View style={styles.banner_code_content_kj}>
                                    <Text style={styles.banner_code_text_kj}>{this.FCData.lottery.split(',')[2]}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.banner_code_border}/>
                        <View>
                            <Text style={styles.banner_code_title}>试机号:</Text>
                            <View style={styles.banner_code_container}>
                                <View style={styles.banner_code_content_sj}>
                                    <Text style={styles.banner_code_text_sj}>{this.FCData.sjh.split(' ')[0]}</Text>
                                </View>
                                <View style={styles.banner_code_content_sj}>
                                    <Text style={styles.banner_code_text_sj}>{this.FCData.sjh.split(' ')[1]}</Text>
                                </View>
                                <View style={styles.banner_code_content_sj}>
                                    <Text style={styles.banner_code_text_sj}>{this.FCData.sjh.split(' ')[2]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bodyContent}>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/2,textAlign:'center',color:'#000'}}>本期销售(元)</Text>
                        <Text style={{width:cfn.deviceWidth()/2,textAlign:'center',color:'#000'}}>当前奖池(元)</Text>
                    </View>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/2,textAlign:'center',color:'#c00'}}>{this.FCData.sell}</Text>
                        <Text style={{width:cfn.deviceWidth()/2,textAlign:'center',color:'#c00'}}>{this.FCData.poll || '-'}</Text>
                    </View>
                </View>

                <View style={styles.bodyContent}>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#000'}}>奖项</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#000'}}>中奖注数(注)</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#000'}}>单注奖金(元)</Text>
                    </View>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>直选</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>{this.FCData.rank1Num}</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#c00'}}>{1040}</Text>
                    </View>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>组三</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>{this.FCData.rank2Num}</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#c00'}}>{346}</Text>
                    </View>
                    <View style={styles.sell_row}>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>组六</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',}}>{this.FCData.rank3Num}</Text>
                        <Text style={{width:cfn.deviceWidth()/3,textAlign:'center',color:'#c00'}}>{173}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
   titleContent: {
        //alignItems:'center',
       justifyContent:'center',
       width:cfn.deviceWidth(),
       backgroundColor:'#fff',
       padding:cfn.picWidth(20),
       borderBottomColor:'#ddd',
       borderBottomWidth:1
   },
    bodyContent: {
        marginTop:cfn.picHeight(20),
        backgroundColor:'#fff',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center',
        justifyContent:'center',
    },
    sell_row: {
        flexDirection:'row',height:cfn.picHeight(80),
        alignItems:'center',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        width:cfn.deviceWidth(),
        justifyContent:'center',

    },
    banner_container: {
        padding: cfn.picWidth(20),
        justifyContent:'space-between',
        height:cfn.picHeight(300),
        paddingBottom:cfn.picHeight(30)
    },
    banner_icon_3d: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        resizeMode:'contain',
        marginRight:cfn.picWidth(20)
    },
    banner_icon_container: {
        flexDirection:'row',
        alignItems:'center',
        // borderBottomColor:'#eee',
        // borderBottomWidth:1
    },
    banner_title_container: {
        //marginLeft:cfn.picWidth(20)
    },
    banner_title_1: {
        color:'#333',
        fontSize:16
    },
    banner_title_2: {
        color: '#999',
        fontSize:12,
        marginTop:cfn.picHeight(10)
    },
    banner_icon: {
        width:cfn.picWidth(200),
        height:cfn.picWidth(200),
        resizeMode:'contain',
        position:'absolute',
        right:0,
        top:0,
        opacity:0.4
    },
    banner_title_border: {
        borderColor: config.baseColor,
        borderWidth:1,
        borderRadius:5,
        width:cfn.picWidth(150),
        height:cfn.picHeight(60),
        alignItems:'center',
        justifyContent:'center',
        opacity:0.5,
        position:'absolute',
        right:cfn.picWidth(20),
        top:0
    },
    banner_title_3: {
        color: config.baseColor,
        fontSize:15
    },
    banner_code_container: {
        flexDirection:"row"
    },
    banner_code_content_kj: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        backgroundColor:config.baseColor,
        borderRadius:cfn.picWidth(25),
        alignItems:'center',
        justifyContent:'center',
        marginRight:cfn.picWidth(10)
    },
    banner_code_text_kj: {
        color:'#fff',
        fontSize:18
    },
    banner_code_content_sj: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),

        alignItems:'center',
        justifyContent:'center',
        marginRight:cfn.picWidth(10)
    },
    banner_code_text_sj: {
        color:'#666',
        fontSize:18
    },
    banner_code_title: {
        color:'#666',
        fontSize:12,
        marginBottom:cfn.picHeight(5)
    },
    banner_code_border: {
        width:1,
        backgroundColor:'#eee',
        height:cfn.picHeight(60),
        marginLeft:cfn.picWidth(20),
        marginRight:cfn.picWidth(20)
    },
});