/**
 * Created by timxiong on 2017/10/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import config from '../../config/config'
export default class gongluePage extends Component{


    goToPage(route, params) {
        this.props.navigation.navigate(route, params);
    }

    goBack() {
        this.props.navigation.goBack();
    }
    renderItem() {
        let items = [];
        for(let i = 0; i < data.length; i++) {
            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage("ArticleDetail",{
                        title:data[i].title,
                        subTitle:data[i].subTitle,
                        id:data[i].id,
                        name:'详细攻略'})}
                    style={styles.itemContainer}>
                    <Image source={require('../../imgs/drawPage/kuai3_selected.png')} style={styles.icon}/>
                    <Text style={styles.title}>{data[i].title}</Text>

                    <Text style={styles.subTitle}>{data[i].subTitle}</Text>
                    <Image
                        style={styles.more}
                        source={require('../../imgs/more_r_icon.png')}/>
                </TouchableOpacity>
            )
        }

        return items;
    }
    render() {
        return(
            <View>
                <NavBar
                    middleText="秘籍攻略"
                    leftFn={()=>this.goBack()}
                />
                <ScrollView>
                    {this.renderItem()}
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor:"#fff",
        height:cfn.picHeight(140),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(30),
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    title: {
      fontSize:16,
        color: '#444',
        marginLeft:cfn.picWidth(80)
    },

    icon: {
        width:cfn.picWidth(70),
        height:cfn.picWidth(70),
        resizeMode:'contain',
        position:'absolute',
        left:cfn.picWidth(20)
    },
    more: {
      width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    },
    subTitle: {
        fontSize:14,
        marginTop:cfn.picHeight(10),
        color:"#aaa",
        marginLeft:cfn.picWidth(80)
    }
});

const data = [
    {
        title:'快三玩法投注技巧：',
        subTitle:'6个小技巧教你杀号',
        id:18353
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'如何理解冷号回补法',
        id:'18351'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'重码冷热法选号',
        id:'18350'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'排除极端组合法',
        id:'18223'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'追求大冷要谨慎',
        id:'18222'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'四步缩小范围法',
        id:'17928'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'利用追号提高中奖率',
        id:'18485'
    },
    {
        title:'快三技巧：',
        subTitle:'妙用冷热互补法“冲金夺银”',
        id:'18484'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'复式组合投注提高中奖率',
        id:'18411'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'如何高效投注二不同',
        id:'18410'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'和值联合三不同投注法',
        id:'18392'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'如何玩转二不同',
        id:'18391'
    },
    {
        title:'快三玩法投注技巧：',
        subTitle:'三不同稳赚技巧',
        id:'18390'
    },
];