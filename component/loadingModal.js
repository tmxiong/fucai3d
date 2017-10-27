/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import {NavigationActions} from 'react-navigation'

import cfn from '../tools/commonFun'
import CountDown from './countDown'
export default class loadingModal extends PureComponent {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);

        this.state = {
            animating: true,
            modalVisible:true,
        };

        //this._startCountDown = this.countDown;
    }

    componentWillReceiveProps(props) {
        //if(this.props!=props){
            this.setState({
                isLoading:props.isLoading,
                isError:props.isError
            });
        //}
    }



    render() {

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {}}
            >
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'light-content'}/>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <ActivityIndicator
                            animating={this.state.animating}
                            style={{height: cfn.picHeight(100),marginBottom:cfn.picHeight(20), alignItems:'center',justifyContent:'center'}}
                            color="#000"
                            size="large"
                        />
                        <CountDown
                            ref={ref=>this.countDown = ref}
                            textStyle={{textAlign:'center'}}
                        />
                    </View>

                </View>

            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:"center"
    },
    content: {
        width:cfn.deviceWidth()/3*2,
        height:cfn.deviceHeight()/4,
        backgroundColor:'#fff',
        borderRadius:cfn.picWidth(20),
        alignItems:'center',
        justifyContent:"center"
    }
});