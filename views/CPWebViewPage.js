import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    Platform,
    StatusBar,
    Linking,
    Alert
} from 'react-native';
import cfn from '../tools/commonFun';
import Spinner from 'react-native-loading-spinner-overlay';
import fetchp from '../tools/fetch-polyfill';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            html:'',
        };
        this.isFirstLoad = true;
        this.url = this.props.navigation.state.params.url;
        this.type = 'webView'; //download
        // https://apk-ing.zz-app.com/2.html  // 下载的
        // http://pc28.qq-app.com/apk-zd.html  // 浏览的

        // 下载地址：
        // "http://update.juw37xqo3x.com/apk/cp256.apk"
    }

    static defaultProps = {};

    componentDidMount() {
        // onBackAndroid.bindHardwareBackPress();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _onLoadStart() {
        if(this.isFirstLoad) {
            this.isFirstLoad = false;
            this.setState({isLoading:true});
        }

    }
    _onLoadEnd() {
        this.isFirstLoad = false;
        this.setState({isLoading:false});
    }

    onNavigationStateChange(event){
        let url = event.url;
        //console.log(url);
        if(url.match(/\.apk/)){
            this.type = 'download';
            Linking.openURL(url)
                .catch(err => Alert.alert( '错误提示：',
                    '您似乎没有安装浏览器，请先安装浏览器再更新。',
                    [
                        {text: '确定', onPress: ()=> {}},
                    ]));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.statusBar}/>


                <Spinner visible={this.state.isLoading}
                         textContent={"正在加载..."}
                         overlayColor="rgba(0,0,0,0.2)"
                         color="rgb(217,29,54)"
                         textStyle={{color: '#000',fontSize:15}} />


                <WebView
                    style={styles.webView}
                    source={{uri:this.url}}
                    //source={{uri:'https://apk-ing.zz-app.com/2.html'}}
                    onLoadStart={()=>this._onLoadStart()}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this.onNavigationStateChange}//在WebView中注册该回调方法
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center'
    },
    webView: {
        flex:1,
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth(),
    },
    statusBar: {
        height:cfn.picHeight(50),
        backgroundColor:'#D74235',
        width:cfn.deviceWidth()
    },
    isLoading: {
        position:'absolute',
        top:cfn.deviceHeight()/2,
        zIndex:5
    },
});