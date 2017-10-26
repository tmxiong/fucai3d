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
                    onPress={()=>this.goToPage("GonglueDetail",{
                        title:data[i].title,
                        subTitle:data[i].subTitle,
                        content:data[i].content})}
                    style={styles.itemContainer}>
                    <Text style={styles.title}>{data[i].title}</Text>
                    <View style={styles.line}/>
                    <Text style={styles.subTitle}>{data[i].subTitle}</Text>
                    <Image
                        style={styles.icon}
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
                {this.renderItem()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor:"#fff",
        height:cfn.picHeight(150),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(30),
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        marginTop:cfn.picHeight(20)
    },
    title: {
      fontSize:18,
        color: config.baseColor
    },
    line: {
      height:1,
        width:cfn.deviceWidth()-cfn.picWidth(200),
        backgroundColor:'#eee',
        marginTop:cfn.picHeight(10)
    },
    icon: {
      width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    },
    subTitle: {
        fontSize:14,
        marginTop:cfn.picHeight(10),
        color:"#aaa"
    }
});

const data = [
    {
        title:'秘籍攻略一：',
        subTitle:'追加投注——百分百稳赚法',
        content:'看中13-15的一个号,比如看中14号,等待它有好几把都没有出现,可以以递加的形式投注,第一把投10,没中第二把再投它20,还没中第三把投30,规则思想就是十来把左右它必定出,通过增加投注收回前面把数的损失加上多赚的,就赚了,13-15出现的机会很高,但要玩家控制好蛋蛋量呀,千万不要没有中到就亏空了。'
    },
    {
        title:'秘籍攻略二：',
        subTitle:'压一半——中奖机率50%',
        content:'大家每次只投奇数或偶数 ! 奇数1、3、5、7、9、11……27 偶数0、2、4、6、8、10……26 如果奇数或偶数连续出现两次以上 下一次便应该是另一种数，比如： 已经4次开了奇数 5-6 下一次便全部压偶数 （压得多少你们自己决定）。'
    },
    {
        title:'秘籍攻略三：',
        subTitle:'赢多输少——中奖机率80%',
        content:'首先我们不能全部压，我只是压6-22的，他们的分别投入是6是3.7；7是3.4；8是4.3；9是6.6；10是5.5；11是6.1；12是7.7；13是6.9；14是8.6；15是6.4；16是7.4；17是4.7；18是5.7；19是4.7；20是4.2；21是2.3；22是2.9。用以上的比例去乘基数，比如您有2000-4000多，那么就乘2，4000-6000就乘3，6000-8000就乘4，依次类推。比如说您有3375个蛋蛋，那么您就用上面的参数乘2，那么6的投入就是3.7*2=7.4，采用四舍五入的原则，那么您的投入就是7。'
    },
    {
        title:'秘籍攻略四：',
        subTitle:'看准就压——中奖机率60%',
        content:'我们只投中间一点的数：10——14 大家看准机会，两次以上没开这五个数 那下一次就应该是10——14了 记住，一定要看准了才压，每次都压不行 因为10——14的出现机率够高 所以一般都很容易出现 请大家多点观察号码投注结果 看看这5个数的出现有啥规律。'
    },
    {
        title:'秘籍攻略五：',
        subTitle:'分块压——中奖机率35%',
        content:'大家可以把要投的分成3部分 0——8 9——17 18——27 每次看准机会就选一块压 一般第2块容易中。'
    },
];