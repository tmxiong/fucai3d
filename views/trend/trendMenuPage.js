/**
 * Created by tmxiong on 2018/1/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter,
    FlatList,
} from 'react-native';

import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import Loading from '../../component/loading'
import config from '../../config/config'
export default class trendMenuPage extends Component{

    static defaultProps={

    };
    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            isError:false,
            data:[],
        }
    }

    componentDidMount() {
        this.yuceListener = DeviceEventEmitter.addListener('yuce',(data)=>{

            this.setState({
                data:data,
                isLoading:false,
            })
        })
    }
    componentWillUnmount() {
        this.yuceListener.remove();
    }

    getData() {

    }

    _keyExtractor = (item, index) => item.id;

    goToPage(route,params) {
        this.props.navigation.navigate(route,params);
    }

    renderItem({item,index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={()=>this.goToPage('ArticleDetail', {
                        id: item.id,
                        //name: item.title,
                        name: '3D预测',
                        rowData: item,
                    }
                )}
                style={styles.item_container}>

                <View style={styles.item_text_container}>
                    <Text
                        style={styles.item_title}>{item.title}</Text>
                    <Text style={styles.item_source}>{config.appName}</Text>
                    <Text style={styles.item_time}>{new Date(item.publishTime).toLocaleString().split(' ')[0]}</Text>
                </View>
                <Image
                    style={styles.item_img}
                    source={{uri: item.imageList[0]}}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='走势预测'
                    leftIcon={null}
                />
                <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={()=>this.goToPage('trend',{})}
                                      activeOpacity={0.8}
                                      style={[styles.itemContainer,{backgroundColor:'#01cad4'}]}>
                        <Text style={{color:'#fff',fontSize:14}}>综合</Text>
                        <Text style={{color:'#fff',fontSize:10,marginTop:2}}>个/十/百位综合走势图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goToPage('kuadu',{})}
                                      activeOpacity={0.8}
                                      style={[styles.itemContainer,{backgroundColor:'#0d8cac'}]}>
                        <Text style={{color:'#fff',fontSize:14}}>跨度</Text>
                        <Text style={{color:'#fff',fontSize:10,marginTop:2}}>跨度分布走势图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goToPage('daxiao',{name:'大小走势'})}
                                      activeOpacity={0.8}
                                      style={[styles.itemContainer,{backgroundColor:'#fb667a'}]}>
                        <Text style={{color:'#fff',fontSize:14}}>大小</Text>
                        <Text style={{color:'#fff',fontSize:10,marginTop:2}}>大小比走势图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goToPage('jiou',{name:'奇偶比'})}
                                      activeOpacity={0.8}
                                      style={[styles.itemContainer,{backgroundColor:'#1bc266'}]}>
                        <Text style={{color:'#fff',fontSize:14}}>奇偶</Text>
                        <Text style={{color:'#fff',fontSize:10,marginTop:2}}>奇偶比走势图</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionTitle}>
                    <View style={styles.icon}/>
                    <Text>福彩3D预测</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{position:'absolute',right:5}}
                        onPress={()=>this.goToPage('ArticleList',{type:'fc',name:'3D推荐'})}>
                        <Text>查看更多>></Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    //style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={(data, index) => ( {
                        length: cfn.picHeight(160),
                        offset: cfn.picHeight(160) * index,
                        index
                    } )}

                    //onEndReached={this._onEndReached.bind(this)}
                    //onEndReachedThreshold={0.8}
                />
                {this.state.isLoading ? <Loading
                    isLoading={this.state.isLoading}
                    isError={this.state.isError}
                    reload={this.getData.bind(this)}
                /> : null}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    itemContainer: {
        width: cfn.deviceWidth()/2,
        height: cfn.picHeight(150),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderRightColor:'#eee',
        borderRightWidth:1
    },
    sectionContainer: {
        flexDirection:'row',
        width:cfn.deviceWidth(),
        flexWrap:'wrap',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:'#fff'
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
    },
    sectionTitle: {
        backgroundColor:'#fff',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        flexDirection:'row',
        alignItems:'center'
    },
    icon: {
        width:3,
        height:14,
        backgroundColor:config.baseColor,
        marginRight:5,
        marginLeft:5
    }

});