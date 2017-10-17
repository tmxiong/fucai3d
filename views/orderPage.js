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
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../tools/commonFun'
import NavBar from '../component/NavBar';
import fetchp from '../tools/fetch-polyfill';
import urls from '../config/urls';
import config from '../config/config';
import lotterys from '../config/lotterys';
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.loading = '正在加载...';
        this.error = '加载错误，点击重试';
        this.state={
            data:[],
            isLoading: true,
            isRefreshing: true,
            loadState:this.loading,
        };

        this.ids = '';
        for(let i = 0; i < lotterys.length; i++) {
            this.ids += lotterys[i].id;
            this.ids += '|';
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getNewestLotteryCode(this.ids),{timeout:5*1000})
            .then((res)=>res.json())
            .then((json)=>this.setData(json))
            .catch((error)=>this.setError(error))
    }

    setData(data) {
        data = data.showapi_res_body.result;
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < lotterys.length; j++) {
                if(data[i].code == lotterys[j].id) {
                    data[i].name = lotterys[j].name;
                    data[i].icon = lotterys[j].icon;
                    data[i].jieshao = lotterys[j].jieshao;
                    break;
                }
            }
        }
        //console.log(data);
        this.setState({data:data,isRefreshing:false});
    }

    setError(error) {
        this.setState({
            isRefreshing:false,
            loadState:this.error,
            data:[]
        })
    }


    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    _keyExtractor=(item, index) => item.expect + index;

    renderCode(data) {
        let codes = [];
        let code= {
            width:cfn.picWidth(50),
                height:cfn.picWidth(50),
                borderRadius:cfn.picWidth(25),
                backgroundColor:'#f22',
                alignItems:'center',
                justifyContent:'center',
                marginRight:cfn.picWidth(10),
                marginTop:cfn.picWidth(10)
        };
        let codeText = {
            color:'#fff',
                fontSize:12
        };

        if(data.length > 5) {
            code.height = cfn.picWidth(40);
            code.width = cfn.picWidth(40);
            code.borderRadius = cfn.picWidth(20);
            codeText.fontSize = 10;
        }
        for(let i = 0; i < data.length; i++) {
            codes.push(
                <View
                    key={i}
                    style={code}>
                    <Text style={codeText}>{data[i]}</Text>
                </View>
            )
        }
        return codes;
    }

    renderItem({item, index}) {
        let codes = item.openCode;
        if(codes.match(/[+]/)) {
            codes = codes.split('+')[0].split(',');
        } else {
            codes = codes.split(',');
        }
        return(
            <TouchableOpacity
                key={item.expect}
                style={styles.item_container}
                activeOpacity={0.8}
                onPress={()=>this.goToDetail('SingleKaijiang',
                    {id:item.code,
                        icon:item.icon,
                        jieshao:item.jieshao,
                        title: item.name
                    })}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cz_name}>{item.name}</Text>
                    <Text
                        style={{marginLeft:cfn.picWidth(20),color:'#999'}}>{item.expect}期</Text>
                </View>
                <View style={styles.codeContainer}>
                    {this.renderCode(codes)}
                </View>
                <Image
                    style={styles.icon_r}
                    source={require('../imgs/more_r_icon.png')}/>
            </TouchableOpacity>
        )
    }

    _onRefresh() {
        this.setState({isRefreshing:true});
        this.getData()
    }

    reLoad() {
        if(this.state.loadState == this.error) {
            this.setState({
                isLoading:true,
                loadState:this.loading
            });
            this.getData()
        }
    }


    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText='其它彩种'
                    leftFn={()=>this.goBack()}
                    leftIcon={null}
                />

                {this.state.data.length == 0 ?
                    <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=> this.reLoad()}
                    style={{position:'absolute',zIndex:9,top:cfn.deviceHeight()/2}}>
                    <Text>{this.state.loadState}</Text>
                </TouchableOpacity> :
                    <FlatList
                    data={this.state.data}
                    style={styles.flatListStyle}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#000"
                            title="正在加载···"
                            titleColor="#000"
                            colors={['#000']}
                            progressBackgroundColor="#fff"
                        />}
                />}
                <View style={{height:cfn.picHeight(100)}}/>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        //backgroundColor:'#fff',
        alignItems:'center'
    },
    flatListStyle: {
        width: cfn.deviceWidth(),
        zIndex:2,
        backgroundColor:'#fff',
    },
    item_container: {
        width:cfn.deviceWidth()-cfn.picWidth(40) ,
        minHeight:cfn.picHeight(140),
        alignItems:'flex-start',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    codeContainer: {
        flexDirection:'row',
        marginTop:cfn.picHeight(10),
        width:cfn.deviceWidth()-cfn.picWidth(150),
        flexWrap:'wrap',
        marginBottom:cfn.picWidth(10)
    },
    icon: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    icon_r: {
        width: cfn.picWidth(50),
        height: cfn.picHeight(50),
        resizeMode: 'contain',
        position: 'absolute',
        right: cfn.picWidth(20)
    },
    cz_name: {
        fontSize:14,
        color:'#333',
    },
});