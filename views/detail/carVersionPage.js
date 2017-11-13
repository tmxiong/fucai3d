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
        this.state={
            data:[],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarVersion(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }
    setData(data) {
        data = this.changeObjKey(data.result.fctlist);
        this.setState({data:data})
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

    renderItem({item}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.goToPage()}
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
            <Text style={{marginLeft:cfn.picWidth(20),fontSize:12,color:'#000'}}>{section.key}</Text>
        </View>
    }
    render() {
        return(
            <View style={styles.container}>
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
       width:cfn.picWidth(200),
        height:cfn.picHeight(120),
        backgroundColor:'#eee',
        marginLeft:cfn.picWidth(20)
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
        width:cfn.deviceHeight(),
        justifyContent:'center'
    }
});