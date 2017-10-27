import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
var RNFS = require('react-native-fs');
import { NativeModules } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import ContDown from '../component/countDown'
export default class TestPage extends Component {

    static defaultProps={

    };
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            result:0,
        };
        this.countDown =
        this.fromUrl = 'http://update.juw37xqo3x.com/apk/cp256.apk';
        this.appName = this.fromUrl.split('/');
        // 文件名；
        this.appName = "/" + this.appName[this.appName.length - 1];
        // 文件路径-> /data/app包名／
        this.downloadDest = RNFS.ExternalDirectoryPath + this.appName;
        // 下载ID；
        this.jobId = 1;
    }

    componentDidMount() {

    }

    testFs() {
        // create a path you want to write to
        //*
        // MainBundlePath (String) The absolute path to the main bundle directory
        // CachesDirectoryPath (String) The absolute path to the caches directory
        // DocumentDirectoryPath (String) The absolute path to the document directory
        // TemporaryDirectoryPath (String) The absolute path to the temporary directory (iOS and Windows only)
        // LibraryDirectoryPath (String) The absolute path to the NSLibraryDirectory (iOS only)
        // ExternalDirectoryPath (String) The absolute path to the external files, shared directory (android only)
        // ExternalStorageDirectoryPath (String) The absolute path to the external storage, shared directory (android only)
        // */
        //var path = RNFS.ExternalDirectoryPath + '/test.txt';
        // /storage/emulated/0/Android/data/com.tmxiong.donut/files/

        // var path = RNFS.ExternalStorageDirectoryPath  + '/test.txt';
        // /storage/emulated/0/test.txt  //根目录！！
        console.log(path);
        // write the file
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    DownLoadFile() {

        // 文件
        const downloadDest = this.downloadDest;
        const fromUrl = this.fromUrl;

        const options = {
            fromUrl: fromUrl,
            toFile: downloadDest,
            background: true,
            progressDivider:1,// 下载步数 若设置为0，下载会变慢！！！
            begin: (res) => {
                this.setState({isLoading:true});
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
                this.jobId = res.jobId;
                //console.log(res.bytesWritten);
                let result = Math.floor((res.bytesWritten / res.contentLength)*100) + "%";

                this.setState({
                    result: result,
                });
                //console.log(pro);
            }
        };

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                this.setState({
                   isLoading:false,
                });
                this.openApk();
                console.log('success', res);

                console.log('file://' + downloadDest)

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }
    }

    cancelDownDload(jobId) {
        RNFS.stopDownload(this.jobId);
    }


    openApk() {

        NativeModules.InstallApk.install(this.downloadDest);
    }
    render() {
        return(
            <View>
                <TouchableOpacity
                    style={{width:150,height:50}}
                    onPress={()=>this.DownLoadFile()}>
                    <Text style={{fontSize:20}}>DownLoadFile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:150,height:50}}
                    onPress={()=>this.openApk()}>
                    <Text style={{fontSize:20}}>OpenApk</Text>
                </TouchableOpacity>
                <Spinner visible={this.state.isLoading}
                         textContent={"正在下载"+this.state.result}
                         overlayColor="rgba(0,0,0,0.2)"
                         color="rgb(217,29,54)"
                         textStyle={{color: '#000',fontSize:15}} />
            </View>
        )
    }
}
const styles = StyleSheet.create({

});
