//http://www.zcool.com.cn/work/ZMjAwNTI5NTY=.html

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SectionList,
    StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill'
var parseString = require('react-native-xml2js').parseString;
import CardView from 'react-native-cardview'
import BannerZoom from '../../component/BannerZoom'
import BannerMini from '../../component/BannerMini'
import urls from '../../config/urls';
import lotterys from '../../config/lotterys';
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {
            allFCData:null,
            FCData:{
                lotDate:[1,1],
                sjh:[[1,1,1],[2,2,2]],
                lottery:[[3,3,3],[4,4,4]],
                qiHao:[1,1],
            },
            GLData:['','',''],
        };
    }

    componentDidMount() {
        SplashScreen.hide();
        this.getFCData();
        this.getGLData();
        this.getYuce();
        //this.carType('get');

    }

    // 福彩开奖号码
    getFCData() {
        fetchp(urls.getOpenCodeList(2,1),{timeout:10*1000})
            .then((res)=>res.json())
            .then((data)=>this.setFCData(data));

    }

    setFCData(data) {
        this.setState({
            allFCData:data,
            FCData:{
                lotDate:[data.items[1].lotDate,data.items[0].lotDate],
                sjh:[data.items[1].sjh.split(' '),data.items[0].sjh.split(' ')],
                lottery:[data.items[1].lottery.split(','),data.items[0].lottery.split(',')],
                qiHao:[data.items[1].qiHao,data.items[0].qiHao],
            }
        },()=>this._bannerZoom._startScroll(true));
    }

    // 福彩攻略
    getGLData() {
        fetchp(urls.getPlayTips('fc',15),{timeout:5*1000})
            .then((res)=>res.text())
            .then((data)=>this.setGLData(data))
    }
    setGLData(data) {
        data = data.substring(7,data.length-1);
        data = JSON.parse(data);
        this.setState({
            GLData:data.data.dataConfig.data
        })
        console.log(data)
    }

    getYuce() {
        fetchp(urls.getYuce(),{time:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setYuce(data))
    }

    setYuce(data) {
        this.setState({
            yuceData:data
        })
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    bannerZoomView() {
        const {FCData} = this.state;
        let bannerView_0 = <View style={styles.banner_container}>
            <View style={styles.banner_icon_container}>
                <Image
                    style={styles.banner_icon_3d}
                    source={require('../../imgs/lotteryIcons/fc3d.png')}/>
                <View style={styles.banner_title_container}>
                    <Text style={styles.banner_title_1}>福彩3D</Text>
                    <Text style={styles.banner_title_2}>第{FCData.qiHao[1]}期  {FCData.lotDate[1]}</Text>
                </View>

            </View>
            <TouchableOpacity activeOpacity={0.8}
                              onPress={()=>this.goToPage('KaijiangDetail',{FCData:this.state.allFCData.items[0]})}
                              style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                    <Text style={styles.banner_code_title}>开奖号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[1][0]}</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[1][1]}</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[1][2]}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.banner_code_border}/>
                <View>
                    <Text style={styles.banner_code_title}>试机号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[1][0]}</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[1][1]}</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[1][2]}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.detail_text}>详细>></Text>
            </TouchableOpacity>


            <Image style={styles.banner_icon} source={require('../../imgs/home/dangqiankj.png')}/>


        </View>;

        let bannerView_1 = <View style={styles.banner_container}>
            <View style={styles.banner_icon_container}>
                {/*<Image*/}
                    {/*style={styles.banner_icon_3d}*/}
                    {/*source={require('../../imgs/lotteryIcons/fc3d.png')}/>*/}
                <View style={styles.banner_title_container}>
                    <Text style={styles.banner_title_1}>福彩3D</Text>
                    <Text style={styles.banner_title_2}>第{FCData.qiHao[0]}期  {FCData.lotDate[0]}</Text>
                </View>

            </View>
            <TouchableOpacity activeOpacity={0.8}
                              onPress={()=>this.goToPage('KaijiangDetail',{FCData:this.state.allFCData.items[1]})}
                              style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                    <Text style={styles.banner_code_title}>开奖号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[0][0]}</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[0][1]}</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>{FCData.lottery[0][2]}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.banner_code_border}/>
                <View>
                    <Text style={styles.banner_code_title}>试机号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[0][0]}</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[0][1]}</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>{FCData.sjh[0][2]}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.detail_text}>详细>></Text>
            </TouchableOpacity>

            <Image style={styles.banner_icon} source={require('../../imgs/home/shangqikj.png')}/>

        </View>;

        let bannerView_2 = <View style={styles.banner_container}>
            <View style={styles.banner_icon_container}>
                {/*<Image*/}
                {/*style={styles.banner_icon_3d}*/}
                {/*source={require('../../imgs/lotteryIcons/fc3d.png')}/>*/}
                <View style={styles.banner_title_container}>
                    <Text style={styles.banner_title_1}>福彩3D</Text>
                    <Text style={styles.banner_title_2}>第{parseInt(FCData.qiHao[1])+1}期  开奖号码预测</Text>
                </View>

            </View>
            <View style={{flexDirection:'row',
                width:cfn.deviceWidth()-cfn.picWidth(150),flexWrap:'wrap'}}>
                {this.renderYuceCode()}
            </View>
            <Image style={styles.banner_icon} source={require('../../imgs/home/kaijiangyc.png')}/>
        </View>;

        return [bannerView_1,bannerView_0,bannerView_2]

    }

    renderYuceCode() {
        const {yuceData} = this.state;
        try{
            var codeData = yuceData.data
        }catch (e) {}

        if(!codeData) return <Text style={{marginBottom:cfn.picHeight(20)}}>正在智能预测...</Text>;

        let codeList = [];
        for(let i = 0; i < codeData.length; i++) {
            let codes = codeData[i].split(',');
            codeList.push(
                <View key={i} style={[styles.banner_code_container,
                    {marginRight:cfn.picWidth(20),marginTop:cfn.picHeight(10),marginBottom:cfn.picHeight(5)}]}>
                    <View style={styles.banner_code_content_kj}>
                        <Text style={styles.banner_code_text_kj}>{codes[0]}</Text>
                    </View>
                    <View style={styles.banner_code_content_kj}>
                        <Text style={styles.banner_code_text_kj}>{codes[1]}</Text>
                    </View>
                    <View style={styles.banner_code_content_kj}>
                        <Text style={styles.banner_code_text_kj}>{codes[2]}</Text>
                    </View>
                </View>
            )
        }

        return codeList;

    }

    renderMenu() {
        let menuItem = [];
        for(let i = 0; i < 4; i++) {
            menuItem.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={'menu'+i}
                    onPress={()=>this.goToPage(menuData[i].pageName,menuData[i].params)}
                    style={[styles.tools_content,{backgroundColor:menuData[i].bg_color}]}>
                    <Image style={styles.menu_icon} source={menuData[i].icon}/>
                    <View>
                        <Text style={styles.menu_title}>{menuData[i].title}</Text>
                        <Text style={styles.menu_sub_title}>{menuData[i].sub_title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return menuItem;
    }

    render() {

        return (
            <View style={styles.container}>
                <NavBar
                    middleText="首页"
                    leftIcon={null}
                    rightText="玩法说明"
                    rightFn={()=>this.goToPage('lotteryIntroduce',{jieshao:'x3d',title:'玩法说明'})}
                />
                <ScrollView style={{width:cfn.deviceWidth()}}>
                    <BannerZoom
                        ref={(ref)=>this._bannerZoom = ref}
                        bannerData={this.bannerZoomView()}
                        style={{marginTop:cfn.picHeight(10),
                            height:cfn.picHeight(310),}}
                    />
                    <View
                        style={{width:cfn.deviceWidth()-cfn.picWidth(40),alignItems:'center',alignSelf:'center'}}>
                        <BannerMini
                            navigation={this.props.navigation}
                            bannerData={this.state.GLData}
                            style={{borderRadius:10}}
                        />
                    </View>

                    <View
                        style={[styles.热门彩种容器]}>
                        <View style={styles.remen_title_container}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:3,height:14,backgroundColor:config.baseColor,marginRight:5}}/>
                                <Text style={styles.remen_title}>热门彩种</Text>
                            </View>

                            <TouchableOpacity activeOpacity={0.8}
                                onPress={()=>this.goToPage('Lottery')}
                            >
                                <Text>查看更多>></Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.remen_lottery_contaner}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={()=>this.goToPage('lotteryDetail',{id:lotterys[0].id,
                                    icon:lotterys[0].icon,
                                    jieshao:lotterys[0].jieshao,
                                    title: lotterys[0].name
                                })}
                                style={styles.remen_lottery}>
                                <Image style={styles.remen_icon} source={require('../../imgs/lotteryIcons/fc3d.png')}/>
                                <View>
                                    <Text style={styles.remen_lottery_name}>福彩3D</Text>
                                    <Text style={styles.remen_lottery_subName}>轻松赢千元</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>this.goToPage('lotteryDetail',{id:lotterys[1].id,
                                    icon:lotterys[1].icon,
                                    jieshao:lotterys[1].jieshao,
                                    title: lotterys[1].name
                                })}
                                style={styles.remen_lottery}>
                                <Image style={styles.remen_icon} source={require('../../imgs/lotteryIcons/jsks.png')}/>
                                <View>
                                    <Text style={styles.remen_lottery_name}>江苏快3</Text>
                                    <Text style={styles.remen_lottery_subName}>天天有奖</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={()=>this.goToPage('lotteryDetail',{id:lotterys[2].id,
                                    icon:lotterys[2].icon,
                                    jieshao:lotterys[2].jieshao,
                                    title: lotterys[2].name
                                })}
                                style={[styles.remen_lottery,{borderRightWidth:0}]}>
                                <Image style={styles.remen_icon} source={require('../../imgs/lotteryIcons/cqssc.png')}/>
                                <View>
                                    <Text style={styles.remen_lottery_name}>时时彩</Text>
                                    <Text style={styles.remen_lottery_subName}>超多玩法</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View
                        style={styles.tools_container}>
                        <View style={styles.remen_title_container}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:3,height:14,backgroundColor:config.baseColor,marginRight:5}}/>
                                <Text style={styles.remen_title}>实用工具</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>this.goToPage('allTools',{menuData:menuData})}
                            >
                                <Text>查看所有>></Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.tools_menu}>
                            {this.renderMenu()}
                        </View>

                    </View>
                </ScrollView>


            </View>
        )
    }

}

