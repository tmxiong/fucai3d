/**
 * Created by Administrator on 2017/9/14.
 */
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
    StatusBar
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    static defaultProps = {};

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    leftFn={this.goBack.bind(this)}
                    middleText="收藏的彩种"
                />

            </View>)
    }

}
const styles = StyleSheet.create({
    container: {
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight()
    }
});