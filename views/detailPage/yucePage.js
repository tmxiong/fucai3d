/**
 * 专家预测
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
    StatusBar,
    ToastAndroid,
    Share,
    DeviceEventEmitter,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Alert,
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
import Loading from '../../component/updateModal'
import options from '../../imgs/options_icon.png'
import OptionModal from '../../component/optionModal';
import Global from '../../global/global';
import fetchp from '../../tools/fetch-polyfill';
export default class yucePage extends Component {

    static defaultProps = {

    };

    constructor(props){
        super(props);
        this.loadState = ['点击加载','没有更多数据','加载失败 点击重试'];
        this.state={
            data:[],
            animating: false,
            loadCode: 0,
            isRefreshing: true,
            yuceCode:['*','*','*','*'],
            yuceDxds:['*','*'],
            yuceIssue:'*',
        };
        this.type = 1;
        this.page = 1;
    }

    _keyExtractor = (item, index) => item.issue;

    componentDidMount() {
        this.type = this.props.navigation.state.params.type;
        this.getData(this.type, this.page);
    }


    loadMore() {
        if(!this.state.animating){
            this.setState({
               animating:true,
                loadCode:0
            });
            this.page++;
            this.getData(this.type, this.page);
        }

    }
    goBack() {
        this.props.navigation.goBack();
    }

    getData(type, page) {
        fetchp(urls.getYuce(type, page),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err))
    }
    setData(data) {
        let item = data.data;
        this.setState({
            data:this.state.data.concat(item),
            animating:false,
            isRefreshing:false,
        });

        if(this.page == 1) {
            this.setState({
                yuceCode:item[0].num,
                yuceDxds:[item[0].dx.res == '1' ? "大" : "小",item[0].ds.res == '1' ? "单" : "双"],
                yuceIssue:item[0].issue,
            });
        }

    }

    setError(error) {
        if(this.state.animating) {
            this.page --;
            this.setState({
                animating:false,
                loadCode:2
            })
        } else {
            this.setState({
                isRefreshing:false,
            });
            Alert.alert('提示：',"加载错误，请下拉刷新重试！");
        }

    }
    renderItem({item, index}) {
        if(index == 0) {
            return null;
        }else {
            let dxColor, dsColor = '#888';
            let ycColor = ['#888','#888','#888','#888','#888'];
            if(item.dx.hit == 1) {
                dxColor = config.baseColor;
            }
            if(item.ds.hit == 1) {
                dsColor = config.baseColor;
            }
            if(index > 0) {
                for(let i = 0; i < item.num.length; i++) {
                    if(parseInt(item.num[i]) == item.res_total){
                        ycColor[i] = config.baseColor;
                    }
                }

            }

            return(
                <View style={styles.itemContainer}>
                    <View style={[styles.itemCell,{borderLeftWidth:0}]}>
                        <Text>{item.issue}</Text>
                    </View>
                    <View style={[styles.itemCell,{width:cfn.deviceWidth()/12 * 3}]}>
                        {item.result.length == 0 ? <Text>等待开奖</Text> : <Text>{item.res_plus}</Text>}
                        {item.result.length == 0 ? null : <View style={styles.result}>
                            <Text style={{color:'#fff',fontSize:10}}>{item.res_total}</Text>
                        </View>}
                    </View>
                    <View style={styles.itemCell}>
                        <Text style={{color:dxColor}}>{item.dx.res == '1' ? "大" : "小"}</Text>
                    </View>
                    <View style={styles.itemCell}>
                        <Text style={{color:dsColor}}>{item.ds.res == '1' ? "单" : "双"}</Text>
                    </View>
                    <View style={[styles.itemCell,{width:cfn.deviceWidth()/12 * 3}]}>
                        <Text style={{fontSize:12,color:ycColor[0]}}>{item.num[0]} </Text>
                        <Text style={{fontSize:12,color:ycColor[1]}}>{item.num[1]} </Text>
                        <Text style={{fontSize:12,color:ycColor[2]}}>{item.num[2]} </Text>
                        <Text style={{fontSize:12,color:ycColor[3]}}>{item.num[3]} </Text>
                        <Text style={{fontSize:12,color:ycColor[4]}}>{item.num[4]} </Text>
                    </View>
                </View>
            )
        }

    }

    _onRefresh() {
        this.page = 1;
        this.setState({
            isRefreshing:true
        });
        this.state.data = [];
        this.getData(this.type, this.page);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText={"专家预测"}
                    leftFn={this.goBack.bind(this)}
                />
                <View style={styles.headerContainer}>
                    <View style={{flexDirection:'row',marginTop:cfn.picHeight(20)}}>
                        <Text style={{color:config.baseColor,fontSize:18,marginTop:-4}}>{this.props.navigation.state.params.name}</Text>
                        <Text style={{marginLeft:cfn.picWidth(30)}}>第</Text>
                        <Text style={{color:'#b31800'}}>{this.state.yuceIssue}</Text>
                        <Text>期</Text>
                    </View>
                    <Text style={{color:'#b31800',marginTop:cfn.picHeight(30)}}>专家预测号码:</Text>
                    <View style={{flexDirection:'row',marginTop:cfn.picHeight(15)}}>
                        <View style={styles.yuceCode}>
                            <Text style={styles.yuceCodeText}>{this.state.yuceCode[0]}</Text>
                        </View>
                        <View style={styles.yuceCode}>
                            <Text style={styles.yuceCodeText}>{this.state.yuceCode[1]}</Text>
                        </View>
                        <View style={styles.yuceCode}>
                            <Text style={styles.yuceCodeText}>{this.state.yuceCode[2]}</Text>
                        </View>
                        <View style={styles.yuceCode}>
                            <Text style={styles.yuceCodeText}>{this.state.yuceCode[3]}</Text>
                        </View>
                        <View style={[styles.yuceDxds,{marginLeft:cfn.picWidth(20),
                        backgroundColor: this.state.yuceDxds[0] == '小' ? config.baseColor : '#4b90de'}]}>
                            <Text style={styles.yuceDxdsText}>{this.state.yuceDxds[0]}</Text>
                        </View>
                        <View style={[styles.yuceDxds,
                            {backgroundColor: this.state.yuceDxds[1] == '单' ? config.baseColor : '#4b90de'}]}>
                            <Text style={styles.yuceDxdsText}>{this.state.yuceDxds[1]}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.itemContainer,{backgroundColor:'#eee'}]}>
                    <View style={[styles.itemCell,{borderLeftWidth:0}]}>
                        <Text style={styles.titleText}>期号</Text>
                    </View>
                    <View style={[styles.itemCell,{width:cfn.deviceWidth()/12 * 3}]}>
                        <Text style={styles.titleText}>开奖号码</Text>
                    </View>
                    <View style={styles.itemCell}>
                        <Text style={styles.titleText}>大小</Text>
                    </View>
                    <View style={styles.itemCell}>
                        <Text style={styles.titleText}>单双</Text>
                    </View>
                    <View style={[styles.itemCell,{width:cfn.deviceWidth()/12 * 3}]}>
                        <Text style={styles.titleText}>专家预测</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    style={{width:cfn.deviceWidth(),minHeight:100}}
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
                        this.state.data.length == 0 ? null : <View
                            style={{height:cfn.picHeight(100),
                                width:cfn.deviceWidth(), backgroundColor:'#fff',alignItems:'center',
                                justifyContent:'center'}}>
                            {this.state.animating ?
                                <ActivityIndicator
                                animating={this.state.animating}
                                style={{height: cfn.picHeight(100),width:cfn.deviceWidth(), alignItems:'center',justifyContent:'center'}}
                                color="#000"
                                size="small"
                            /> :
                                <TouchableOpacity
                                    style={{width:cfn.deviceWidth(),height:cfn.picHeight(100),alignItems:'center',justifyContent:'center'}}
                                    activeOpacity={0.9}
                                    onPress={()=>this.loadMore()}
                                >
                                <Text>{this.loadState[this.state.loadCode]}</Text>
                            </TouchableOpacity>}

                    </View>}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        alignItems:'center'
    },

    headerContainer: {
      width:cfn.deviceWidth(),
        marginTop:cfn.picHeight(30),
        backgroundColor:'#fff',
        borderRadius:cfn.picWidth(30),
        height:cfn.picHeight(270),
        marginBottom:cfn.picHeight(30),
        padding:cfn.picWidth(20)
    },

    titleText: {
      color:'#888'
    },
    itemContainer: {
        flexDirection:'row',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        borderTopColor:'#fff',
        borderTopWidth:1,
        backgroundColor:'#fff'
    },
    itemCell: {
        alignItems:'center',
        justifyContent:'center',
        height:cfn.picHeight(80),
        width:cfn.deviceWidth()/12 * 2,
        borderLeftWidth:1,
        borderLeftColor:'#ddd',
        flexDirection:'row',
    },
    result: {
        width:cfn.picWidth(40),
        height:cfn.picWidth(40),
        borderRadius:cfn.picWidth(25),
        backgroundColor:config.baseColor,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:cfn.picWidth(10)
    },
    yuceCode: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        borderRadius:cfn.picWidth(25),
        borderWidth:1,
        borderColor:config.baseColor,
        alignItems:'center',
        justifyContent:'center',
        marginRight:cfn.picWidth(10),
        marginTop:cfn.picHeight(10)
    },
    yuceCodeText: {
        color:config.baseColor,fontSize:12
    },
    yuceDxds: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        alignItems:'center',
        justifyContent:'center',
        marginRight:cfn.picWidth(10),
        marginTop:cfn.picHeight(10),
        backgroundColor:'#f90'
    },
    yuceDxdsText: {
        fontSize:12,
        color:'#fff'
    }
});