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
export default class carVersionPage extends Component {
    static defaultProps={

    };

    constructor(props) {
        super(props);
        this.id = props.navigation.state.params.id;
        this.img = props.navigation.state.params.img;
        this.name = props.navigation.state.params.name;
        this.loadingText = '正在加载...';
        this.errorText = '加载失败，点击重试';
        this.state={
            data:[],
            isError:false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarVersion(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .then((error)=>this.setError())
    }
    setData(data) {
        let data1 = this.changeObjKey(data.result.fctlist);
        let data2 = this.changeObjKey(data.result.otherfctlist);
        this.setState({data:data1.concat(data2),isError:false,})
    }

    setError(error) {
        this.setState({
            isError: true,
        })
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

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route, params) {
        this.props.navigation.navigate(route,params);
    }

    reLoad() {
        if(this.state.isError) {
            this.setState({
                isError: false,
            });
            this.getData();
        }

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
    renderSectionHeader({section}) {
        return <View style={styles.sectionHeader}>
            <Text style={{marginLeft:cfn.picWidth(20),fontSize:12,color:'#bbb'}}>{section.key}</Text>
        </View>
    }
    render() {
        return(
            <Image source={require('../../imgs/pageBg/page_bg_3.png')} style={styles.container}>
                <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.7)'}]}>
                    <NavBar
                        middleText={this.props.navigation.state.params.name}
                        leftFn={this.goBack.bind(this)}
                        rightFn={()=>this.goToPage('Jieshao',{name:this.name,id:this.id, img:this.img})}
                        rightText={'了解品牌'}
                    />
                    <SectionList
                        sections={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#666'}}/>}
                        ListEmptyComponent={
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{alignSelf:'center',marginTop:cfn.deviceHeight()/3}}
                                onPress={()=> this.reLoad()}>
                                <Text style={{color:'#eee'}}>{this.state.isError ? this.errorText : this.loadingText}</Text>
                            </TouchableOpacity>}
                    />

                </View>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
   container: {
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight()
   } ,
    itemContainer: {
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.3)',
        height:cfn.picHeight(160),
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
        color:'#ddd'
    },
    price: {
        marginTop:cfn.picHeight(10),
        fontSize:15,
        color:'#f33'
    },
    sectionHeader: {
        height:cfn.picHeight(60),
        width:cfn.deviceHeight(),
        justifyContent:'center',
        backgroundColor:'#464646',
    }
});