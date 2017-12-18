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

    bannerView() {
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

    render() {

        return (
            <View>
                <NavBar
                    middleText="首页"/>
                <BannerZoom
                    bannerData={this.bannerView()}
                />
                <View>
                    <CardView
                        style={[styles.testStyle,{width:100,height:100,backgroundColor:'#fff',marginLeft:20}]}
                        cardElevation={4}
                        cardMaxElevation={4}
                        cornerRadius={5}>

                    </CardView>
                </View>
                <View style={{marginTop:20}}>
                    <CardView
                        cardElevation={6}
                        cardMaxElevation={6}
                        cornerRadius={0}>
                        <View style={{width:100,height:100,backgroundColor:'#fff'}}/>
                    </CardView>
                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    testStyle: {
        marginLeft:20
    },
    banner_container: {
        padding: cfn.picWidth(20),
        justifyContent:'space-between',
        height:cfn.picHeight(300)-24
    },
    banner_icon_3d: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        resizeMode:'contain'
    },
    banner_icon_container: {
        flexDirection:'row',
        alignItems:'center',
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

