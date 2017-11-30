/**
 * 某品牌某型号汽车详情页
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    SectionList
} from 'react-native';

import NavBar from '../../component/NavBar';
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';

export default class carVertionDetailPage extends Component {

    static defaultProps={

    };
    constructor(props) {
        super(props);

        this.id = this.props.navigation.state.params.id;
        // this.name = this.props.navigation.state.params.name;
        // this.img = this.props.navigation.state.params.img;
        this.state={
            data:[],
            itemTitle:null,
        }
    }

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getCarDetail(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err))
    }

    setData(data) {
        let data1 = this.changeObjKey(data.result.paramitems);
        let data2 = this.changeObjKey(data.result.configitems);
        this.setState({
            data:data1.concat(data2),
            itemTitle:data1[0].data[0].modelexcessids[0].value,
            isError:false,
            isLoading:false
        })
    }

    setError(err) {
        this.setState({
            isError:true,
            isLoading:false
        })
    }

    reload() {
        if(this.state.isError){
            this.setState({
                isError:false,
                isLoading:true,
            },()=>this.getData());
        }
    }

    changeObjKey(data) {
        for(let i = 0; i < data.length; i++) {
            data[i].key = data[i].itemtype;
            data[i].data = data[i].items;
            delete data[i].itemtype;
            delete data[i].items;
        }
        return data;
    }

    _keyExtractor=(item,index)=>item.name;

    renderItem({item,index, section}) {
        let color = '#ddd';
        if(index == 1 && section.key == '基本参数') {
            color = '#c22'
        }
        return(
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={[styles.itemText,{color:color}]}>{item.modelexcessids[0].value}</Text>
            </View>
        )
    }
    renderSectionHeader({section}) {
        return (
            <View style={[styles.itemContainer, {backgroundColor:'#464646',}]}>
                <Text style={[styles.itemText, {color: '#ddd'}]}>{section.key}</Text>
                <Text style={[styles.itemText, {color: '#ddd'}]}>标配● 选配◎ 无-</Text>
            </View>
        );
    }


    render() {
        return(
            <Image source={require('../../imgs/pageBg/page_bg_3.png')} style={styles.container}>
                <View style={[styles.container,{backgroundColor:'rgba(0,0,0,0.7)'}]}>
                    <NavBar
                        middleText={'配置详情'}
                        leftFn={this.goBack.bind(this)}
                    />
                    <View style={styles.itemTitle}>
                        <Text style={{color:'#ddd'}}>{this.state.itemTitle}</Text>
                    </View>
                    <SectionList
                        sections={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={
                            <TouchableOpacity
                                style={{alignSelf:'center',marginTop:cfn.deviceHeight()/3}}
                                activeOpacity={0.8}
                                onPress={()=>this.reload()}
                            >
                                <Text style={{color:'#ddd'}}>{this.state.isError ? '加载错误，点击重试' : '正在加载...'}</Text>
                            </TouchableOpacity>
                        }
                        //ListHeaderComponent={()=><Image source={{uri:this.img.replace('/s_','/u_')}} style={styles.img}/>}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#666',}}/>}
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
    },
    itemTitle: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        backgroundColor:'#464646',
        paddingLeft:cfn.picWidth(20),
        justifyContent:'center',
        borderBottomColor:'#666',
        borderBottomWidth:1
    },

    itemContainer: {
        flexDirection:'row',
        height:cfn.picHeight(80),
        width:cfn.deviceWidth(),
        backgroundColor:'rgba(0,0,0,0.4)',
        alignItems:'center',
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        justifyContent:'space-between',

    },
    itemText: {
        fontSize:12,
        color:'#ddd'
    }

});