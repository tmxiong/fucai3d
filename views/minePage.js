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

import NavBar from '../component/NavBar';
import cfn from '../tools/commonFun'
import config from '../config/config'
import fetchp from '../tools/fetch-polyfill';

export default class MinePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            version: config.version,
            cleanCache: '点击清除',
        }
    }

    static defaultProps = {};

    cleanCache() {
        this.setState({
            cleanCache: '已清除缓存'
        })
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    fankui() {
        Alert.alert('意见反馈','如果您有好的意见和建议，\n或使用本软件时遇到问题，\n可以发送邮件至客服邮箱：\ntmxiong@foxmail.com\n感谢您对'+config.sourceName+'的支持！')
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='更多'
                    leftIcon={null}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={styles.icon_bg}
                               source={require("../imgs/appIcon/icon_bg.png")}>
                            <Image
                                style={styles.icon}
                                source={require('../imgs/appIcon/cp_icon.png')}/>
                            <Text style={{marginTop: cfn.picHeight(20), color: '#fff'}}>{config.appName}</Text>
                        </Image>

                        <TouchableOpacity
                            onPress={()=>this.goToDetail('Welcome',{showWebView:false,url:'http://c.m.163.com'})}
                            activeOpacity={0.8}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>欢迎页</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>this.cleanCache()}
                            activeOpacity={0.8}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>清除缓存</Text>
                            <Text style={[styles.item_text, {
                                position: 'absolute',
                                right: cfn.picWidth(40),
                                color: '#888'
                            }]}>{this.state.cleanCache}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>this.goToDetail('AboutApp',{showWebView:false,url:'http://c.m.163.com'})}
                            activeOpacity={0.8}
                            style={[styles.item_container, {marginTop: cfn.picWidth(30)}]}>
                            <Text style={styles.item_text}>关于</Text>
                            <Image
                                style={styles.icon_r}
                                source={require('../imgs/more_r_icon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.fankui()}
                            activeOpacity={0.8}
                            style={[styles.item_container]}>
                            <Text style={styles.item_text}>意见反馈</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: cfn.deviceHeight()
    },
    icon: {
        width: cfn.picWidth(130),
        height: cfn.picWidth(130),
        resizeMode: 'contain',
    },
    icon_bg: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(300),
        alignItems:'center',
        justifyContent:'center'
    },
    item_container: {
        flexDirection: 'row',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        paddingLeft: cfn.picWidth(20),
        paddingRight: cfn.picWidth(20)
    },
    item_text: {
        fontSize: 16,
        color: '#222'
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