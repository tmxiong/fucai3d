/**
 * Created by Administrator on 2018/2/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
    Text,
    TouchableOpacity,
    WebView,
    View,
    Alert
} from 'react-native';
import cfn from '../../tools/commonFun';
import NavBar from '../../component/NavBar'
export default class game extends Component {

    constructor(props) {
        super(props);
        this.url = 'http://m.aicai.com/league/lc/match/bkMatchListView?agentId=1&vt=5';
        this.state={
            url: this.url,
        };
        this.script =
            //'document.getElementsByClassName("header")[0].style.display = "none";' +
                'document.getElementById("mask").style.display = "none";'


    }
    onNavigationStateChange(e) {
        console.log(e);

        let detailUrl = e.url;
        // 阻止webView内跳转；
        if(e.canGoBack && !detailUrl.match("MatchListView")) {
            this._webView.stopLoading();
        }

        if(e.canGoBack && !e.loading && detailUrl.match('matchBetId')) {

            this.props.navigation.navigate('gameDetail',{url:detailUrl,name:'赛事列表'})
        }

        if(e.canGoBack && !e.loading && detailUrl.match('myConcernMatch')) {
            this._webView.stopLoading();
            Alert.alert('提示：','暂无关注的比赛');
        }


    }

    reload() {
        this.setState({
            url: this.url + '&time=' + new Date().getTime()
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <NavBar
                        middleText={"赛事"}
                        leftIcon={null}
                        rightText={"刷新"}
                        rightFn={this.reload.bind(this)}
                    />
                </View>

                <WebView
                    ref={ref=>this._webView = ref}
                    style={styles.webView}
                    injectedJavaScript={this.script}
                    source={{uri:this.state.url}}
                    scalesPageToFit={false}
                    startInLoadingState={true}

                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    navBar: {
        position:'absolute',
        top:0,
        zIndex:10
    },
    webView: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        marginTop:22
    }
});

// document.getElementById("matchContent").addEventListener("click",function(event){
//     var e = event||window.event;
//     var target = e.target || e.srcElement;
//
//     e.stopPropagation();
//
//     var betid = 0;
//     if(target.nodeName.toLowerCase() == 'li'){
//         betid = target.dataset.betid;
//         //window.postMessage('网页端点击了按钮啦。。。')
//     } else {
//         var targets = e.path;
//         var li = "";
//         for(let i = 0; i < targets.length; i++) {
//
//             if(targets[i].localName == "li") {
//                 betid = targets[i].dataset.betid;
//                 break;
//             }
//
//         }
//     }
//     console.log(betid);
//
// });