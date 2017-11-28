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
    ActivityIndicator
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
        this.loadingText = '正在加载...';
        this.loadMoreText = '点击加载更多';
        this.errorText = '加载失败，点击重试';

        this.bannerLength = 3;
        this.page = 0;
        this.state={
            data:[],
            isLoading: true,
            isRefreshing: true,
            isError:false,
            bannerList:[
                {imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...', docid:null, rowData:null, mtime:null,},
                {imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...', docid:null, rowData:null, mtime:null,},
                {imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...', docid:null, rowData:null, mtime:null,},
                ],
        };
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarNews(this.page),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err));
    }

    setData(data) {
        //console.log(data);
        data = this.deleteData(data.list);
        if(this.page == 0) {
            let bannerList = this.getBannerData(data);
            this.setState({
                data:data,
                isRefreshing:false,
                bannerList:bannerList,
                isError:false
            });
        } else {
            data = this.state.data.concat(data);
            this.setState({
                data:data,
                isRefreshing:false,
                animating:false,
                isError:false
            })
        }


    }

    setError(error) {
        if(this.page > 0) {
            this.page --;
        }
        this.setState({
            isRefreshing:false,
            animating:false,
            isError:true
        })
    }

    // 每日易乐有点黄 有点污 删掉！！ 带视频的文章也删掉！！
    deleteData(data) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].title.match(/每日易乐/) || data[i].docid.match(/_/) || data[i].articleType == 'webview') {
                data.splice(i,1);
                //break;
            }
        }
        return data;
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
            bannerList.push(
                {imgsrc:{uri:data[i].imgsrc},rowData:data[i],docid:data[i].docid,mtime:data[i].mtime,title:data[i].title}
                )
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
        this.page = 0;
        this.setState({isRefreshing:true,isError:false});
        this.getData()
    }

    loadMore() {
        this.page ++;
        this.setState({animating:true});
        this.getData();
    }

    reLoad() {

        this.setState({
            isLoading:true,
            isError:false,
        });
        this.getData()

    }

    render() {
        return(
            <Image source={require('../imgs/pageBg/page_bg_4.png')} style={styles.container}>
                <NavBar
                    middleText='赛车资讯'
                    leftFn={()=>this.goBack()}
                    leftIcon={null}
                />
                <Banner
                    bannerList={this.state.bannerList}
                    navigation={this.props.navigation}
                />

                    <FlatList
                        data={this.state.data}
                        style={styles.flatListStyle}
                        ListEmptyComponent={
                            <TouchableOpacity
                            activeOpacity={1}
                            style={{alignSelf:'center',marginTop:cfn.deviceHeight()/4}}
                            onPress={()=> this.reLoad()}>
                            <Text style={{color:'#eee'}}>{this.state.isError ? this.errorText : this.loadingText}</Text>
                            </TouchableOpacity>}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#666'}}/>}
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
                        ListFooterComponent={
                            this.state.data.length == 0 ? null :
                                <View style={{height:cfn.picHeight(100), width:cfn.deviceWidth(),
                                    backgroundColor:'rgba(0,0,0,0.9)',alignItems:'center', justifyContent:'center'}}>
                                {this.state.animating ?
                                    <ActivityIndicator
                                        animating={this.state.animating}
                                        style={{height: cfn.picHeight(100),width:cfn.deviceWidth(), alignItems:'center',justifyContent:'center'}}
                                        color="#eee"
                                        size="small"
                                    /> :
                                    <TouchableOpacity
                                        style={{width:cfn.deviceWidth(),height:cfn.picHeight(100),alignItems:'center',justifyContent:'center'}}
                                        activeOpacity={0.9}
                                        onPress={()=>this.loadMore()}
                                    >
                                        <Text style={{color:'#eee'}}>{this.state.isError ? this.errorText : this.loadMoreText}</Text>
                                    </TouchableOpacity>}

                            </View>}
                    />
                    <View style={{height:cfn.picHeight(100)}}/>
            </Image>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        //backgroundColor:'#fff',
        alignItems:'center',
        resizeMode:'stretch'
    },
    flatListStyle: {
        width: cfn.deviceWidth(),
        zIndex:2,
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
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