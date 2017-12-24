/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import NavBar from '../../component/NavBar';
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';

export default class MinePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            version: config.version,
            cleanCache: '点击清除',
        }
    }

    static defaultProps = {};

    getData() {
        this.setState({
            version: '正在检查更新'
        });
        fetchp('http://c.m.163.com', {
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'http://c.m.163.com',
                // 以下一条可防止出现403拒绝访问错误
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        }, {timeout: 1000 * 10})
            .then((data)=>this.setData())
            .catch((error)=>this.setError(error))
    }

    setData() {
        this.setState({
            version: '已经是最新版本 '+config.version,
        })
    }

    setError() {
        this.setState({
            version: '连接错误'
        })
    }

    cleanCache() {
        this.setState({
            cleanCache: '正在清除...'
        });
        setTimeout(()=>{
            this.setState({
                cleanCache: '已清除缓存'
            })
        },2*1000)

    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    fankui() {
        Alert.alert('意见反馈','如果您有好的意见和建议，\n或使用本软件时遇到问题，\n可以发送邮件至客服邮箱：\ntmxiong@foxmail.com\n感谢您对'+config.appName+'的支持！')
    }

    goBack() {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View style={styles.bg} >
                <NavBar
                    middleText='更多'
                    leftIcon={null}
                />
                <Image
                    style={styles.icon}
                    source={require('../../imgs/appIcon/cp_icon.png')}/>
                <Text
                    style={{marginTop: cfn.picHeight(20),
                        color: '#888',alignSelf:'center',backgroundColor:'transparent'}}>{config.appName}</Text>
                <ScrollView style={[styles.container,]}>



                        {/*<Text style={{marginTop: cfn.picHeight(20), color: '#888'}}>内核版本 {config.coreVersion}</Text>*/}
                        <TouchableOpacity
                            onPress={()=>this.goToDetail('Welcome',{showWebView:false,url:''})}
                            activeOpacity={0.8}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>我的欢迎页</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>this.goToDetail('History')}
                            activeOpacity={0.8}
                            style={[styles.item_container]}>
                            <Text style={styles.item_text}>阅读历史</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToDetail('CollectCar',{isFromMinePage:true})}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>收藏的赛车</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToDetail('CollectShop')}
                            style={styles.item_container}>
                            <Text style={styles.item_text}>收藏的店铺</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>
                        {/*<TouchableOpacity*/}
                            {/*activeOpacity={0.8}*/}
                            {/*onPress={()=>this.goToDetail('CpCollection')}*/}
                            {/*style={styles.item_container}>*/}
                            {/*<Text style={styles.item_text}>收藏的彩种</Text>*/}
                            {/*<Image*/}
                                {/*style={styles.icon_r}*/}
                                {/*source={require('../imgs/more_r_icon.png')}/>*/}
                        {/*</TouchableOpacity>*/}

                        <TouchableOpacity
                            onPress={()=>this.cleanCache()}
                            activeOpacity={0.9}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>清除缓存</Text>
                            <Text style={[styles.item_text, {
                                position: 'absolute',
                                right: cfn.picWidth(40),
                                color: '#888'
                            }]}>{this.state.cleanCache}</Text>
                        </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                            {/*onPress={()=>this.getData()}*/}
                            {/*activeOpacity={0.8}*/}
                            {/*style={styles.item_container}>*/}
                            {/*<Text style={styles.item_text}>当前版本</Text>*/}
                            {/*<Text style={[styles.item_text, {*/}
                                {/*position: 'absolute',*/}
                                {/*right: cfn.picWidth(40),*/}
                                {/*color: '#888'*/}
                            {/*}]}>{this.state.version}</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={styles.copyright}>*/}
                            {/*<Text style={styles.copyright_text}>{config.copyright[0]}</Text>*/}
                            {/*<Text style={styles.copyright_text}>{config.copyright[1]}</Text>*/}
                        {/*</View>*/}

                        <TouchableOpacity
                            onPress={()=>this.fankui()}
                            activeOpacity={0.8}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>意见反馈</Text>
                        </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        marginTop:cfn.picHeight(40),
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    bg: {
        height: cfn.deviceHeight(),
        width:cfn.deviceWidth(),
        //resizeMode:'contain'
    },
    icon: {
        width: cfn.picWidth(130),
        height: cfn.picWidth(130),
        resizeMode: 'contain',
        marginTop: cfn.picHeight(80),
        alignSelf:'center'
    },
    item_container: {
        flexDirection: 'row',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        paddingLeft: cfn.picWidth(20),
        paddingRight: cfn.picWidth(20)
    },
    item_text: {
        fontSize: 16,
        color: '#ccc'
    },
    icon_r: {
        width: cfn.picWidth(50),
        height: cfn.picHeight(50),
        resizeMode: 'contain',
        position: 'absolute',
        right: cfn.picWidth(20)
    },
    copyright: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        bottom: cfn.picHeight(20)
    },
    copyright_text: {
        color: '#999',
        marginTop: cfn.picHeight(10),
        fontSize:10,
    }
});