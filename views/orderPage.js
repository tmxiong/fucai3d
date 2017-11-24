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
    RefreshControl,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../tools/commonFun'
import NavBar from '../component/NavBar';
import fetchp from '../tools/fetch-polyfill';
import urls from '../config/urls';
import config from '../config/config';
import Banner from '../component/Banner'
import Notice from '../component/Notice'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.loading = '正在加载...';
        this.error = '加载错误，点击重试';
        this.bannerLength = 3;
        this.state={
            data:[],
            isLoading: true,
            isRefreshing: true,
            loadState:this.loading,
            bannerList:[
                require('../imgs/banner/banner_1.png'),
                require('../imgs/banner/banner_2.png'),
                require('../imgs/banner/banner_3.png'),
            ]
        };
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarNews(),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>console.log(err));
    }

    setData(data) {
        //console.log(data);
        let bannerList = this.getBannerData(data.list);
        this.setState({
            data:data.list,
            isRefreshing:false,
            bannerList:bannerList
        });
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

    goToPage(route, params) {
        this.props.navigation.navigate(route, params)
    }
    getBannerData(data) {
        let bannerList = [];
        for(let i = 0; i < this.bannerLength; i++) {
            bannerList.push(data[i])
        }
        return bannerList;
    }

    _keyExtractor=(item, index) => index;


    renderItem({item, index}) {
        if(index < this.bannerLength) {
            return null;
        }else {
            return(
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage('NewsDetail', {
                            docid: item.docid,
                            title: item.title,
                            mtime: item.mtime,
                            rowData: item,
                        }
                    )}
                    style={styles.item_container}>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{item.title}</Text>
                        <Text style={styles.item_source}>{config.appName}</Text>
                        <Text style={styles.item_time}>{item.mtime}</Text>
                    </View>
                    <Image
                        style={styles.item_img}
                        source={{uri: item.imgsrc}}/>
                </TouchableOpacity>
            )
        }

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
                    middleText='赛车资讯'
                    leftFn={()=>this.goBack()}
                />
                <Banner
                    bannerList={this.state.bannerList}
                    navigation={this.props.navigation}
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
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#aaa',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#aaa',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#eee'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }
});