/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StatusBar,
    NetInfo
} from 'react-native';
import {NavigationActions} from 'react-navigation'
var RNFS = require('react-native-fs');
import { NativeModules } from 'react-native';
import cfn from '../tools/commonFun'
import CountDown from './countDown'
export default class loadingModal extends PureComponent {
    static navigationOptions = {header: null};

    static defaultProps={
        url:'',
        modalVisible:false,
        update: ()=>{},
        cancel: ()=>{},
    };

    constructor(props) {
        super(props);

        this.updateView = [
            /*是否更新*/
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>this.update()}
            >
                <Image
                    source={require('../imgs/update/update_modal.png')}
                    style={styles.content}/>
            </TouchableOpacity>,

            /*正在更新*/
            <Image
                source={require('../imgs/update/update_bg_modal.png')}
                style={styles.content}>
                <ActivityIndicator
                    animating={true}
                    style={{height: cfn.picHeight(100),marginBottom:cfn.picHeight(20), alignItems:'center',justifyContent:'center'}}
                    color="#000"
                    size="large"
                />
                <CountDown
                    ref={ref=>this.countDown = ref}
                    textStyle={{textAlign:'center',width:cfn.deviceWidth()/3*2}}
                />
            </Image>,

            // 更新失败
            <Image
                source={require('../imgs/update/update_f_modal.png')}
                style={[styles.content,{flexDirection:'row',alignItems:'flex-end'}]}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>this.cancel()}
                >

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>this.update()}
                >

                </TouchableOpacity>
            </Image>

        ];

        this.state = {
            animating: false,
            updateState: 2,// 0->是否更新；1->正在更新；2->更新失败
        };
        this.isConnected = true;
        this.isDownloading = false;
        this.url = this.props.url;
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange.bind(this));
    }
    componentWillUnmount() {
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange.bind(this));
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }
    _handleConnectionInfoChange (isConnected) {
        if(!this.props.modalVisible) return;
        if(isConnected) {
            this.isConnected = isConnected;
            this.cancel();
        } else {
            this.onError();
        }
    }
    update(){
        let downloadUrl = this.url;
        if(downloadUrl.match(/\.apk/)) {
            let appName = downloadUrl.split('/');
            // 文件名；
            appName = "/" + appName[appName.length - 1];
            // 文件路径-> /data/app包名/
            let downloadDest = RNFS.ExternalDirectoryPath + appName;

            if(this.isConnected) {
                if(!this.isDownloading) {
                    this.isDownloading = true;
                    this.setState({
                        updateState: 1,
                    });
                    this.setProgress("正在准备下载...");
                    this.downloadFile(downloadUrl, downloadDest);
                }
            } else {
                this.onError();
            }
        } else {
            alert('下载网址有误！')
        }


    }

    cancel() {
        if(this.jobId) {
            this.cancelDownDload(this.jobId);
        }
        this.setState({updateState:0})
    }

    onError() {
        //alert('error');
        this.setState({updateState:2});
        if(this.jobId) {
            this.cancelDownDload(this.jobId);
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
                this.setProgress("正在更新版本，请稍后... "+ result +"%", result);
                //console.log(result);
            }
        };

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {

                this.openApk(downloadDest);
                this.setState({
                    updateState:0,
                });
                this.isDownloading = false;
                if(this.timer) {
                    clearTimeout(this.timer);
                }

            }).catch(err => {
                //console.log('err', err);
                this.onError();
            });
        }
        catch (e) {
            //console.log(error);
            this.setState({
                updateState:2,
            });
        }
    }

    openApk(downloadDest) {

        NativeModules.InstallApk.install(downloadDest);
    }

    cancelDownDload(jobId) {
        this.isDownloading = false;
        RNFS.stopDownload(jobId);
    }

    setProgress(text, result) {
        //console.log(this.countDown);
        // if(this.isDownloading) {
        //
        //     let temp = result;
        //     if(this.timer) {
        //         clearTimeout(this.timer);
        //     }
        //
        //     this.timer = setTimeout(()=>{
        //         if(temp && temp == result) {
        //             this.isDownloading = false;
        //             this.setState({
        //                 modalVisible:false,
        //             })
        //         }
        //         this.cancelDownDload();
        //         Alert.alert("错误：","下载失败，请检查后重试！")
        //     },8*1000);
        //
        // }

        try{
            this.countDown._startCountDown(text)
        }catch (e){}

    }

    render() {

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {}}
            >
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'rgba(0,0,0,0.7)'} barStyle={'light-content'}/>
                <View style={styles.container}>
                    {this.updateView[this.state.updateState]}
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'rgba(0,0,0,0.7)',
        alignItems:'center',
        justifyContent:"center"
    },
    content: {
        width:cfn.deviceWidth()/4*3,
        height:cfn.deviceHeight()/3,
        alignItems:'center',
        justifyContent:"center",
        resizeMode:'contain'
    },
    btn: {
        width:cfn.deviceWidth()/3,
        height:cfn.picHeight(100),
        marginBottom:cfn.picHeight(40)
    },
});