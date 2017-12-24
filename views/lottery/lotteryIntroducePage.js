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
        this.title = props.navigation.state.params.title;
        this.jieshao = props.navigation.state.params.jieshao;

        this.state={
            data:'',
            isError:false,
            isLoading: false,
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
                    middleText={this.title}
                    leftFn={()=>this.goBack()}
                />

                <WebView
                    style={styles.webView}
                    source={{uri: urls.getJieshao(this.jieshao)}}
                    scalesPageToFit={false}
                    startInLoadingState={true}
                    injectedJavaScript={'document.getElementsByTagName("html")[0].style.background="#fff";'+
                    'var ele = document.getElementsByClassName("dlTit");'+
                        'var fistChild = ele[ele.length-1].children[0];'+
                        'var secondChild = ele[ele.length-1].children[1];'+
                        'if(fistChild.innerText == "如何领奖：") {'+
                        'fistChild.innerText = "温馨提示：";'+
                        'secondChild.innerText = "【'+ config.appName +'】祝您中大奖！"}'}
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