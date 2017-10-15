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
    Animated,
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loading'
import NavBar from '../component/NavBar';
import config from '../config/config'
const url_id = require('../config/urls').getUrlId();
let {getArticleList} = require('../config/urls');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import fetchp from '../tools/fetch-polyfill'

// 530 * 150
const lotterys = [
    {
        name: '时时彩',
        id: 'gpc',
        des: '时时彩：玩法简单，设奖灵活，开奖快速',
        img: require('../imgs/zhuantiImg/ssc.png')
    },
    {
        name: '福彩',
        id: 'fc',
        des: '福彩：国家发行，造福社会，利国利民',
        img: require('../imgs/zhuantiImg/fc.png')
    },
    {
        name: '数字彩',
        id: 'szc',
        des: '数字彩：包含排列三／五，七乐彩，七星彩',
        img: require('../imgs/zhuantiImg/szc.png')
    },
    {
        name: '大乐透',
        id: 'dlt',
        des: '大乐透：2元可中1500万，3元可中2400万',
        img: require('../imgs/zhuantiImg/dlt.png')
    },
    {
        name: '双色球',
        id: 'ssq',
        des: '双色球：奖池超4亿的福利彩票',
        img: require('../imgs/zhuantiImg/ssq.png')
    },
    {
        name: '篮球',
        id: 'lq',
        des: '篮球：竞彩篮球彩票',
        img: require('../imgs/zhuantiImg/lq.png')
    },
    {
        name: '足球',
        id: 'zq',
        des: '足球：竞彩足球彩票',
        img: require('../imgs/zhuantiImg/zq.png')
    }
];

export default class morePlayTips extends Component {
    static navigationOptions = {header: null};
    _keyExtractor = (item, index)=>item.id;

    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(router, params) {
        this.props.navigation.navigate(router, params);
    }

    renderItem({item, index}) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.goToDetail('PlayTips', {
                    type: item.id,
                    name: item.name
                })}
                style={styles.item_container}>
                <View style={styles.text_container}>
                    <Text style={styles.des}>{item.des}</Text>
                </View>
                <Image source={item.img} style={styles.img}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText="购彩攻略专题"
                    leftFn={this.goBack.bind(this)}
                />

                <FlatList
                    data={lotterys}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
                {/*占位*/}
                {/*<View style={{height: cfn.picHeight(20)}}/>*/}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:cfn.deviceHeight(),
    },
    item_container: {
        backgroundColor: '#fff',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(300),
        alignItems: 'center',
        marginBottom: cfn.picHeight(20)

    },
    text_container: {
        height: cfn.picHeight(50),
        width: cfn.deviceWidth() - cfn.picWidth(40),
        marginTop: cfn.picHeight(20)
    },
    des: {
        color: '#333',
        fontSize: 14
    },
    img: {
        width: cfn.deviceWidth() - cfn.picWidth(40),
        height: cfn.picHeight(300 - 40 - 50 ),
        backgroundColor: '#f97',
        resizeMode:'stretch'
    }
});