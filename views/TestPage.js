import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
var RNFS = require('react-native-fs');
export default class TestPage extends Component {

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
        const downloadDest = RNFS.ExternalStorageDirectoryPath + "/cp256.apk";
        const formUrl = 'http://update.juw37xqo3x.com/apk/cp256.apk';

        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;

                // this.setState({
                //     progressNum: pro,
                // });
                console.log(pro);
            }
        };

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
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
    readFile() {
        const path = RNFS.ExternalStorageDirectoryPath + "/cp256.apk";

        return RNFS.readFile(path)
            .then((result) => {
                console.log(result);

                // this.setState({
                //     readTxtResult: result,
                // })
            })
            .catch((err) => {
                console.log(err.message);

            });
    }
    openApk() {
        const path = RNFS.ExternalStorageDirectoryPath + "/cp256.apk";
        Linking.openURL('apk:'+path);
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
                    onPress={()=>this.readFile()}>
                    <Text style={{fontSize:20}}>readFile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{width:150,height:50}}
                    onPress={()=>this.openApk()}>
                    <Text style={{fontSize:20}}>OpenApk</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({

});
