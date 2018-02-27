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

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText={"赛事列表"}
                />
                <WebView
                    style={styles.webView}
                    source={{uri:this.props.navigation.state.params.url}}
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