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
    WebView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config';
import Loading from '../../component/loading'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
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
                    middleText='3D奖金计算'
                    leftFn={()=>this.goBack()}
                />

                <WebView
                    style={styles.webView}
                    source={{uri: urls.getBonusCalculate()}}
                    scalesPageToFit={false}
                    startInLoadingState={true}

                />

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'#fff'
    },
    webView: {
        width:cfn.deviceWidth(),
    }
});