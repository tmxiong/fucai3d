import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SectionList,
    StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill'
var parseString = require('react-native-xml2js').parseString;
import CardView from 'react-native-cardview'
import BannerZoom from '../../component/BannerZoom'
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        SplashScreen.hide();
        //this.carType('get');
        fetchp('http://android.weicaicaipiao.com/trade/list.go?gid=03&ps=15&pn=1',{timeout:10*1000})
            .then((res)=>res.text())
            .then((data)=>{
                parseString(data, function (err, result) {
                    console.log(result);
                });
            })
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    render() {

        return (
            <View>
                <View>
                    <CardView
                        style={[styles.testStyle,{width:100,height:100,backgroundColor:'#fff',marginLeft:20}]}
                        cardElevation={4}
                        cardMaxElevation={4}
                        cornerRadius={5}>

                    </CardView>
                </View>
                <View style={{marginTop:20}}>
                    <CardView
                        cardElevation={6}
                        cardMaxElevation={6}
                        cornerRadius={0}>
                        <View style={{width:100,height:100,backgroundColor:'#fff'}}/>
                    </CardView>
                </View>
                <BannerZoom
                    bannerList={[1,2,3]}
                />
            </View>
        )
    }

}

const shadowOpt = {
    width:100,
    height:100,
    color:"#000",
    border:0,
    radius:5,
    opacity:0.2,
    x:3,
    y:5,
    //style:{marginVertical:5}
}

const styles = StyleSheet.create({
    testStyle: {
        marginLeft:20
    },
});

