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
import CarItem from '../../component/carItem'
import ShopItem from '../../component/shopItem'


export default class collectShopPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };

    }

    static defaultProps = {};

    componentDidMount() {
        this.collectShops();
    }


    collectShops(type,data) {
        if(type == 'delete') {
            Global.storage.remove({
                key: 'collectShops',
                id: data.id
            });
        } else if(type == 'save'){
            Global.storage.save({
                key: 'collectShops',  // 注意:请不要在key中使用_下划线符号!
                id: data.id, //获取所有数据时，id 必须写
                data: data,

                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            }).then(()=>{});
        } else {
            Global.storage.getAllDataForKey('collectShops')
                .then((data)=>this.setState({data:data}));
        }
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
            '确定要清除所有商店收藏？',
            [
                {text: '取消', onPress: ()=> {}},
                {text: '确定', onPress: ()=> this.clearAllOk()},
            ]);
    }
    clearAllOk() {
        Global.storage.clearMapForKey('collectShops');
        // Global.storage.clearMapForKey('welcome');
        this.collectShops();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route, params)
    }


    _keyExtractor=(item, index) => index;

    renderItem({item, index}) {
        return<ShopItem
            item={item}
            name={item.name}
            address={item.address}
            newstitle={item.newstitle}
            phone={item.phone}
            price={item.price}
            isSelected={true}
            collectShops={this.collectShops.bind(this)}
        />;
    }

    render() {
        return(
            <Image style={styles.bg} source={require('../../imgs/pageBg/page_bg_2.png')}>
                <View style={styles.container}>
                    <NavBar
                        middleText={'店铺收藏'}
                        leftFn={this.goBack.bind(this)}
                        rightText={'清除收藏'}
                        rightFn={this.clearAll.bind(this)}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={<Text style={styles.emptyText}>暂无收藏记录</Text>}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#666'}}/>}
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
});