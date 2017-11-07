/**
 * 更多快3工具
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    DeviceEventEmitter,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
import Loading from '../../component/updateModal'
import options from '../../imgs/options_icon.png'
import OptionModal from '../../component/optionModal';
import Global from '../../global/global';
import fetchp from '../../tools/fetch-polyfill';
export default class yucePage extends Component {

    static defaultProps = {

    };

    constructor(props){
        super(props);

        this.state={

        };

    }


    componentDidMount() {

    }


    goBack() {
        this.props.navigation.goBack();
    }

    getData(type, page) {
        fetchp(urls.getYuce(type, page),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err))
    }


    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={"更多工具"}
                    leftFn={this.goBack.bind(this)}
                />
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('History')}
                    >
                        <Image
                            source={require('../../imgs/home/menu_bg_1.png')}
                            style={styles.menuItem}>
                            <View style={styles.menuIcon}/>
                            <View>
                                <Text style={styles.menuText}>历史开奖号码</Text>
                                <Text style={styles.menuSubText}>昨天/前天/50期/100期</Text>
                            </View>
                            <Text style={styles.look}>我要查看</Text>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('Trend')}
                    >
                        <Image
                            source={require('../../imgs/home/menu_bg_2.png')}
                            style={styles.menuItem}>
                            <View style={styles.menuIcon}/>
                            <View>
                                <Text style={styles.menuText}>快3走势图</Text>
                                <Text style={styles.menuSubText}>走势规律一目了然</Text>
                            </View>
                            <Text style={styles.look}>我要查看</Text>
                        </Image>
                    </TouchableOpacity>

                    <Image
                        source={require('../../imgs/home/menu_bg_3.png')}
                        style={styles.menuItem}>
                        <View style={styles.menuIcon}/>
                        <View>
                            <Text style={styles.menuText}>秘籍攻略</Text>
                            <Text style={styles.menuSubText}>来吧，助你一臂之力</Text>
                        </View>
                        <Text style={styles.look}>我要查看</Text>
                    </Image>
                    <Image
                        source={require('../../imgs/home/menu_bg_4.png')}
                        style={styles.menuItem}>
                        <View style={styles.menuIcon}/>
                        <View>
                            <Text style={styles.menuText}>玩法详解</Text>
                            <Text style={styles.menuSubText}>知己知彼，方能百投百中</Text>
                        </View>
                        <Text style={styles.look}>我要查看</Text>
                    </Image>

                    <View style={{height:cfn.picHeight(20)}}/>
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        alignItems:'center'
    },
    menuItem: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(200),
        alignSelf:'center',
        borderRadius:25,
        marginTop:cfn.picHeight(20),
        resizeMode:'stretch',
        flexDirection:'row',
        alignItems:'center'
    },
    menuText: {
        color:'#fff',
        backgroundColor:'transparent',
        fontSize: 18
    },
    menuIcon: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        backgroundColor:'#fff',
        borderRadius:40,
        margin:cfn.picWidth(30)
    },
    menuSubText: {
        color:'#fff',
        fontSize:10,
        marginTop:cfn.picHeight(10)
    },
    look: {
        color:'#fff',fontSize:12,
        position:'absolute',
        right:cfn.picWidth(30)
    }

});