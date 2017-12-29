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
        Alert.alert('反馈邮箱：','tmxiong@foxmail.com')
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
                <View style={{backgroundColor:'#fff',alignItems:'center',
                    justifyContent:'center',height:cfn.picHeight(300),borderBottomColor: '#ddd',
                    borderBottomWidth: 1,}}>
                    <Image
                        style={styles.icon}
                        source={require('../../imgs/appIcon/cp_icon.png')}/>
                    <Text
                        style={{marginTop: cfn.picHeight(20),
                            color: '#888',alignSelf:'center',backgroundColor:'transparent'}}>{config.appName}</Text>
                </View>

                <ScrollView>



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
        flex:1
    },
    bg: {
        flex:1
        //resizeMode:'contain'
    },
    icon: {
        width: cfn.picWidth(130),
        height: cfn.picWidth(130),
        resizeMode: 'contain',
        //marginTop: cfn.picHeight(80),
        alignSelf:'center'
    },
    item_container: {
        flexDirection: 'row',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
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