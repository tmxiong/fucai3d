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
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../tools/commonFun'
import NavBar from '../component/NavBar';
const {getArticleDetail} = require('../config/urls');
import config from '../config/config';
import Loading from '../component/loading'
import fetchp from '../tools/fetch-polyfill';
import urls from '../config/urls'
export default class playTips extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.name = props.navigation.state.params.name;
        this.type = props.navigation.state.params.type;
        this.state={
            isLoading:false,
            isError:false,
            data:null,
        };
        this.page = 0;
        this.data = [];
    }
    static defaultProps = {

    };

    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.getData()
    }

    getData() {
        this.setState({
            isError:false,
            isLoading:true,
        });
        fetchp(urls.getPlayTips(this.type, this.page*15),{timeout:10*1000})
            .then((res)=>res.text())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }
    setData(data) {
        data = data.substring(7,data.length-1);
        data = JSON.parse(data);
        this.data = this.data.concat(data.data.dataConfig.data);
        this.setState({
            isError:false,
            isLoading:false,
            data: this.data,
        });
        //console.log(data);
    }
    setError(error) {
        this.setState({
            isError:true,
            isLoading:false,
        });
    }
    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(router,params) {
        this.props.navigation.navigate(router, params);
    }

    renderItem({item,index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={()=>this.goToDetail('tipsDetail', {
                        id: item.id,
                        title: item.title,
                        rowData: item,
                    }
                )}
                style={styles.item_container}>

                <View style={styles.item_text_container}>
                    <Text
                        style={styles.item_title}>{item.title}</Text>
                    <Text style={styles.item_source}>{config.sourceName}</Text>
                    <Text style={styles.item_time}>{new Date(item.publishTime).toLocaleString().split(' ')[0]}</Text>
                </View>
                <Image
                    style={styles.item_img}
                    source={{uri: item.imageList[0]}}/>
            </TouchableOpacity>
        )
    }
    _onEndReached() {
        this.page ++;
        this.getData();
    }
    render() {

        return(
            <View style={styles.container}>
                <NavBar
                    middleText={this.name}
                    leftFn={()=>this.goBack()}
                />
                <FlatList
                    //style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={(data, index) => ( {
                        length: cfn.picHeight(160),
                        offset: cfn.picHeight(160) * index,
                        index
                    } )}

                    onEndReached={this._onEndReached.bind(this)}
                    //onEndReachedThreshold={0.8}
                />
                {this.page == 0 ? <Loading
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    reload={this.getData.bind(this)}
                /> : null}
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:'#fff'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#444'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }
});