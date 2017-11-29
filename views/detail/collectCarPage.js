/**
 * Created by tmxiong on 2017/11/28.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';

import NavBar from '../../component/NavBar';
import Global from '../../global/global'
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';

export default class historyPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };

    }

    static defaultProps = {};

    componentDidMount() {
        this.getReadHistory();
    }

    getReadHistory() {
        // 获取某个key下的所有数据
        Global.storage.getAllDataForKey('history').then((data) => {
            this.setState({data:data});
        });

    }

    goBack() {
        this.props.navigation.goBack();
    }

    // 删除key下的所有数据
    clearAll() {
        if(this.state.data.length == 0) {
            return;
        }
        Alert.alert( '提示:',
            '确定要清除历史记录？',
            [
                {text: '取消', onPress: ()=> {}},
                {text: '确定', onPress: ()=> this.clearAllOk()},
            ]);
    }
    clearAllOk() {
        Global.storage.clearMapForKey('history');
        // Global.storage.clearMapForKey('welcome');
        this.getReadHistory();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route, params)
    }

    _keyExtractor=(item, index) => index;

    renderItem({item, index}) {
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

    render() {
        return(
            <Image style={styles.bg} source={require('../../imgs/pageBg/page_bg_2.png')}>
                <View style={styles.container}>
                    <NavBar
                        middleText={'阅读历史'}
                        leftFn={this.goBack.bind(this)}
                        rightText={'清除记录'}
                        rightFn={this.clearAll.bind(this)}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={<Text style={styles.emptyText}>暂无阅读记录</Text>}
                    />
                </View>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    emptyText: {
        color:'#ccc',
        alignSelf:'center',
        marginTop:cfn.deviceHeight()/2 - 50
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#666',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#666',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#aaa'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }
});