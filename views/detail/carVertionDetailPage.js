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
    }

    setData(data) {
        let data1 = this.changeObjKey(data.result.paramitems);
        let data2 = this.changeObjKey(data.result.configitems);
        this.setState({data:data1.concat(data2),
            itemTitle:data1[0].data[0].modelexcessids[0].value})
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
        let color = '#888';
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
            <View style={[styles.itemContainer, {backgroundColor: 'transparent'}]}>
                <Text style={[styles.itemText, {color: '#333'}]}>{section.key}</Text>
                <Text style={[styles.itemText, {color: '#333'}]}>标配● 选配◎ 无-</Text>
            </View>
        );
    }


    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={'配置详情'}
                    leftFn={this.goBack.bind(this)}
                />
                <View style={styles.itemTitle}>
                    <Text style={{color:'#000'}}>{this.state.itemTitle}</Text>
                </View>
                <SectionList
                    sections={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    keyExtractor={this._keyExtractor}
                    //ListHeaderComponent={()=><Image source={{uri:this.img.replace('/s_','/u_')}} style={styles.img}/>}
                    //ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1}}/>}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    itemTitle: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        backgroundColor:'#f5f5f5',
        paddingLeft:cfn.picWidth(20),
        justifyContent:'center'
    },

    itemContainer: {
        flexDirection:'row',
        height:cfn.picHeight(80),
        width:cfn.deviceWidth(),
        backgroundColor:'#fff',
        alignItems:'center',
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        justifyContent:'space-between',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    itemText: {
        fontSize:12
    }

});