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
    ScrollView
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './../home/homePage';
import LotteryPage from './../lottery/lotteryPage';
import MorePage from './../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import TrendPage_1 from './trendPage_1'
import {TabView} from "react-navigation";

export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state={

        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        //this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText='3D走势图'
                    leftFn={()=>this.goBack()}
                />

                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <TrendPage_1/>
                    <View style={{width:cfn.deviceWidth(),height:cfn.deviceHeight(),backgroundColor:'#020'}}/>

                </ScrollView>

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon:{
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        resizeMode:'contain'
    }
});