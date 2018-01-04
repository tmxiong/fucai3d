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
    WebView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './../home/homePage';
import LotteryPage from './../lottery/lotteryPage';
import MorePage from './../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import TrendPage_1 from './trendPage_1'
import {TabView} from "react-navigation";
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'
import config from '../../config/config'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state={
            data:[],
            btnColor:[config.baseColor,'#fff','#fff']
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getTrend(),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data));
    }

    setData(data) {

        this.setState({
            data: data,
        })
    }

    pressBtn(index) {
        let temp = ['#fff', '#fff', '#fff'];
        temp[index] = config.baseColor;
        this.setState({
            btnColor: temp,
        },()=>{
            this._scrollView.scrollTo({x:cfn.deviceWidth()*index},true);
        })
    }
    _onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / cfn.deviceWidth());
        //this.nextPagePixel = offsetX / cfn.deviceWidth();

    }
    _onScrollEndDrag() {
        this.pressBtn(this.nextPage)
    }


    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText='3D走势图'
                    leftFn={()=>this.goBack()}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn,{borderBottomColor:this.state.btnColor[0]}]}
                        onPress={()=>this.pressBtn(0)}
                        activeOpacity={0.8}>
                        <Text style={{color:this.state.btnColor[0] == config.baseColor ? config.baseColor : '#444'}}>百位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn,{borderBottomColor:this.state.btnColor[1]}]}
                        onPress={()=>this.pressBtn(1)}
                        activeOpacity={0.8}>
                        <Text style={{color:this.state.btnColor[1] == config.baseColor ? config.baseColor : '#444'}}>十位</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn,{borderBottomColor:this.state.btnColor[2]}]}
                        onPress={()=>this.pressBtn(2)}
                        activeOpacity={0.8}>
                        <Text style={{color:this.state.btnColor[2] == config.baseColor ? config.baseColor : '#444'}}>个位</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={(ref)=>this._scrollView = ref}
                    onScroll={(e)=>this._onScroll(e)}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScrollEndDrag={()=>this._onScrollEndDrag()}
                >
                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={2}
                        weishu={'百位'}
                        bgColor="#c2eeff"
                    />
                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={3}
                        weishu={'十位'}
                        bgColor="#c2fffa"
                    />

                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={4}
                        weishu={'个位'}
                        bgColor="#ffeec2"
                    />
                </ScrollView>

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnContainer: {
      width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        flexDirection:'row',
        alignItems:'center',

    },
    btn: {
        width:cfn.deviceWidth()/3,
        height:cfn.picHeight(60),
        borderBottomWidth:3,
        borderBottomColor:'#fff',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        resizeMode:'contain',

    }
});