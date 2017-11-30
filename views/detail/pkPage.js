/**
 * Created by timxiong on 2017/9/6.
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
import Spinner from 'react-native-loading-spinner-overlay'

const colors = {
    titleColor:'#ccc',
    tiaoColor_1:'#b63827',
    textColor_1:'#b63827',
    borderColor_1:'#b63827',

    tiaoColor_2:'#3169bc',
    textColor_2:'#3169bc',
    borderColor_2:'#3169bc',
};

export default class jieshaoPage extends Component {

    static defaultProps={

    };
    constructor(props) {
        super(props);

        this.id = this.props.navigation.state.params.ids;
        //this.id = '23370,11620';
        // this.name = this.props.navigation.state.params.name;
        // this.img = this.props.navigation.state.params.img;
        this.state={
            data:[],
            carImg:['',''],
            carName:[['',''],['','']],
            carPrice:[['',''],['','']],
            carItems:null,
            visible:true,
            isError:false,
        }
    }


    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getPK(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setData(data) {
        let items = [data.result[0].paramitems, data.result[1].paramitems];
        let carItems = this.renderItems(items);


        this.setState({
            visible:false,
            isError:false,
            carImg:[data.result[0].specinfo.carsimage,data.result[1].specinfo.carsimage],
            carName:[[data.result[0].specinfo.serisename,data.result[0].specinfo.specname],
                [data.result[1].specinfo.serisename,data.result[1].specinfo.specname]],
            carPrice:[[data.result[0].dealerinfo.allprice,data.result[0].dealerinfo.price],
                [data.result[1].dealerinfo.allprice,data.result[1].dealerinfo.price]],
            carItems: carItems
        });
    }

    setError(error) {
        this.setState({
            isError:true,
            visible:false,
        });
    }

    reload() {
        if(this.state.isError) {
            this.setState({
                isError:false,
                visible:true
            },()=>this.getData());

        }

    }

    renderItems(carItems) {
        let sections = [];
        for(let i = 0; i < carItems[0].length; i++) {

            let items = [];


            let peizhi_1 = [];
            let peizhi_2 = [];

            for(let j = 0; j < carItems[0][i].items.length; j++) {

                // 最后一项 配置差异 部分
                if(carItems[0].length - 1 == i) {

                    if(carItems[0][i].items[j].value == 1 && carItems[1][i].items[j].value == 0) {
                        peizhi_1.push(
                            <View style={styles.chayiContent}>
                                <Text style={styles.chayiText}>{carItems[0][i].items[j].name}</Text>
                            </View>
                        );
                    } else if(carItems[1][i].items[j].value == 1 && carItems[0][i].items[j].value == 0) {
                        peizhi_2.push(
                            <View style={[styles.chayiContent,{borderColor:colors.borderColor_2}]}>
                                <Text style={[styles.chayiText,{color:colors.tiaoColor_2}]}>{carItems[1][i].items[j].name}</Text>
                            </View>
                        );
                    }

                    items = <View style={[styles.itemContainer,{flexDirection:'row',alignItems:'flex-start'}]}>
                        <View style={styles.chayiContainer}>
                            {peizhi_1.length == 0 && peizhi_2.length == 0 ? <Text style={[styles.itemText,{marginBottom:cfn.picHeight(40)}]}>无其它配置差异</Text> : peizhi_1}
                        </View>
                        <View style={[styles.chayiContainer,{justifyContent:'flex-end',alignItems:'flex-start'}]}>
                            {peizhi_1.length == 0 && peizhi_2.length == 0 ? <Text style={[styles.itemText,{marginBottom:cfn.picHeight(40)}]}>无其它配置差异</Text> : peizhi_2}
                        </View>
                    </View>

                    // 有横条的部分
                } else {
                    let width = cfn.deviceWidth()-cfn.picWidth(50);
                    let width_1 = width/2;
                    let width_2 = width/2;

                    let value_1 = carItems[0][i].items[j].value;
                    let value_2 = carItems[1][i].items[j].value;

                    if(carItems[1][i].items[j].isint != 0) {
                        let value_1 = parseFloat(carItems[0][i].items[j].value);
                        let value_2 = parseFloat(carItems[1][i].items[j].value);

                        width_1 = value_1 / (value_1 + value_2) * width;
                        width_2 = value_2 / (value_1 + value_2) * width;
                    }

                    items.push(
                        <View key={""+i+j} style={styles.itemContainer}>
                            <View style={styles.itemTextContainer}>
                                <Text style={styles.itemText}>{carItems[0][i].items[j].value}</Text>
                                <Text style={styles.itemText}>{carItems[0][i].items[j].name}</Text>
                                <Text style={styles.itemText}>{carItems[1][i].items[j].value}</Text>
                            </View>
                            <View style={styles.itemTiaoContainer}>
                                <View style={[styles.tiao,styles.tiao1,{width:width_1}]}/>
                                <View style={[styles.tiao,styles.tiao2,{width:width_2}]}/>
                            </View>
                        </View>
                    )
                }

            }

            sections.push(
                <View key={i} style={styles.sectionBg}>
                    <View style={styles.sectionHeader_1}>
                        <Text style={styles.pkSubTitle}>{carItems[0][i].itemtype}</Text>
                    </View>
                    {items}
                </View>) ;
        }

        return sections;
    }

    render() {
        return(
            <Image source={require('../../imgs/pageBg/page_bg_4.png')}
                   style={styles.containerBg}>
                <View style={styles.container}>
                    <NavBar
                        middleText={'PK赛车'}
                        leftFn={this.goBack.bind(this)}
                    />
                    <View style={styles.titleContainer}>
                        <View  style={styles.car}>
                            <Image source={{uri:this.state.carImg[0]}} style={styles.carImg}/>
                            <View style={styles.carName}>
                                <Text style={styles.carNameText1}>{this.state.carName[0][0]}</Text>
                                <Text style={styles.carNameText2}>{this.state.carName[0][1]}</Text>
                            </View>

                        </View>
                        <View  style={styles.car}>
                            <Image source={{uri:this.state.carImg[1]}} style={styles.carImg}/>
                            <View style={[styles.carName,{alignItems:'flex-end'}]}>
                                <Text style={styles.carNameText1}>{this.state.carName[1][0]}</Text>
                                <Text style={styles.carNameText2}>{this.state.carName[1][1]}</Text>
                            </View>
                        </View>
                        <View style={styles.pk}>
                           <Image source={require('../../imgs/pk_icon.png')} style={styles.pkIcon}/>
                        </View>
                    </View>

                    <ScrollView>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.pkTitle}>—— PK价格 ——</Text>
                        </View>

                        <View style={[styles.itemContainer,
                            {flexDirection:'row',backgroundColor:'rgba(0,0,0,0.5)',height:cfn.picHeight(240)}]}>

                            <View style={styles.priceContainer}>

                                <Text style={[styles.priceText,{fontSize:12}]}>全款参考:</Text>
                                <Text style={[styles.priceText,{fontWeight:'bold',fontSize:18}]}>{this.state.carPrice[0][0]}</Text>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.priceText}>裸车价参考:</Text>
                                    <Text style={styles.priceText}>{this.state.carPrice[0][1]}</Text>
                                </View>

                            </View>

                            <View style={[styles.priceContainer,{marginLeft:cfn.picWidth(40),borderColor:colors.borderColor_2}]}>

                                <Text style={[styles.priceText,{fontSize:12,color:colors.borderColor_2}]}>全款参考:</Text>
                                <Text style={[styles.priceText,{fontWeight:'bold',fontSize:18,color:colors.textColor_2}]}>{this.state.carPrice[1][0]}</Text>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={[styles.priceText,{color:colors.textColor_2}]}>裸车价参考:</Text>
                                    <Text style={[styles.priceText,{color:colors.textColor_2}]}>{this.state.carPrice[1][1]}</Text>
                                </View>

                            </View>
                        </View>



                        <View style={styles.sectionHeader}>
                            <Text style={styles.pkTitle}>—— PK配置 ——</Text>
                        </View>
                        {this.state.carItems ||
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.reload()}
                            style={{alignSelf:'center',marginTop:cfn.picHeight(200)}}
                        >
                            <Text style={{color:'#ddd'}}>{this.state.isError ? '加载错误，点击重试':'正在加载...'}</Text>
                        </TouchableOpacity>}
                        {/*<Text style={styles.pkSubTitle}>动力性能</Text>*/}
                        {/*<View style={[styles.itemContainer,{flexDirection:'row'}]}>*/}
                        {/*<View style={styles.chayiContainer}>*/}

                        {/*</View>*/}

                        {/*<View style={styles.chayiContainer}>*/}
                        {/*<View style={styles.chayiContent}>*/}
                        {/*<Text style={styles.chayiText}>气囊气囊</Text>*/}
                        {/*</View>*/}
                        {/*</View>*/}
                        {/*</View>*/}

                    </ScrollView>
                </View>
                <Spinner
                    visible={this.state.visible}
                    textContent={"正在PK..."}
                    overlayColor="rgba(0,0,0,0.7)"
                    animation="fade"
                    color="#f55"
                    textStyle={{color: '#f55'}} />
            </Image>


        )
    }
}
const styles = StyleSheet.create({
    containerBg: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
   container: {
       flex:1,
       alignItems:'center',
       width:cfn.deviceWidth(),
       backgroundColor:'rgba(0,0,0,0.1)'
   },
   content: {
       width:cfn.deviceWidth(),
       padding:cfn.picWidth(20)
   },
    text: {
       color:colors.titleColor,
        lineHeight:25,
        fontSize:14
    },
    titleContainer: {
        flexDirection:'row',
        width:cfn.deviceWidth(),
        justifyContent:'space-between',
        //backgroundColor:'#fff',
        height:cfn.picHeight(200+70),
        borderBottomColor:'#666',
        borderBottomWidth:1,
        marginTop:cfn.picHeight(20)
    },
    car: {
        width:(cfn.deviceWidth()-cfn.picWidth(20))/2,
        height:cfn.picHeight(200),
        //resizeMode:'contain'
    },
    carImg: {
        width:(cfn.deviceWidth()-cfn.picWidth(20))/2,
        height:cfn.picHeight(200),
        // backgroundColor:'#c11'
    },
    carName: {
        backgroundColor:'rgba(0,0,0,0.5)',
        width:(cfn.deviceWidth()-cfn.picWidth(20))/2,
        padding:2,
        height:cfn.picHeight(70),
        justifyContent:'center'
    },
    carNameText1: {
        color:'#ddd',
        fontSize:12,
    },
    carNameText2: {
        color:'#ccc',
        fontSize:9
    },
    pk: {
        width:cfn.picWidth(200),
        height:cfn.picWidth(200),
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        left:(cfn.deviceWidth()-cfn.picWidth(40))/2 - cfn.picWidth(80)
    },
    pkIcon: {
      width:cfn.picWidth(200),
        height:cfn.picWidth(200),
        resizeMode:'contain'
    },
    sectionHeader: {
        height:cfn.picHeight(60),
        width:cfn.deviceWidth(),
        justifyContent:'center',
        backgroundColor:'#464646',
        alignItems:'center'
    },
    pkTitle: {
        fontSize: 14,
        color:colors.titleColor,
        alignSelf:'center',
    },

    sectionBg: {
        backgroundColor:'rgba(0,0,0,0.5)'
    },

    sectionHeader_1: {
        //backgroundColor:'rgba(0,0,0,0.7)',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:cfn.picHeight(40),
        borderTopColor:colors.titleColor,
        borderBottomColor:colors.titleColor,
        borderTopWidth:1,
        borderBottomWidth:1,
        marginBottom:cfn.picHeight(20),
        width:cfn.picWidth(200)
    },

    pkSubTitle: {
        color:colors.titleColor,
        fontSize:12,
        padding:cfn.picWidth(10)
    },

    priceContainer: {
        width:cfn.picHeight(300),
        height:cfn.picHeight(200),
        borderColor:colors.borderColor_1,
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center'
    },
    priceText: {
      fontSize:9,
        color:colors.textColor_1
    },




    itemContainer: {
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center',
        //marginTop:cfn.picHeight(20),
    },
    itemTextContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:cfn.deviceWidth()-cfn.picWidth(40),
        alignItems:'center',
        height:cfn.picHeight(50),
        //backgroundColor:'#f78'
    },
    itemText: {
        color:colors.titleColor,
        fontSize:12,
    },
    itemTiaoContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:cfn.deviceWidth()-cfn.picWidth(40),
        marginBottom:cfn.picHeight(20)
    },
    tiao: {
        width:(cfn.deviceWidth()-cfn.picWidth(50))/2,
        height:cfn.picHeight(10),
    },
    tiao1: {
        backgroundColor:colors.tiaoColor_1
    },
    tiao2: {
        backgroundColor:colors.tiaoColor_2
    },
    chayiContainer: {
        width:(cfn.deviceWidth()-cfn.picWidth(40))/2,
        //backgroundColor:'#d78',
        minHeight:0,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    chayiContent: {
        height:cfn.picHeight(40),
        minWidth:10,
        alignItems:'center',justifyContent:'center',
        paddingLeft:3,paddingRight:3,
        margin:5,
        borderColor:colors.borderColor_1,
        borderWidth:1
    },
    chayiText: {
        fontSize:10,
        color:colors.textColor_1
    }
});
