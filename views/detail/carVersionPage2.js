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
        }
    }

    componentDidMount() {
        this.getData();
        this.getPKCars();
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
    getPKCars() {
        Global.storage.getAllDataForKey('PKCars')
            .then((data)=>this.setState({PKData:data}))
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

    renderItem({item}) {
        return(
            <View
                style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={()=>this.goToPage('CarVersionDetail',{id:item.id})}
                    activeOpacity={0.8}
                    style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.detailText}>详细配置>></Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={()=>this.goToPage('Shop',{id:item.id})}
                        activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>经销商</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>加入收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.savePKCars(item)}
                        activeOpacity={0.8} style={styles.pk}>
                        <Text style={styles.pkText}>加入PK赛车</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderSectionHeader({section}) {
        return <View style={styles.sectionHeader}>
            <Text style={{marginLeft:cfn.picWidth(20),fontSize:12,color:'#000'}}>{section.key}</Text>
        </View>
    }
    render() {
        // 大尺寸图片 d, u，v
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={this.props.navigation.state.params.name}
                    leftFn={this.goBack.bind(this)}
                    rightFn={()=>this.goToPage('PKList',{name:this.name,id:this.id, img:this.img})}
                    rightText={'PK赛车'}
                />
                <View style={styles.PKNumberContainer}>
                    <Text style={styles.PKNumber}>{this.state.PKData.length}</Text>
                </View>
                {this.state.data.length == 0 ?
                    <Text style={styles.loader}>{this.state.loader}</Text> :
                    <SectionList
                    sections={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={()=><Image source={{uri:this.img.replace('/s_','/u_')}} style={styles.img}/>}
                    ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1}}/>}
                />}

            </View>
        )
    }
}
const styles = StyleSheet.create({
   container: {
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
       alignItems:'center'
   } ,
    itemContainer: {
        //flexDirection:'row',
        backgroundColor:'#fff',
        minHeight:cfn.picHeight(220),
        justifyContent:'center'
    },
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
        borderColor:'#999',
        borderWidth:1
    },
    PKNumber: {
        fontSize:10
    },
    textContainer: {
        marginLeft:cfn.picWidth(20),
        marginTop:cfn.picHeight(20),
        justifyContent:'center'
    },
    detailText: {
        position:'absolute',
        right:cfn.picWidth(20),
        fontSize:13,
        color:'#aaa',
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
    btnContainer: {
        marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:cfn.picWidth(20),
        marginBottom:cfn.picHeight(20)
    },
    pk: {
        width:(cfn.deviceWidth()-cfn.picWidth(80))/2,
        height:cfn.picHeight(60),
        backgroundColor:config.baseColor,
        alignItems:'center',
        justifyContent:'center',
        //borderRadius:10
    },
    pkText: {
        color:'#fff',
        fontSize:12
    },
    btn: {
        width:(cfn.deviceWidth()-cfn.picWidth(80))/4,
        height:cfn.picHeight(60),
        alignItems:'center',
        justifyContent:'center',
        //borderRadius:10,
        borderColor:'#bbb',
        borderWidth:1,
        marginRight:cfn.picWidth(20)
    },
    btnText: {
        color:'#bbb',
        fontSize:12,
    },
    sectionHeader: {
        height:cfn.picHeight(60),
        width:cfn.deviceHeight(),
        justifyContent:'center'
    }
});