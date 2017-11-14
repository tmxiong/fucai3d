/**
 * 某品牌某型号汽车详情页
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import NavBar from '../../component/NavBar';
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';

export default class jieshaoPage extends Component {

    static defaultProps={

    };
    constructor(props) {
        super(props);

        // this.id = this.props.navigation.state.params.id;
        // this.name = this.props.navigation.state.params.name;
        // this.img = this.props.navigation.state.params.img;
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        //this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getJieshao(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        this.setState({data:data.result.list[0].decription})
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={'配置详情'}
                    leftFn={this.goBack.bind(this)}
                />
                <Image style={styles.logo} source={this.img}/>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center'
    },

});