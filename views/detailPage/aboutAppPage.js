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
    WebView,
    ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.title = props.navigation.state.params.title;
        this.jieshao = props.navigation.state.params.jieshao;

        this.state={
            data:'',
            isError:false,
            isLoading: false,
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        //this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    renderWanfa() {
        let wanfa = [];
        for (let i = 0; i < config.wanfa.length; i++) {
            wanfa.push(
                <Text style={styles.text}>{config.wanfa[i]}</Text>
            )
        }
        return wanfa;
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={"关于"}
                    leftFn={()=>this.goBack()}
                />

                <ScrollView style={styles.content}>
                    <Text style={styles.title}>关于App</Text>
                    <Text style={styles.text}>
                        此App支持PK10开奖直播、开奖回放、号码推荐、历史号码查询等特色功能。同时还支持时时彩、排列3、排列5、北京快乐8、快3、11选5等彩种的近期开奖查询和玩法帮助。
                    </Text>
                    <Text style={styles.title}>关于PK10</Text>
                    <Text style={styles.text}>
                        PK10又称PK拾游戏是2007年经财政部批准，由北京市福利彩票中心承销的一款视频彩票游戏。PK10由中国福利彩票发行中心统一发行。由北京市福利彩票发行中心承销，采用计算机网络系统发行销售，定期开奖。
                    </Text>

                    <Text style={styles.title}>PK10玩法</Text>

                    {this.renderWanfa()}
                    <View style={{height:cfn.picHeight(40)}}/>
                </ScrollView>


            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'#fff',
    },
    content: {
      padding:cfn.picHeight(20),
    },
    title: {
        color:'#000',
        fontSize:15,
        marginTop:cfn.picHeight(20),
    },
    text: {
        marginTop:cfn.picHeight(10),
        marginBottom:cfn.picHeight(10),
        color:'#666'
    }

});