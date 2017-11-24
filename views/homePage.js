import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SectionList
} from 'react-native';
import cfn from '../tools/commonFun'
import Banner from '../component/Banner'
import fetchp from '../tools/fetch-polyfill'
import urls from '../config/urls'
import config from '../config/config'
export default class wanfaPage extends Component {

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = {
            items:null,
            data:[],
        };
        this.id = 40;
    }

    componentDidMount() {
        this.getData();
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    getData() {
        fetchp(urls.getCarVersion(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        let data1 = this.changeObjKey(data.result.fctlist);
        let data2 = this.changeObjKey(data.result.otherfctlist);
        this.setState({data:data1.concat(data2)})
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
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <Image source={require('../imgs/pageBg/page_bg_1.png')} style={styles.container}>
                <View style={styles.containerBg}>
                    <View style={styles.titleImg}/>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>PK赛车品牌</Text>
                    </View>
                    <View style={styles.allLogosContainer}>
                        {this.renderLogos()}
                    </View>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleIcon}/>
                        <Text style={styles.titleText}>当前展示车型：保时捷</Text>
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
        height:cfn.picHeight(250),
    },
    titleContainer: {
        width:cfn.deviceWidth(),height:cfn.picHeight(70),
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.2)',
        alignItems:'center'
    },
    titleIcon: {
        height:cfn.picHeight(40),width:cfn.picWidth(10),backgroundColor:'#a22',
        margin:cfn.picHeight(20)
    },
    titleText: {
        fontSize:16,color:'#a22'
    },
    allLogosContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
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
        height:cfn.picHeight(140),
        alignItems:'center'
    },
    textContainer: {
        marginLeft:cfn.picWidth(20)
    },
    img: {
        width:cfn.picWidth(200),
        height:cfn.picHeight(120),
        backgroundColor:'#eee',
        marginLeft:cfn.picWidth(20)
    },
    name: {
        fontSize:15,
        color:'#eee'
    },
    price: {
        marginTop:cfn.picHeight(10),
        fontSize:15,
        color:'#a22'
    },

});

const logos = [
    {img:require('../imgs/cars/bsj.png'),name:'保时捷',id:40},
    {img:require('../imgs/cars/lbjn.png'),name:'兰博基尼',id:48},
    {img:require('../imgs/cars/bc.png'),name:'奔驰',id:36},
    {img:require('../imgs/cars/ad.png'),name:'奥迪',id:33},
    {img:require('../imgs/cars/bm.png'),name:'宝马',id:15},
    {img:require('../imgs/cars/bl.png'),name:'宾利',id:39},
    {img:require('../imgs/cars/fll.png'),name:'法拉利',id:42},
    {img:require('../imgs/cars/msld.png'),name:'玛莎拉蒂',id:57},
    {img:require('../imgs/cars/lts.png'),name:'路特斯',id:50},
    {img:require('../imgs/cars/asdmd.png'),name:'阿斯顿·马丁',id:35},
];