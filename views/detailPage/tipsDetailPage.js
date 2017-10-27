/**
 * Created by timxiong on 2017/9/11.
 */
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
    ToastAndroid,
    Share,
    DeviceEventEmitter
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
import Loading from '../../component/loadingModal'
import options from '../../imgs/options_icon.png'
import OptionModal from '../../component/optionModal';
import Global from '../../global/global';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.id = props.navigation.state.params.id;
        this.loadCount = 0;
        this.script = 'document.getElementById("author").textContent="' + config.sourceName + '";' +
            'document.getElementById("tuijian").style.display="none";' +
            'document.getElementsByClassName("share")[0].innerHTML="";';
        this.state = {
            isLoading:true,
            isError:false,
            visible:false,
            isCollected:false,
            url: urls.getPlayTipsDetail(this.id)
        };


        // let statusBarHeight = Platform.OS == 'ios' ? cfn.picHeight(46) : StatusBar.currentHeight;
        // this.navBarHeight = Platform.OS == 'ios' ? cfn.picHeight(160) : cfn.picHeight(200);
        // this.navBarHeight = this.navBarHeight + statusBarHeight;
    }

    static defaultProps = {

    };

    componentDidMount() {
        this.getIsCollected();
        this.addHistory();

        // fetch('https://m.qmcai.com/zixun/detail.html?_id=19246',{
        //     headers: {
        //         'Accept': '*/*',
        //         'Accept-Language': 'zh-CN,zh;q=0.8',
        //         'Connection': 'keep-alive',
        //         'Content-Type': 'application/json',
        //         'Origin': 'https://m.qmcai.com',
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}})
        //     .then((res)=>res.text())
        //     .then((data)=>this.a(data))
    }

    // a(data) {
    //     console.log(data);
    // }

    goBack() {
        this.props.navigation.goBack();
    }

    // 加载完成 成功或失败
    _onLoadEnd() {
        //this._webView.injectJavaScript(this.script);
        //setTimeout(()=>{
            this.setState({
                isLoading:false,
                isError:false
            });
        //},5000);
        //console.log('_onLoadEnd' + new Date().getTime() + this.state.isLoading);

    }

    // 开始加载
    _onLoadStart() {
        this.loadCount = 0;
        this.setState({
            isLoading: true,
            isError:false
        })
    }

    // 加载错误
    _onError() {
        this.setState({
            isLoading:false,
            isError:true
        })
    }

    getIsCollected() {

        //const {rowData} = this.props.navigation.state.params;
        Global.storage.getAllDataForKey('article').then((data) => {
            if(data.length == 0) return;
            for (let i in data) {
                if(data[i].id == this.id){
                    this.setState({isCollected:true});
                    break;
                }
            }
        });
    }

    addHistory() {
        const {rowData} = this.props.navigation.state.params;
        Global.storage.save({
            key: 'history',  // 注意:请不要在key中使用_下划线符号!
            id: this.id, //获取所有数据时，id 必须写
            data: rowData,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    }

    addCollection(type) {
        const {rowData} = this.props.navigation.state.params;
        if(type == 'article') {
            Global.storage.save({
                key: 'article',  // 注意:请不要在key中使用_下划线符号!
                id: this.id, //获取所有数据时，id 必须写
                data: rowData,

                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            });

        } else if(type == 'lottery') {

        }

        this.setState({isCollected:true});

        Global.storage.getAllDataForKey('article').then((data) => {
            //console.log(data);
        });

    }

    deleteCollection() {

        Global.storage.remove({
            key: 'article',
            id: this.id
        });
        this.setState({isCollected:false});
        Global.storage.getAllDataForKey('article').then((data) => {
            //console.log(data);
        });

    }

    refreshArticle() {
        //this.setState({url:''});
        this.setState({url:urls.getPlayTipsDetail(this.id)})
    }

    shareArtical() {
        const {rowData} = this.props.navigation.state.params;
        Share.share({
            message: rowData.title + urls.getPlayTipsDetail(this.id)
        })
            .then(this._showResult)
            .catch((error) => {this.setModalVisible(false)})
    }

    _showResult(result) {
        this.setModalVisible(false);
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                //this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                ToastAndroid.show('分享成功！',ToastAndroid.SHORT)
            }
        } else if (result.action === Share.dismissedAction) {

        }
    }

    setModalVisible(visible) {
        this.setState({
            visible:visible
        })
    }

    closeModal(type) {

        this.setModalVisible(false);

        if(type == 'article') {
            if(this.state.isCollected) {
                this.deleteCollection('article');
            } else {
                this.addCollection('article');
            }

            DeviceEventEmitter.emit('update');

        } else if (type == 'refresh') {

            this.refreshArticle();

        } else if(type == 'lottery') {

        }

    }

    onNavigationStateChange(e) {
        // this.loadCount ++;
        // if(this.loadCount == 4 || this.loadCount >=2 && e.loading == false) {
        //     this._webView.injectJavaScript(this.script);
        //     this.setState({
        //         isLoading:false,
        //         isError:false
        //     });
        //     this._webView.injectJavaScript(this.script);
        // }
        // this._webView.injectJavaScript(this.script);

        //console.log(e);
        //console.log( new Date().getTime())
        //console.log(this.loadCount);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText="文章详情"
                    rightText='更多'
                    rightFn={this.setModalVisible.bind(this,!this.state.visible)}
                />
                <OptionModal
                    visible={this.state.visible}
                    closeModal={this.closeModal.bind(this)}
                    isCollected={this.state.isCollected}
                />
                <View style={{height:this.state.isLoading ? 0 : cfn.deviceHeight(),}}>
                    <WebView
                        style={{overflow:'hidden'}}
                        ref={(ref)=>this._webView = ref}
                        source={{uri: this.state.url}}
                        injectedJavaScript={this.script}
                        onLoadEnd={()=>this._onLoadEnd()}
                        onLoadStart={()=>this._onLoadStart()}
                        onError={()=>this._onError()}
                        scalesPageToFit={false}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}//在WebView中注册该回调方法
                    />
                </View>
                <Loading
                    isLoading={this.state.isLoading}
                />
            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight(),

    }
});