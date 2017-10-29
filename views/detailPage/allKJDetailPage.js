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
    Button,
    FlatList,

} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../../tools/commonFun';
import NavBar from '../../component/NavBar'
import Loading from '../../component/updateModal'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
export default class kjDetailPage extends Component {

    static navigationOptions = {header: null};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            isError: false
        };

        this.lotteryID = this.props.navigation.state.params.id;
        this.lotteryIcon = this.props.navigation.state.params.icon;
        this.title = this.props.navigation.state.params.title;
        this.jieshao = this.props.navigation.state.params.jieshao;
    }

    _keyExtractor = (item, index) => item.time;

    componentDidMount() {
        this.getData();
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    getData() {
        this.setState({
            isLoading:true,
            isError: false,
        });
        //console.log(urls.getHistoryLotteryCode(this.lotteryID));
        fetchp(urls.getHistoryLotteryCode(this.lotteryID),{timeout:10*1000})
            .then((res)=>res.json())
            .then((data)=>this.onSucess(data))
            .catch((error)=>this.onError(error))
    }

    onSucess(data) {
        //console.log(data);
        this.setState({
            data: data.showapi_res_body.result,
            isLoading: false
        })
    }

    onError(error) {
        //console.log(error);
        this.setState({isError: true});
    }

    renderItem({item, index}) {
        let codes = item.openCode;
        if(codes.match(/[+]/)) {
            codes = codes.split('+')[0].split(',');
        } else {
            codes = codes.split(',');
        }

        let codeView = [];
        let codeStyle = styles.code;
        let codeText = styles.codeText;
        let item_height = cfn.picHeight(140);

        if(codes.length > 7 && codes.length <= 10) {
            codeStyle = styles.code_7_10;
        } else if(codes.length > 10){
            codeStyle = styles.code_10;
            codeText = styles.codeText_10;
            item_height = cfn.picHeight(200)
        }

        for (let i = 0; i < codes.length; i++) {
            codeView.push(
                <View
                    key={'c' + i}
                    style={codeStyle}>
                    <Text style={codeText}>{codes[i]}</Text>
                </View>
            )
        }
        return (
            <View
                key={'a' + index}
                style={[styles.item_container,{height:item_height}]}>
                <View style={styles.icon_container}>
                    <Image
                        style={styles.icon}
                        source={this.lotteryIcon}/>
                    <View style={styles.border_right}/>
                </View>

                <View style={styles.issue_container}>
                    <Text style={styles.issue_text}>第 {item.expect} 期</Text>
                    <Text style={styles.date_text}>{item.time}</Text>
                </View>
                <View style={styles.code_container}>
                    {codeView}
                </View>
                <View style={styles.border}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={this.title}
                    leftFn={this.props.navigation.goBack.bind(this)}
                    rightText='玩法介绍'
                    rightFn={()=>this.goToDetail('jieshaoDetail',{jieshao:this.jieshao,title:this.title})}
                />
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
                <Loading
                    reload={this.getData.bind(this)}
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                />
            </View>)
    }

}

const styles = StyleSheet.create({

    container: {
        height:cfn.deviceHeight(),
        backgroundColor:'#fff'

    },
    flatListStyle: {

    },
    item_container: {
        width: cfn.deviceWidth(),
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor:'#fff',

    },
    border: {
        backgroundColor: '#ddd',
        height: 1,
        width: cfn.deviceWidth() - cfn.picWidth(40),
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    icon_container: {
        width: cfn.picWidth(140),
        height: cfn.picWidth(120),
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        left:0,
        flexDirection:'row',
    },
    icon: {
        width: cfn.picWidth(100),
        height: cfn.picWidth(100),
        resizeMode: 'contain',
    },
    border_right: {
        backgroundColor:'#ddd',
        width: 1,
        height:cfn.picHeight(100),
        position: 'absolute',
        right:0
    },
    issue_container: {
        flexDirection: 'row',
        marginLeft: cfn.picWidth(160),
        alignItems: 'center',
    },
    issue_text: {
        color: '#000',
        fontSize: 12
    },
    date_text: {
        fontSize: 12,
        marginLeft: cfn.picWidth(20),
        color: '#888'
    },
    code_container: {
        width: cfn.deviceWidth() - cfn.picWidth(150),
        minHeight: cfn.picWidth(60),
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: cfn.picWidth(160),
        alignItems: 'center',
        marginTop: cfn.picHeight(10),
        paddingRight:cfn.picWidth(20)
    },
    codeText: {
        color:'#fff',
        fontSize:18,
        ///fontWeight:'bold',
        backgroundColor:'transparent'
    },
    codeText_10: {
        color:'#fff',
        fontSize:11,
        backgroundColor:'transparent'
    },
    code: {
        width: cfn.picWidth(60),
        height: cfn.picWidth(60),
        borderRadius: cfn.picWidth(30),
        //backgroundColor: '#f89',
        alignItems: 'center',
        //borderWidth:1,
        //borderColor:'#b22222',
        backgroundColor:'#eb3f2f',
        justifyContent: 'center',
        marginRight: cfn.picWidth(20),
    },
    code_7_10: {
        width: cfn.picWidth(50),
        height: cfn.picWidth(50),
        borderRadius: cfn.picWidth(25),
        backgroundColor: '#eb3f2f',
        alignItems: 'center',
        //borderWidth:1,
        //borderColor:'#b22222',
        justifyContent: 'center',
        marginRight: cfn.picWidth(7),
    },
    code_10: {
        width: cfn.picWidth(50),
        height: cfn.picWidth(50),
        borderRadius: cfn.picWidth(25),
        backgroundColor: '#eb3f2f',
        alignItems: 'center',
        //borderWidth:1,
        //borderColor:'#b22222',
        justifyContent: 'center',
        marginRight: cfn.picWidth(7),
        marginTop:cfn.picHeight(5)
    }

});
