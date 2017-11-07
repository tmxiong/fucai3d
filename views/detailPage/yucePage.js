import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';
import NavBar from '../../component/NavBar'
import urls from '../../config/urls'
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill'
export default class yucePage extends Component {

    static defaultProps={};

    constructor(props) {
        super(props);
        this.state={}
    }

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp('https://security.ydniu.com:44301',{timeout:10*1000})
            .then((res)=>res)
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }
    setData(data) {
        console.log(data);
    }
    setError(err) {
        console.log(err);
    }

    onNavigationStateChange(event){
        let url = event.url;
        //console.log(url);
        if(url.match(/\.html/)){

            console.log(event);

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText="专家预测"
                    leftFn={this.goBack.bind(this)}
                />
                {/*<WebView*/}
                    {/*style={styles.webView}*/}
                    {/*source={{uri: urls.getYuce('k3js')}}*/}
                    {/*scalesPageToFit={false}*/}
                    {/*startInLoadingState={true}*/}
                    {/*//onNavigationStateChange={this.onNavigationStateChange.bind(this)}*/}
                    {/*injectedJavaScript={'document.getElementsByClassName("cntFooter")[0].style.display="none";' +*/}
                    {/*'document.getElementsByClassName("jz_more")[0].style.display="none";' +*/}
                    {/*'document.getElementsByClassName("list_nav")[0].style.display="none";' +*/}
                    {/*'document.getElementsByClassName("list_nav")[0].style.display="none";' +*/}
                    {/*'document.getElementsByTagName("header")[0].style.display="none";' +*/}
                    {/*'document.getElementsByTagName("body")[0].style.paddingTop=0;' +*/}
                    {/*'document.getElementsByClassName("info_list")[0].style.paddingTop=0;' +*/}
                    {/*'document.getElementsByClassName("infolist")[0].children[0].href="javascript:void(0);"'}*/}
                {/*/>*/}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight()
    }
});