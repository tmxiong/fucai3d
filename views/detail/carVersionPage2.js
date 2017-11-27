/**
 * 汽车型号列表
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SectionList,
    Alert
} from 'react-native';
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
import NavBar from '../../component/NavBar'
import config from '../../config/config'
import Global from '../../global/global'
import CarItem from '../../component/carItem';
export default class carVersionPage2 extends Component {
    static defaultProps={

    };

    constructor(props) {
        super(props);
        this.id = props.navigation.state.params.id;
        this.img = props.navigation.state.params.img;
        this.name = props.navigation.state.params.name;
        this.state={
            data:[],
            loader: '正在加载...',
            PKData:[],
            collectData:[],
        };
    }

    componentDidMount() {
        this.getData();
        this.getPKCars();
        this.getCollectCars();
    }

    getData() {
        fetchp(urls.getCarVersion2(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        let enginelist = data.result.enginelist;
        if(enginelist.length > 0) {
            data = this.changeObjKey(enginelist[0].yearspeclist);
            this.setState({data:data})
        } else {
            this.setState({loader:'暂无数据'});
        }

    }

    changeObjKey(data) {
        for(let i = 0; i < data.length; i++) {
            data[i].key = data[i].name;
            data[i].data = data[i].speclist;
            delete data[i].name;
            delete data[i].speclist;
        }
        return data;
    }

    _keyExtractor=(item,index)=>index;

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route,params);
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

    getPKCars() {
        // isFirst  true:首次加载  false:刷新
        Global.storage.getAllDataForKey('PKCars')
            .then((data)=>this.setState({PKData:data}));
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

    getCollectCars() {
        Global.storage.getAllDataForKey('collectCars')
            .then((data)=>this.setState({collectData: data}))
    }

    update() {
        this.getPKCars();
    }

    renderItem({item}) {
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
                isSelected={this.getIsSelected('collect',item.id)}
            />
        );
    }
    renderSectionHeader({section}) {
        return <View style={styles.sectionHeader}>
            <Text style={{marginLeft:cfn.picWidth(20),fontSize:12,color:'#bbb'}}>{section.key}</Text>
        </View>
    }
    render() {
        // 大尺寸图片 d, u，v
        return(
            <Image source={require('../../imgs/pageBg/page_bg_1.png')} style={styles.container}>
                <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.7)'}]}>
                    <NavBar
                        middleText={this.props.navigation.state.params.name}
                        leftFn={this.goBack.bind(this)}
                        rightFn={()=>this.goToPage('PKList',
                            {name:this.name,id:this.id, img:this.img, update: this.update.bind(this)})}
                        rightText={'PK赛车'}
                    />
                    <View style={styles.PKNumberContainer}>
                        <Text style={styles.PKNumber}>{this.state.PKData.length}</Text>
                    </View>
                    {this.state.data.length == 0 ?
                        <Text style={styles.loader}>{this.state.loader}</Text> :
                        <SectionList
                        sections={this.state.data}
                        extraData={this.state} // 设置不同的数据，以保证界面能刷新
                        renderItem={this.renderItem.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ListHeaderComponent={()=><Image source={{uri:this.img.replace('/s_','/u_')}} style={styles.img}/>}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#666'}}/>}
                    />}
                </View>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
   container: {
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
       alignItems:'center'
   } ,
    loader: {
        position:'absolute',
        top:cfn.deviceHeight()/2,
        fontSize:14,
        color:'#555'

    },
    PKNumberContainer: {
        width:cfn.picWidth(40),
        height:cfn.picHeight(40),
        borderRadius:cfn.picWidth(20),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:cfn.picHeight(50),
        right:cfn.picWidth(5),
        borderColor:config.baseColor,
        borderWidth:1
    },
    PKNumber: {
        fontSize:10,
        color:config.baseColor
    },

    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceWidth()*0.5,
        backgroundColor:'#ddd'
    },
    name: {
        fontSize:15,
        color:'#333'
    },
    price: {
        marginTop:cfn.picHeight(10),
        fontSize:15,
        color:'#f33'
    },
    sectionHeader: {
        height:cfn.picHeight(60),
        width:cfn.deviceWidth(),
        justifyContent:'center',
        backgroundColor:'#464646',
    }
});