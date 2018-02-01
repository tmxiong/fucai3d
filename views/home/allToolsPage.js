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
import OptionModal from '../../component/optionModal';
import Global from '../../global/global';
import fetchp from '../../tools/fetch-polyfill';
export default class yucePage extends Component {

    static defaultProps = {

    };

    constructor(props){
        super(props);

        this.menuData = props.navigation.state.params.menuData;

        this.state={

        };

    }


    componentDidMount() {

    }


    goBack() {
        this.props.navigation.goBack();
    }


    goToPage(route, params) {
        // DrawerOpen
        // DrawerClose
        this.props.navigation.navigate(route, params)
    }

    renderMenu() {
        let menuList = [];
        for(let i = 0; i < this.menuData.length; i++) {
            menuList.push(

                <TouchableOpacity
                    key={i}
                    onPress={()=>this.goToPage(this.menuData[i].pageName, this.menuData[i].params)}
                    activeOpacity={0.8}>
                    <View
                        style={[styles.menuItem,{backgroundColor:this.menuData[i].bg_color}]}>
                        <Image source={this.menuData[i].icon} style={styles.menuIcon}/>
                        <View>
                            <Text style={styles.menuText}>{this.menuData[i].title}</Text>
                            <Text style={styles.menuSubText}>{this.menuData[i].sub_title}</Text>
                        </View>
                        <Text style={styles.look}>我要查看>></Text>
                    </View>
                </TouchableOpacity>

            );
        }

        return menuList;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={"更多工具"}
                    leftFn={this.goBack.bind(this)}
                />

                <ScrollView>
                    {this.renderMenu()}
                    {/*<TouchableOpacity*/}
                        {/*onPress={()=>this.goToPage('Order')}*/}
                        {/*activeOpacity={0.8}>*/}
                        {/*<View*/}
                            {/*style={[styles.menuItem,{backgroundColor:'#f00'}]}>*/}
                            {/*<Image source={require('../../imgs/home/lottery_icon.png')} style={styles.menuIcon}/>*/}
                            {/*<View>*/}
                                {/*<Text style={styles.menuText}>全国彩票</Text>*/}
                                {/*<Text style={styles.menuSubText}>包含全国各类彩种</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={styles.look}>我要查看>></Text>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/**/}
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    menuItem: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(200),
        alignSelf:'center',
        borderRadius:5,
        marginTop:cfn.picHeight(20),
        //resizeMode:'stretch',
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
        resizeMode:'contain',
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