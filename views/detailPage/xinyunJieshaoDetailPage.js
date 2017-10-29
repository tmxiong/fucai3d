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
import Loading from '../../component/updateModal'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.name = props.navigation.state.params.name;
        this.type = props.navigation.state.params.type;

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

    aaa() {
        document.getElementsByClassName("am-fix-top")[0].style.display="none";
        document.getElementsByClassName("bgff")[0].style.paddingTop=0;

    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={this.name}
                    leftFn={()=>this.goBack()}
                />

                <WebView
                    style={styles.webView}
                    source={{uri: urls.getXingyunJieshao(this.type)}}
                    scalesPageToFit={false}
                    startInLoadingState={true}
                    injectedJavaScript={'document.getElementsByClassName("am-fix-top")[0].style.display="none";document.getElementsByClassName("bgff")[0].style.paddingTop=0;'}
                />

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
    },
    webView: {
        width:cfn.deviceWidth(),
    }
});