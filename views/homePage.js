import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SectionList,
    StatusBar
} from 'react-native';
import cfn from '../tools/commonFun'
import Banner from '../component/Banner'
import fetchp from '../tools/fetch-polyfill'
import urls from '../config/urls'
import config from '../config/config'
import ChangeCarModal from './detail/changeCarModal';
import Global from '../global/global'
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {
            items:null,
            data:[],
            visible:true,
            carType:config.cars[0], //默认展示的车型列表
        };
    }

    componentDidMount() {
        this.carType('get');
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    getData() {
        fetchp(urls.getCarVersion(this.state.carType.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        let data1 = this.changeObjKey(data.result.fctlist);
        let data2 = this.changeObjKey(data.result.otherfctlist);
        this.setState({data:data1.concat(data2)})
    }

    carType(type, data) {
        if(type == 'get') {

            Global.storage.getAllDataForKey('carType')
                .then((data)=>{
                    if(data.length > 0) {
                        this.setState({carType:data[0]},()=>this.getData())
                    } else {
                        this.getData();
                    }
                });

        } else if(type == 'set') {
            Global.storage.save({
                key: 'carType',  // 注意:请不要在key中使用_下划线符号!
                id: 1, //获取所有数据时，id 必须写
                data: data,

                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            }).then(()=>{});
        }
    }

    changeObjKey(data) {
        for(let i = 0; i < data.length; i++) {
            data[i].key = data[i].name;
            data[i].data = data[i].serieslist;
            delete data[i].name;
            delete data[i].serieslist;
        }
        return data;
    }

    _keyExtractor=(item,index)=>item.id;

    renderLogos() {
        let views = [];
        let logos = config.cars;
        for(let i = 0; i < logos.length; i++) {
            views.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage('CarVersion',
                        {name:logos[i].name,id:logos[i].id,img:logos[i].img})}
                    key={i}
                    style={styles.logoContainer}>
                    <Image
                        style={styles.logoImg}
                        source={logos[i].img}/>
                    <Text style={styles.logoText}>{logos[i].name}</Text>
                </TouchableOpacity>
            )
        }
        return views;
    }

    renderItem({item}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.goToPage('CarVersion2',{name:item.name,id:item.id,img:item.imgurl})}
                style={styles.itemContainer}>
                <Image source={{uri:item.imgurl}} style={styles.img}/>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
                <Image source={require('../imgs/more_r_icon.png')} style={styles.moreIcon}/>
            </TouchableOpacity>
        )
    }

    changeCar(data) {
        this._modal.closeModal();
        this.carType('set',data);
        this.setState({carType: data},()=>this.getData());

    }

    render() {

        return (
            <Image source={require('../imgs/pageBg/page_bg_1.png')} style={styles.container}>

                <ChangeCarModal
                    ref={(ref)=>this._modal = ref}
                    changeCar={this.changeCar.bind(this)}
                />

                <View style={styles.containerBg}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>this.goToPage("PKList")} >
                        <Image source={require('../imgs/home/pk_banner.png')} style={styles.titleImg}/>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>PK赛车品牌</Text>
                    </View>
                    <View style={styles.allLogosContainer}>
                        {this.renderLogos()}
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>当前展示车型：{this.state.carType.name}</Text>
                        <TouchableOpacity activeOpacity={0.8}
                            style={{position:'absolute',right:5}}
                                          onPress={()=>this._modal.openModal()}
                        >
                            <Text style={styles.titleText}>切换车型>></Text>
                        </TouchableOpacity>
                    </View>
                    <SectionList
                        sections={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        //renderSectionHeader={this.renderSectionHeader.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#333'}}/>}
                    />
                    <View style={{height:cfn.picHeight(100)}}/>
                </View>
            </Image>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
    containerBg: {
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1
    },
    titleImg: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(375),
    },
    titleContainer: {
        width:cfn.deviceWidth(),height:cfn.picHeight(60),
        flexDirection:'row',
        backgroundColor:'#464646',
        alignItems:'center',
        //marginTop:cfn.picHeight(20)

    },
    titleIcon: {
        height:cfn.picHeight(30),width:cfn.picWidth(10),backgroundColor:'#fff',
        margin:cfn.picHeight(20)
    },
    titleText: {
        fontSize:12,color:'#eee'
    },
    allLogosContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        //marginTop:cfn.picHeight(20)
    },
    logoContainer: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/5,
        height:cfn.picHeight(170),
        //borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:cfn.picHeight(10),
        marginLeft:cfn.picWidth(10),
        backgroundColor:'rgba(0,0,0,0.5)',
        borderColor:'#fff',
        borderWidth:1
    },
    logoText: {
        position:'absolute',
        bottom:2,
        backgroundColor:'rgba(0,0,0,0.5)',
        color:'#fff',
        width:(cfn.deviceWidth()-cfn.picWidth(60))/5,
        textAlign:'center',
        //borderBottomLeftRadius:10,
        //borderBottomRightRadius:10,
        fontSize:10,
        // height:cfn.picHeight(40),
        // lineHeight:cfn.picHeight(35),
    },
    logoImg: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/5-2,
        height:(cfn.deviceWidth()-cfn.picWidth(60))/5-2,
        //borderRadius:10
    },
    itemContainer: {
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.7)',
        height:cfn.picHeight(120),
        alignItems:'center'
    },
    moreIcon: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        resizeMode:'stretch',
        position:'absolute',
        right:cfn.picWidth(20)

    },
    textContainer: {
        marginLeft:cfn.picWidth(20)
    },
    img: {
        width:cfn.picWidth(200),
        height:cfn.picHeight(100),
        backgroundColor:'#eee',
        marginLeft:cfn.picWidth(20)
    },
    name: {
        fontSize:15,
        color:'#eee'
    },
    price: {
        marginTop:cfn.picHeight(10),
        fontSize:12,
        color:'#a22'
    },

});