const menuData = [
    {
        icon: require('../../imgs/home/trend_icon.png'),
        title:'3D走势图',
        sub_title: '个/十/百位走势图',
        bg_color: '#fb667a',
        pageName: 'trend',
        params:{}
    },
    {
        icon: require('../../imgs/home/history_icon.png'),
        title:'历史开奖',
        sub_title: '历史开奖记录查看',
        bg_color: '#01cad4',
        pageName: 'history',
        params:{}
    },
    {
        icon: require('../../imgs/home/gonglue_icon.png'),
        title:'3D推荐',
        sub_title: '中奖，七分靠推荐',
        bg_color: '#f48221',
        pageName:'ArticleList',
        params:{type:'fc',name:'3D推荐'}
    },
    {
        icon: require('../../imgs/home/news_icon.png'),
        title:'彩市喜讯',
        sub_title: '看他们如何中奖',
        bg_color: '#1bc266',
        pageName:'ArticleList',
        params:{type:'csxw',name:'彩市喜讯'}
    },
    {
        icon: require('../../imgs/home/calc_icon.png'),
        title:'奖金计算器',
        sub_title: '中奖金额 一目了然',
        bg_color: '#0d8cac',
        pageName: 'bonusCalculate',
        params:{}
    },
];

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    热门彩种容器: {
        width: cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(200),
        backgroundColor:'#fff',
        borderRadius:6,
        alignSelf:'center',
        marginTop:cfn.picHeight(10)
    },
    remen_title_container: {
      flexDirection:'row',
        width: cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(60),
        justifyContent:'space-between',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        alignItems:'center',
        paddingLeft: cfn.picWidth(20),
        paddingRight: cfn.picWidth(20)
    },
    remen_title: {
        color:'#333'
    },
    remen_lottery_contaner: {
        flexDirection:'row',
        height:cfn.picHeight(140),
        alignItems:'center'
    },
    remen_lottery: {
        flexDirection:'row',
        width:(cfn.deviceWidth()-cfn.picWidth(40))/3,
        height:cfn.picHeight(100),
        alignItems:'center',
        borderRightColor:'#eee',
        borderRightWidth:1
    },
    remen_icon: {
        width: cfn.picWidth(80),
        height: cfn.picWidth(80),
        resizeMode:'contain',
        margin:cfn.picWidth(10)
    },
    remen_lottery_name: {
        fontSize:15,
        color:'#222'
    },
    remen_lottery_subName: {
        fontSize:10,
        color:'#999'
    },

    tools_container: {
        width: cfn.deviceWidth()-cfn.picWidth(40),
        minHeight:cfn.picHeight(300),
        backgroundColor:'#fff',
        marginTop: cfn.picHeight(20),
        alignItems:'center',
        alignSelf:'center',
        borderRadius:6
    },

    tools_content: {
        width:(cfn.deviceWidth()-cfn.picWidth(40+40+20)) /2,
        height:80,
        backgroundColor:'#f44',
        borderRadius:5,
        marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row'

    },
    tools_menu: {
        flexDirection:'row',
        width:cfn.deviceWidth()-cfn.picWidth(40),
        justifyContent:'space-between',
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        marginTop:cfn.picHeight(20),
        paddingBottom:cfn.picHeight(20),
        flexWrap:'wrap'
    },
    menu_icon: {
        width:cfn.picWidth(80),
        height:cfn.picHeight(80),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    menu_title: {
        fontSize:16,
        color:'#fff',
        marginLeft:cfn.picHeight(20),
        marginBottom:cfn.picHeight(10),
    },
    menu_sub_title: {
        fontSize:10,
        color:'#eee',
        marginLeft:cfn.picHeight(20),
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
    detail_text: {
        color:'#ccc',
        position:'absolute',
        right:cfn.picWidth(20)+6
    },


});

