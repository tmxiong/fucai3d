/**
 * Created by timxiong on 2017/9/6.
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

        this.id = this.props.navigation.state.params.id;
        this.name = this.props.navigation.state.params.name;
        this.img = this.props.navigation.state.params.img;
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        this.getData();
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
            <Image style={styles.container} source={require('../../imgs/pageBg/page_bg_jieshao.png')}>
                <View style={[styles.container,]}>
                    <NavBar
                        middleText={this.name}
                        leftFn={this.goBack.bind(this)}
                    />
                    <Image style={styles.logo} source={this.img}/>
                    <ScrollView style={styles.bg}>
                        <View style={styles.content}>
                            <Text style={styles.text}>{this.state.data}</Text>
                        </View>
                    </ScrollView>
                </View>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
   container: {
        width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
       alignItems:'center'
   },
   content: {
       width:cfn.deviceWidth(),
       padding:cfn.picWidth(20)
   },
    bg: {
       //backgroundColor:'rgba(0,0,0,0.6)'
    },
    text: {
       color:'#ddd',
        lineHeight:25,
        fontSize:14
    },
    logo: {
        width:cfn.picWidth(400),
        height:cfn.picWidth(400),
        opacity:0.8,
        marginTop:cfn.picHeight(-10),
        resizeMode:'contain'
    }
});