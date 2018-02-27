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
    View
} from 'react-native';
import cfn from '../../tools/commonFun';
import NavBar from '../../component/NavBar'
export default class game extends Component {
    constructor(props) {
        super(props);
        this.state={

        };
        this.script =
            //'document.getElementsByClassName("header")[0].style.display = "none";' +
                'document.getElementById("mask").style.display = "none";'+

                   'document.getElementsByClassName("s_menu")[0].children[0].children[4].style.display = "none"'

                // 'document.getElementById("matchContent").addEventListener("click",function(event){'+
                //     'var e = event||window.event;'+
                //     'var target = e.target || e.srcElement;'+
                //     'e.stopPropagation();'+
                //     'var betid = 0;'+
                //     'if(target.nodeName.toLowerCase() == "li"){'+
                //         'betid = target.dataset.betid;'+
                //         //window.postMessage('网页端点击了按钮啦。。。')
                //     '} else {'+
                //         'var targets = e.path;'+
                //         'var li = "";'+
                //         'for(var i = 0; i < targets.length; i++) {'+
                //             'if(targets[i].localName == "li") {'+
                //                 'betid = targets[i].dataset.betid;'+
                //                 'break;'+
                //             '};'+
                //         '};'+
                //     '};'+
                //     'alert(betid);'+
                // '},false);';

    }
    onNavigationStateChange(e) {
        console.log(e);

        let detailUrl = e.url;
        // 阻止webView内跳转；
        if(e.canGoBack && !detailUrl.match("MatchListView")) {
            this._webView.stopLoading();
        }

        if(e.canGoBack && !e.loading && detailUrl.match('matchBetId')) {

            this.props.navigation.navigate('gameDetail',{url:detailUrl})
        }


    }

    componentDidMount() {
        // setTimeout(()=>{
        //     this._webView.injectJavaScript = this.script;
        // },3000)
    }
    render() {
        return(
            <View style={styles.container}>
                {/*<View style={styles.navBar}>*/}
                    {/*<NavBar*/}
                        {/*middleText={"赛事"}*/}
                    {/*/>*/}
                {/*</View>*/}

                <WebView
                    ref={ref=>this._webView = ref}
                    style={styles.webView}
                    injectedJavaScript={this.script}
                    source={{uri:'http://m.aicai.com/league/lc/match/bkMatchListView?agentId=1&vt=5'}}
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
        top:0
    },
    webView: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight()
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