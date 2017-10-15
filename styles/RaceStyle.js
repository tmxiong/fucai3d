import {StyleSheet,} from 'react-native';
import commonFun from '../tools/commonFun'
module.exports = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:226
    },
    rankingBg: {
        width:commonFun.deviceWidth(),
        height:226,
        position:'absolute',
        top:0,
        left:0,
        zIndex:999,
        flexDirection:'row'
    },
    cars: {
        height: 10,
        marginTop: 5,
        marginRight: -15,
    },
    carsContainer: {
        position: 'absolute',
        top: 52,
        width: commonFun.deviceWidth(),
        alignItems: 'flex-end'
    },
    scenery: {
        height: 56,
        position: 'absolute',
        right: 0,
    },
    road: {
        height: 150,
        top: 56,
        position: 'absolute',
        right: 0,
    },
    flagsContainer: {
        width: 80,
        height: 85,
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
        left: commonFun.deviceWidth()/6,
    },
    flags: {
        width: 40,
        height: 48,
        left:0,
        top:0
    },
    carNum: {
        marginTop:206,
        height:20,
        backgroundColor:'rgb(45,24,69)',
        width:commonFun.deviceWidth()
    }
});