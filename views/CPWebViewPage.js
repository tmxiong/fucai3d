
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
    Alert,
    NetInfo
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loadingModal'
var RNFS = require('react-native-fs');
import { NativeModules } from 'react-native';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {
            modalVisible:true
        };
        this.isDownloading = false;
        this.isFirstLoad = true;
        this.url = this.props.navigation.state.params.url;
        this.isConnected = true;
        // https://apk-ing.zz-app.com/2.html  // 下载的
        // http://pc28.qq-app.com/apk-zd.html  // 浏览的

        // 下载地址：
        // "http://update.juw37xqo3x.com/apk/cp256.apk"
    }

    static defaultProps = {};

    componentDidMount() {
        this.setProgress('正在加载...');
        NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange);
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }
    _handleConnectionInfoChange (isConnected) {
        this.isConnected = isConnected;
        //alert(this.isConnected);
    }
    goBack() {
        this.props.navigation.goBack();
    }

    _onLoadStart() {
        if(this.isFirstLoad) {
            this.isFirstLoad = false;
            if(!this.isDownloading) {
                this.setState({modalVisible:true});
            }

        }

    }
    _onLoadEnd() {
        this.isFirstLoad = false;
        if(!this.isDownloading) {
            this.setState({modalVisible:false});
        }

    }

    onNavigationStateChange(event){
        let downloadUrl = event.url;
        //console.log(url);
        if(downloadUrl.match(/\.apk/)){

            let appName = downloadUrl.split('/');
            // 文件名；
            appName = "/" + appName[appName.length - 1];
            // 文件路径-> /data/app包名／
            let downloadDest = RNFS.ExternalDirectoryPath + appName;

            if(this.isConnected) {
                if(!this.isDownloading) {
                    this.isDownloading = true;
                    this.setState({
                        modalVisible:true,
                    });
                    this.setProgress("正在准备下载...");
                    this.downloadFile(downloadUrl, downloadDest);
                }
            } else {
                this.setState({
                    modalVisible:false,
                });
                Alert.alert("错误：","下载失败，请检查后重试！")
            }

        }
    }

    downloadFile(downloadUrl, downloadDest) {

        const options = {
            fromUrl: downloadUrl,
            toFile: downloadDest,
            background: true,
            progressDivider:1,// 下载步数 若设置为0，下载会变慢！！！
            begin: (res) => {
                //console.log('begin', res);
                //console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
                this.jobId = res.jobId;
                //console.log(res.bytesWritten);
                let result = Math.floor((res.bytesWritten / res.contentLength)*100);
                this.setProgress("正在下载 "+ result +"%", result);
                //console.log(result);
            }
        };

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                this.setState({
                    modalVisible:false,
                });
                this.isDownloading = false;
                if(this.timer) {
                    clearTimeout(this.timer);
                }
                this.openApk(downloadDest);

            }).catch(err => {
                //console.log('err', err);
                this.setState({
                    modalVisible:false,
                });
                Alert.alert("错误：","下载失败，请检查后重试！")
            });
        }
        catch (e) {
            //console.log(error);
            this.setState({
                modalVisible:false,
            });
            Alert.alert("错误：","下载失败，请检查后重试！")
        }
    }

    openApk(downloadDest) {

        NativeModules.InstallApk.install(downloadDest);
    }

    cancelDownDload(jobId) {
        RNFS.stopDownload(this.jobId);
    }

    setProgress(text, result) {
        //console.log(this.countDown);
        if(this.isDownloading) {

            let temp = result;
            if(this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(()=>{
                if(temp && temp == result) {
                    this.isDownloading = false;
                    this.setState({
                        modalVisible:false,
                    })
                }
                Alert.alert("错误：","下载失败，请检查后重试！")
            },8*1000);

        }


        try{
            this.countDown.countDown._startCountDown(text)
        }catch (e){}

    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <View style={styles.statusBar}/>
                <Loading
                    modalVisible={this.state.modalVisible}
                    ref={ref=>this.countDown = ref}
                />

                <WebView
                    style={styles.webView}
                    source={{uri:this.url}}
                    onLoadStart={()=>this._onLoadStart()}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}//在WebView中注册该回调方法
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
        backgroundColor:'rgb(217,29,54)',
        width:cfn.deviceWidth()
    },
});