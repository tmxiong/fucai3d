import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
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
        }
    }

    componentDidMount() {
        this.getData();
    }

    goToPage(router,params) {
        this.props.navigation.navigate(router,params)
    }

    getData() {
        fetchp(urls.getCarNews(),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>console.log(err));
    }

    setData(data) {
        let items = [];
        data = data.list;
        for(let i = 0; i < data.length; i++) {
            items.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={i}
                    onPress={()=>this.goToPage('NewsDetail', {
                            docid: data[i].docid,
                            title: data[i].title,
                            mtime: data[i].mtime,
                            rowData: data[i],
                        }
                    )}
                    style={styles.item_container}>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{data[i].title}</Text>
                        <Text style={styles.item_source}>{config.appName}</Text>
                        <Text style={styles.item_time}>{data[i].mtime}</Text>
                    </View>
                    <Image
                        style={styles.item_img}
                        source={{uri: data[i].imgsrc}}/>
                </TouchableOpacity>
            )
        }
        this.setState({
            items: items,
        })
    }

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

    render() {

        return (
            <Image source={require('../imgs/pageBg/page_bg_1.png')} style={styles.container}>
                <View style={styles.containerBg}>
                    <Banner
                        bannerList={[
                            require('../imgs/banner/banner_1.png'),
                            require('../imgs/banner/banner_2.png'),
                            require('../imgs/banner/banner_3.png'),
                        ]}
                    />
                    <View style={styles.menuContainer}>
                        <View style={styles.menuContent}/>
                        <View style={styles.menuContent}/>
                        <View style={styles.menuContent}/>
                        <View style={styles.menuContent}/>
                    </View>
                    <View
                        style={styles.allLogosContainer}>
                        {this.renderLogos()}
                    </View>
                    <ScrollView>
                        {this.state.items}
                    </ScrollView>
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
    menuContainer: {
      width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        flexDirection:'row'
    },
    menuContent: {
      width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        borderRadius:cfn.picWidth(40),
        backgroundColor:'#f00'
    },
    allLogosContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
    },
    logoContainer: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/5,
        height:(cfn.deviceWidth()-cfn.picWidth(60))/5,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:cfn.picHeight(20),
        marginLeft:cfn.picWidth(10),
        backgroundColor:'#000'
    },
    logoText: {
        position:'absolute',
        bottom:0,
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
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
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

const logos = [
    {img:require('../imgs/cars/保时捷.png'),name:'保时捷',id:40},
    {img:require('../imgs/cars/兰博基尼.png'),name:'兰博基尼',id:48},
    {img:require('../imgs/cars/奔驰.png'),name:'奔驰',id:36},
    {img:require('../imgs/cars/奥迪.png'),name:'奥迪',id:33},
    {img:require('../imgs/cars/宝马.png'),name:'宝马',id:15},
    {img:require('../imgs/cars/宾利.png'),name:'宾利',id:39},
    {img:require('../imgs/cars/法拉利.png'),name:'法拉利',id:42},
    {img:require('../imgs/cars/玛莎拉蒂.png'),name:'玛莎拉蒂',id:57},
    {img:require('../imgs/cars/路特斯.png'),name:'路特斯',id:50},
    {img:require('../imgs/cars/阿斯顿马丁.png'),name:'阿斯顿·马丁',id:35},
];