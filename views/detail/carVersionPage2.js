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
    SectionList
} from 'react-native';
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
import NavBar from '../../component/NavBar'
import config from '../../config/config'
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
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarVersion2(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        data = this.changeObjKey(data.result.enginelist[0].yearspeclist);
        this.setState({data:data})
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

    _keyExtractor=(item,index)=>item.id;

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route,params);
    }

    renderItem({item}) {
        return(
            <View
                style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={()=>this.goToPage('Shop',{id:this.id})}
                        activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>商店</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.goToPage('CarVersionDetail')}
                        activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.pk}>
                        <Text style={styles.pkText}>加入PK</Text>
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
                    rightFn={()=>this.goToPage('Jieshao',{name:this.name,id:this.id, img:this.img})}
                    rightText={'开始PK'}
                />
                <SectionList
                    sections={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={()=><Image source={{uri:this.img.replace('/s_','/u_')}} style={styles.img}/>}
                    ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1}}/>}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
   container: {
       width:cfn.deviceWidth(),height:cfn.deviceHeight()
   } ,
    itemContainer: {
        flexDirection:'row',
        backgroundColor:'#fff',
        height:cfn.picHeight(160),
        alignItems:'center'
    },
    textContainer: {
        marginLeft:cfn.picWidth(20)
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
        position:'absolute',
        right:cfn.picHeight(20),
        bottom:cfn.picHeight(20),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    pk: {
        width:cfn.picWidth(120),
        height:cfn.picHeight(50),
        backgroundColor:config.baseColor,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    pkText: {
        color:'#fff',
        fontSize:12
    },
    btn: {
        width:cfn.picWidth(100),
        height:cfn.picHeight(50),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
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