import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import cfn from '../tools/commonFun'
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {}
    }
    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }
    renderLogos() {
        let views = [];
        for(let i = 0; i < logos.length; i++) {
            views.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage('CarVersion',
                        {logos:logos[i].name,id:logos[i].id})}
                    key={i}
                    style={styles.logoContainer}>
                    <Image
                        style={styles.logoImg}
                        source={logos[i].img}/>
                    <Text style={styles.logoText}>{logos[i].name}</Text>
                </TouchableOpacity>
            )
        }
        return views;
    }

    render() {

        return (
            <View style={styles.container}>
                <View
                    style={styles.allLogosContainer}>
                    {this.renderLogos()}
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    allLogosContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    logoContainer: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/3,
        height:(cfn.deviceWidth()-cfn.picWidth(60))/3,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:cfn.picHeight(20),
        marginLeft:cfn.picWidth(15),
        backgroundColor:'#000'
    },
    logoText: {
        position:'absolute',
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        color:'#fff',
        width:(cfn.deviceWidth()-cfn.picWidth(60))/3,
        textAlign:'center',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        fontSize:11,
        // height:cfn.picHeight(40),
        // lineHeight:cfn.picHeight(35),
    },
    logoImg: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/3-2,
        height:(cfn.deviceWidth()-cfn.picWidth(60))/3-2,
        borderRadius:10
    }
});

const logos = [
    {img:require('../imgs/cars/保时捷.png'),name:'保时捷',id:40},
    {img:require('../imgs/cars/兰博基尼.png'),name:'兰博基尼',id:48},
    {img:require('../imgs/cars/奔驰.png'),name:'奔驰',id:36},
    {img:require('../imgs/cars/奥迪.png'),name:'奥迪',id:33},
    {img:require('../imgs/cars/宝马.png'),name:'宝马',id:15},
    {img:require('../imgs/cars/宾利.png'),name:'宾利',id:39},
    {img:require('../imgs/cars/法拉利.png'),name:'法拉利',id:42},
    {img:require('../imgs/cars/玛莎拉蒂.png'),name:'玛莎拉蒂',id:57},
    {img:require('../imgs/cars/路特斯.png'),name:'路特斯',id:50},
    {img:require('../imgs/cars/阿斯顿马丁.png'),name:'阿斯顿·马丁',id:35},
];