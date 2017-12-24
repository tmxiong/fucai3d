/**
 * Created by timxiong on 2017/9/6.
 */
import React, {PureComponent} from 'react';
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
// import TrendTab from './trendTab'
import {TabView} from "react-navigation";

export default class articleDetailPage extends PureComponent {
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
                <View style={styles.item_row}>
                    <View>
                        <Text>期号</Text>
                    </View>
                    <View>
                        <Text>开奖号码</Text>
                    </View>
                    <View style={styles.code_row}>
                        <View><Text>0</Text></View>
                        <View><Text>1</Text></View>
                        <View><Text>2</Text></View>
                        <View><Text>3</Text></View>
                        <View><Text>4</Text></View>
                        <View><Text>5</Text></View>
                        <View><Text>6</Text></View>
                        <View><Text>7</Text></View>
                        <View><Text>8</Text></View>
                        <View><Text>9</Text></View>
                    </View>
                </View>

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    code_row: {
        flexDirection:'row',
    },
    item_row: {
        flexDirection:'row'
    }

});