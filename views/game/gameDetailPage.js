/**
 * Created by tmxiong on 2018/2/27.
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
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun';
export default class gameDetail extends Component {

    constructor(props) {
        super(props);
        this.url = props.navigation.state.params.url
        this.state={
            url: this.url,
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route,params) {
        this.props.navigation.navigate(route,params);
    }

    reload() {
        this.setState({
            url: this.url + '&time=' + new Date().getTime()
        })
    }

    onNavigationStateChange(e) {
        console.log(e);
        let url = e.url;
        if(url.match('detail') || url.match('Detail')) {
            if(e.loading && e.canGoBack){
                this._webView.stopLoading();
            }
            if(!e.loading && e.canGoBack) {
                if(url.match('queryType=2')) {
                    this.goToPage('gameDetail',{name:'欧赔',url:url});
                } else if(url.match('queryType=3')) {
                    this.goToPage('gameDetail',{name:'让分',url:url})
                } else if(url.match('queryType=4')) {
                    this.goToPage('gameDetail',{name:'大小分',url:url})
                }
            }

        }


    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <NavBar
                        leftFn={this.goBack.bind(this)}
                        middleText={this.props.navigation.state.params.name}
                        rightText={"刷新"}
                        rightFn={this.reload.bind(this)}
                    />
                </View>

                <WebView
                    ref={ref=>this._webView = ref}
                    style={styles.webView}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    source={{uri:this.state.url}}
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
        width:cfn.deviceWidth(),
        height:cfn.picHeight(200),
        zIndex:10
    },
    webView: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        marginTop:25
    }
});