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
import urls from '../../config/urls';

export default class collectCarPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
            PKData:[],
            collectData:[],
        };

    }

    static defaultProps = {};

    componentDidMount() {
        this.getPKCars();
        this.getCollect();
    }

    getPKCars() {
        // isFirst  true:首次加载  false:刷新
        Global.storage.getAllDataForKey('PKCars')
            .then((data)=>this.setState({PKData:data}));
    }

    getCollect() {
        // 获取某个key下的所有数据
        Global.storage.getAllDataForKey('collectCars').then((data) => {
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
            '确定要清除所有赛车收藏？',
            [
                {text: '取消', onPress: ()=> {}},
                {text: '确定', onPress: ()=> this.clearAllOk()},
            ]);
    }
    clearAllOk() {
        Global.storage.clearMapForKey('collectCars');
        // Global.storage.clearMapForKey('welcome');
        this.getCollect();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route, params)
    }



    savePKCars(data) {
        if(this.state.PKData.length == 10) {
            Alert.alert('提示：','已添加10量PK赛车，若要添加请先删除！');
            return;
        }
        Global.storage.save({
            key: 'PKCars',  // 注意:请不要在key中使用_下划线符号!
            id: data.id, //获取所有数据时，id 必须写
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        }).then(()=>this.getPKCars());
    }

    saveCollectCars(data) {
        Global.storage.save({
            key: 'collectCars',  // 注意:请不要在key中使用_下划线符号!
            id: data.id, //获取所有数据时，id 必须写
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        }).then(()=>{});
    }

    deleteCollectCars(data) {
        Global.storage.remove({
            key: 'collectCars',
            id: data.id
        });
    }

    getIsSelected(type, id) {
        let isSelected = false;
        if(type == 'collect') {
            let data = this.state.collectData;
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == id) {
                    isSelected = true;
                    break;
                }
            }
        } else {
            let data = this.state.PKData;
            for(let i = 0; i < data.length; i++) {
                if(data[i].id == id) {
                    isSelected = true;
                    break;
                }
            }
        }
        return isSelected;
    }

    update() {
        this.getPKCars();
    }

    _keyExtractor=(item, index) => index;

    renderItem({item, index}) {
        return(
            <CarItem
                name={item.name}
                price={item.price}
                id={item.id}
                item={item}
                savePKCars={this.savePKCars.bind(this)}
                saveCollectCars={this.saveCollectCars.bind(this)}
                deleteCollectCars={this.deleteCollectCars.bind(this)}

                goToPage={this.goToPage.bind(this)}
                isSelectedPK={this.getIsSelected('PK',item.id)}
                isSelected={true}
            />
        )


    }

    render() {
        return(
            <Image style={styles.bg} source={require('../../imgs/pageBg/page_bg_2.png')}>
                <View style={styles.container}>
                    <NavBar
                        middleText={'赛车收藏'}
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
                    <View style={styles.btnContainer}>
                        <View style={styles.numContainer}>
                            <Text style={styles.numText}>已加{this.state.PKData.length}量</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.goToPage('PKList',{update: this.update.bind(this)})}
                            style={styles.btn}>
                            <Text style={styles.btnText}>查看PK赛车列表</Text>
                        </TouchableOpacity>
                    </View>
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
    btnContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        flexDirection:'row',
        justifyContent:'space-between',
        borderTopColor:'#666',
        borderTopWidth:1
    },
    btn: {
        width:cfn.deviceWidth()-cfn.picWidth(200),
        height:cfn.picHeight(100),
        backgroundColor:'#666',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText: {
        color:'#fff'
    },
    numContainer: {
        width:cfn.picWidth(200),
        height:cfn.picHeight(100),
        alignItems:'center',
        justifyContent:'center'
    },
    numText: {
        color:'#eee'
    }
});