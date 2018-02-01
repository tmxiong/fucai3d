/**
 * Created by Administrator on 2018/1/31.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StatusBar,
    NetInfo
} from 'react-native';

import cfn from '../tools/commonFun'

export default class qishuModal extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            visible:false,
        };
        this.showModal = this._showModal;
        this.closeModal = this._closeModal;
    }

    static defaultProps = {
        onClose: ()=>{},
    };

    _showModal() {
        this.setState({
            visible:true
        });
        //this._onClose(false);
    }

    _closeModal(qishu) {
        this.setState({
            visible:false
        });
        this._onClose(qishu);
    }

    _pressHandle(qishu) {
        this._closeModal(qishu);
    }

    _onClose(qishu) {
        this.props.onClose(qishu)
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{width:cfn.deviceWidth(),height:cfn.deviceHeight(),backgroundColor:'rgba(0,0,0,0.5)'}}
                    onPress={()=>this._pressHandle()}
                >
                    <View style={styles.menu_container}>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(30)}>
                            <Text>30期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(50)}>
                            <Text>50期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(60)}>
                            <Text>60期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(90)}>
                            <Text>90期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(100)}>
                            <Text>100期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(120)}>
                            <Text>120期</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.menu} onPress={()=>this._pressHandle(150)}>
                            <Text>150期</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>


            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    menu_container: {
        width:cfn.picWidth(200),
        backgroundColor:'#fff',
        position:'absolute',
        right:5,
        top:cfn.picHeight(100),
        alignItems:'center',
        justifyContent:'center'
    },
    menu: {
        width:cfn.picWidth(200),
        height:cfn.picHeight(80),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20)
    }
})