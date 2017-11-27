/**
 * Created by tmxiong on 2017/11/24.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Modal,
    TouchableOpacity,
    Platform,
    Image,
    FlatList,

} from 'react-native';

import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import config from '../../config/config'

export default class changeCarModal extends PureComponent {

    static defaultProps={

    };

    constructor(props) {
        super(props);
        this.state={
            visible:false,
            data:config.cars
        };

        this.closeModal = this._closeModal;
        this.openModal = this._openModal;
    }

    _closeModal() {
        this.setState({
            visible:false
        })
    }
    _openModal() {
        this.setState({
            visible:true
        })
    }


    _keyExtractor=(item,index)=>item.id;

    renderItem({item,index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.props.changeCar(item)}
                style={styles.itemContainer}>
                <Image style={styles.icon} source={item.img}/>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {}}
            >

                <View style={styles.container}>
                    <NavBar
                        leftIcon={require('../../imgs/close_icon.png')}
                        middleText="PK赛车品牌"
                        leftFn={()=>this._closeModal()}
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#ccc'}}/>}
                    />
                    <StatusBar hidden={false}  translucent= {true} backgroundColor={'#464646'} />

                </View>

            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        marginTop:-25
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(120),
        flexDirection:'row',
        alignItems:'center'
    },
    itemText: {
        marginLeft:cfn.picWidth(20),
        color:'#000'
    },
    icon: {
        width:cfn.picWidth(120),
        height:cfn.picWidth(120),
        marginLeft:cfn.picWidth(20)
    },
});