/**
 * Created by timxiong on 2017/7/4.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Platform,
    StatusBar
} from 'react-native';

import cfn from '../tools/commonFun'
//import {setCollection} from '../../app/actions/detailPage';

import collection_true from '../imgs/collection_icon_true.png';
import collection_false from '../imgs/collection_icon_false.png';
import refresh from '../imgs/refresh_icon.png'

export default class modal extends PureComponent {

    static defaultProps={

    };

    constructor(props){
        super(props);

    }

    render() {

        const {isCollected} = this.props;

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {}}
            >
                <StatusBar hidden={false} animated={true} translucent= {true} backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'light-content'}/>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>this.props.closeModal()}
                    style={styles.container}>
                    <View
                        style={{width:cfn.picWidth(180),
                            height:cfn.picHeight(180),
                            alignItems:"center",
                            justifyContent:'center',
                            borderRadius:5,
                            marginTop: Platform.OS == 'ios' ? cfn.picHeight(150) : cfn.picHeight(100),
                            marginRight: cfn.picWidth(20),
                            backgroundColor:'#fff',zIndex:3}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.itemContent}
                            onPress={()=>this.props.closeModal('article')}
                        >
                            <Image source={isCollected ? collection_true : collection_false}
                                   style={{width:cfn.picWidth(40),resizeMode:'contain', marginRight:cfn.picWidth(10)}}
                            />
                            <Text style={[styles.itemText,{color: isCollected ? '#0f88ee' : '#888'}]}>
                                收藏
                            </Text>
                        </TouchableOpacity >
                        <View style={{width:cfn.picWidth(130),borderBottomColor: '#ddd',borderBottomWidth: 1}}/>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.itemContent}
                            onPress={()=>this.props.closeModal('refresh')}
                        >
                            <Image source={refresh}
                                   style={{width:cfn.picWidth(40),resizeMode:'contain', marginRight:cfn.picWidth(10)}}
                            />
                            <Text style={[styles.itemText,{color:'#8a8a8a'}]}>
                                刷新
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    itemContent: {
        width:cfn.picWidth(160),
        height: cfn.picHeight(80),
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    itemText: {
        textAlign: 'center',
        alignSelf:'center',
        color:'#888'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});