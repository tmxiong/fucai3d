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
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        SplashScreen.hide();
        //this.carType('get');
        fetchp('http://android.weicaicaipiao.com/trade/list.go?gid=03&ps=15&pn=1',{timeout:10*1000})
            .then((res)=>res.text())
            .then((data)=>{
                parseString(data, function (err, result) {
                    console.log(result);
                });
            })
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    bannerZoomView() {
        let bannerView_0 = <View>
            <Text>1</Text>
        </View>;

        let bannerView_1 = <View style={styles.banner_container}>
            <View style={styles.banner_icon_container}>
                <Image
                    style={styles.banner_icon_3d}
                    source={require('../../imgs/lotteryIcons/fc3d.png')}/>
                <View style={styles.banner_title_container}>
                    <Text style={styles.banner_title_1}>福彩3D</Text>
                    <Text style={styles.banner_title_2}>第2017344期  2017年12月12日</Text>
                </View>

            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View>
                    <Text style={styles.banner_code_title}>开奖号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>1</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>1</Text>
                        </View>
                        <View style={styles.banner_code_content_kj}>
                            <Text style={styles.banner_code_text_kj}>1</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.banner_code_border}/>
                <View>
                    <Text style={styles.banner_code_title}>试机号:</Text>
                    <View style={styles.banner_code_container}>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>1</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>1</Text>
                        </View>
                        <View style={styles.banner_code_content_sj}>
                            <Text style={styles.banner_code_text_sj}>1</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.detail_text}>详细>></Text>
            </View>

            <View style={styles.banner_title_border}>
                <Text style={styles.banner_title_3}>当前开奖</Text>
            </View>

        </View>;

        let bannerView_2 = <View>
            <Text>3</Text>
        </View>;

        return [bannerView_0,bannerView_1,bannerView_2]

    }

    bannerMiniView() {
        let views = [
            <View></View>
        ]
    }
    render() {

        return (
            <View style={styles.container}>
                <NavBar
                    middleText="首页"
                    leftIcon={null}
                />
                <ScrollView style={{width:cfn.deviceWidth()}}>
                    <BannerZoom
                        bannerData={this.bannerZoomView()}
                        style={{marginTop:cfn.picHeight(10),
                            height:cfn.picHeight(310),}}
                    />
                    <View
                        style={[styles.热门彩种容器]}>
                        <View style={styles.remen_title_container}>
                            <Text style={styles.remen_title}>热门咨询</Text>
                            <Text>查看所有>></Text>
                        </View>
                        <BannerMini
                            bannerData={[<Text>1</Text>,<Text>1</Text>,<Text>1</Text>]}
                            style={{borderRadius:10}}
                        />
                    </View>
                    <View
                        style={styles.热门彩种容器}>
                        <View style={styles.remen_title_container}>
                            <Text style={styles.remen_title}>热门彩种</Text>
                            <Text>查看所有>></Text>
                        </View>
                    </View>

                    <View
                        style={styles.tools_container}>
                        <View style={styles.remen_title_container}>
                            <Text style={styles.remen_title}>实用工具</Text>
                            <Text>查看所有>></Text>
                        </View>
                        <View style={styles.tools_menu}>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                            <View style={styles.tools_content}>
                                <Text>3D走势图</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>


            </View>
        )
    }

}


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


    tools_container: {
        width: cfn.deviceWidth()-cfn.picWidth(40),
        minHeight:cfn.picHeight(300),
        backgroundColor:'#fff',
        marginTop: cfn.picHeight(10),
        alignItems:'center',
        alignSelf:'center',
        borderRadius:6
    },

    tools_content: {
        width:(cfn.deviceWidth()-cfn.picWidth(40+40+20)) /2,
        height:100,
        backgroundColor:'#f44',
        borderRadius:5,
        marginTop:cfn.picHeight(20)

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

    banner_container: {
        padding: cfn.picWidth(20),
        justifyContent:'space-between',
        height:cfn.picHeight(300),
    },
    banner_icon_3d: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        resizeMode:'contain'
    },
    banner_icon_container: {
        flexDirection:'row',
        alignItems:'center',
        // borderBottomColor:'#eee',
        // borderBottomWidth:1
    },
    banner_title_container: {
        marginLeft:cfn.picWidth(20)
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
    }

});

