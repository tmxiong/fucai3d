import React, {PureComponent} from 'react';
import {
    Animated,
    Image,
    DeviceEventEmitter,
    Platform,
    UIManager,
    LayoutAnimation,
    View,
    TouchableOpacity
} from 'react-native';

import road from '../imgs/race/road.png';
import scenery from '../imgs/race/scenery.png';

import RaceStyle from '../styles/RaceStyle'
import commonFun from '../tools/commonFun'
import Global from '../global/global';
import carNum from '../imgs/race/car_num.png'
import rankingBg from '../imgs/race/chengji.png'
const cars = [
    require('../imgs/race/car1_20161018.png'),
    require('../imgs/race/car2_20161018.png'),
    require('../imgs/race/car3_20161018.png'),
    require('../imgs/race/car4_20161018.png'),
    require('../imgs/race/car5_20161018.png'),
    require('../imgs/race/car6_20161018.png'),
    require('../imgs/race/car7_20161018.png'),
    require('../imgs/race/car8_20161018.png'),
    require('../imgs/race/car9_20161018.png'),
    require('../imgs/race/car10_20161018.png'),
];
const rank = [
    require('../imgs/race/number1_20161018.png'),
    require('../imgs/race/number2_20161018.png'),
    require('../imgs/race/number3_20161018.png'),
    require('../imgs/race/number4_20161018.png'),
    require('../imgs/race/number5_20161018.png'),
    require('../imgs/race/number6_20161018.png'),
    require('../imgs/race/number7_20161018.png'),
    require('../imgs/race/number8_20161018.png'),
    require('../imgs/race/number9_20161018.png'),
    require('../imgs/race/number10_20161018.png'),
];

const flags = [
    require('../imgs/race/flat.png'),
    require('../imgs/race/flat2.png')
];

const speed = [
    [545, 418, 354, 299, 216, 145, 102, 30, 0],
    [535, 435, 355, 285, 205, 105, 55, 5, 0],
    [520, 470, 400, 300, 260, 195, 121, 25, 0],
    [515, 440, 380, 300, 240, 160, 80, 0, 0],
    [509, 400, 321, 286, 210, 160, 90, 50, 0],
    [505, 435, 345, 165, 145, 85, 50, 15, 0],
    [501, 461, 364, 301, 213, 184, 100, 45, 0],
    [500, 415, 362, 305, 215, 153, 84, 35, 0],
    [491, 416, 352, 284, 200, 150, 60, 40, 0],
    [480, 375, 310, 250, 200, 160, 100, 20, 0]
];
// let kaiJiangNum = [5, 6, 4, 9, 10, 3, 8, 7, 1, 2];


class Race extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isReSet: false,
            showLeftFlag: true,

            showFlags: false,
            showRank: false,
            carViews : [],
            leftRankViews : [],
            rightRankViews : [],
            toRight:0,
            isRunning:false, // 是否正在播放比赛动画
        };
        this.kaiJiangNum = [5, 6, 4, 9, 10, 3, 8, 7, 1, 2];
        this.anim = new Animated.Value(0);
        this.flagAnim = new Animated.Value(0);
        this.newSpeed = Global.speed || this.getNewSpeed();
        this.stopFlag = false;
        this.willUnmount = false;
        //this.setRace(props);

        this._setRace = this.setRace;

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    }

    componentWillReceiveProps(props) {
        // this.kaiJiangNum = props.raceNum == null ? this.kaiJiangNum : props.raceNum;
        // if(this.raceState == props.raceState) return;
        // this.raceState = props.raceState;
        //
        // if(this.raceState == 'zhengZai') {
        //     setTimeout(()=>{
        //         this.setRace(props);
        //     },1000);
        // } else {
        //     this.setRace(props);
        // }


    }
    componentWillMount() {

    }

    componentDidMount() {
        //console.log('componentDidMount');
    }
    componentWillUnmount() {
        this.willUnmount = true;
    }

    setRace(raceState, kaijiangNum) {
        //this.startGame();
        this.kaiJiangNum = kaijiangNum;
        if(this.state.isRunning) return;
        switch (raceState) {
            case "zhunBei":
                this.renderCars();
                this.setState({showRank: false});
                break;
            case "zhengZai":
                this.renderCars();
                this.startGame();
                break;
            case "yiJing":
                this.renderRank();
                break;
        }
        // if(props.raceState === 'zhunBei'){
        //     this.renderCars();
        //     this.setState({showRank: false});
        //     console.log('zhunBei')
        //
        // }else if(props.raceState === 'zhengZai') {
        //     this.renderCars();
        //     this.startGame();
        //     console.log('zhengZai')
        //
        // }else if(props.raceState === 'yiJing') {
        //     this.renderRank();
        //     console.log('yiJing')
        // }
    }

    getNewSpeed() {
        let items = null;
        let arr = [];
        let scallNum = (commonFun.deviceWidth() - 60) / 545;
        for (let i = 0; i < speed.length; i++) {
            items = speed[i].reverse().map((item)=> {
                return -item * scallNum;
            });
            arr.push(items);
        }
        Global.speed = arr;
        return arr;
    }

    startGame() {
        this.stopFlag = false;

        var CustomLayoutAnimation = {
            duration: 16000,
            // create: {
            //     type: LayoutAnimation.Types.linear,
            //     //property: LayoutAnimation.Properties.opacity,
            // },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };
        LayoutAnimation.configureNext(CustomLayoutAnimation);

        this.setState({
            showRank:false,
            toRight: -3810 + commonFun.deviceWidth(),
            isRunning: true,
        });
        Animated.timing(this.anim, {
            toValue: 1,
            duration: 16000,
            isInteraction: false,
        }).start(()=> {
            if(this.willUnmount) return;
            this.setState({showFlags:true});
            this.startFlag();
            let timer = setTimeout(()=> {
                this.renderRank();
                this.reSetGame();
                clearTimeout(timer);
            }, 2000)
        });
    }

    startFlag() {
        this.flagAnim.setValue(0);
        this.flag = Animated.timing(this.flagAnim, {
            toValue: 1,
            duration: 400,
            isInteraction: false,
        }).start((e)=> {
            this.setState({showLeftFlag: !this.state.showLeftFlag});
            if (!this.stopFlag) {
                this.startFlag();
            }
        });

    }

    reSetGame() {
        this.anim.setValue(0);
        this.flagAnim.setValue(0);
        this.stopFlag = true;

        var CustomLayoutAnimation = {
            duration: 10,
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };
        LayoutAnimation.configureNext(CustomLayoutAnimation);

        this.setState({
            showLeftFlag: true,
            showFlags: false,
            toRight:0,
            isRunning:false,
        })
    }

    renderCars() {
        let carViews = [];

        for (let i = 0; i < cars.length; i++) {
            for (let j = 0; j < this.kaiJiangNum.length; j++) {
                if (this.kaiJiangNum[j] == i + 1) {  //j = 名次, i + 1 = 车号
                    carViews[i] = <Animated.Image
                        key={i}
                        source={cars[i]}
                        resizeMode='contain'
                        style={[
                            RaceStyle.cars,
                            {
                                transform: [{
                                    translateX: this.anim.interpolate({
                                        inputRange: [0, 0.1, 0.2, 0.4, 0.6, 0.75, 0.85, 0.9, 1],
                                        outputRange: this.newSpeed[j]
                                    })
                                }]
                            }
                        ]}
                    />
                }
            }
        }
        //return carViews;
        this.setState({carViews:carViews});
    }

    renderRank() {
        let leftRankViews = [];
        let rightRankViews = [];

        for (let i = 0; i < cars.length; i++) {
            for (let j = 0; j < this.kaiJiangNum.length; j++) {
                if (this.kaiJiangNum[j] == i + 1) {  //j = 名次, i + 1 = 车号
                    if(j < 5) {
                        leftRankViews[j] = (
                            <View key={j} style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                                <Image resizeMode='contain' style={{height: 20}} source={rank[j]}/>
                                <Image resizeMode='contain' style={{height: 20}} source={cars[i]}/>
                            </View>
                        )
                    }else {
                        rightRankViews[j] = (
                            <View key={j} style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                                <Image resizeMode='contain' style={{height: 20}} source={rank[j]}/>
                                <Image resizeMode='contain' style={{height: 20}} source={cars[i]}/>
                            </View>
                        )
                    }
                }
            }
        }
        if(!this.willUnmount){
            this.setState({
                leftRankViews: leftRankViews,
                rightRankViews: rightRankViews,
                showRank: true,
            })
        }

    }
    render() {

        //风景与跑道动画

        return (

            <View style={RaceStyle.container}>

                {/*排名*/}
                <Image source={rankingBg} style={[RaceStyle.rankingBg,{opacity: this.state.showRank ? 1 : 0}]}>
                    <TouchableOpacity
                        onPress={()=>this.setRace("zhengZai",this.kaiJiangNum)}
                        activeOpacity={0.7}
                        style={{position:'absolute',alignSelf:'center',zIndex:9,
                            left:commonFun.deviceWidth()/2-commonFun.picWidth(60)}}
                    >
                        <Image
                            style={{width:commonFun.picWidth(120),
                                height:commonFun.picWidth(120),resizeMode:'contain'}}
                            source={require('../imgs/race/play_btn.png')}/>
                    </TouchableOpacity>
                    <View>
                        {this.state.leftRankViews}
                    </View>

                    <View style={{position: 'absolute', right: 10}}>
                        {this.state.rightRankViews}
                    </View>
                </Image>

                {/*风景*/}
                <Animated.Image
                    source={scenery}
                    resizeMode='stretch'
                    style={[
                        RaceStyle.scenery,
                        {right:this.state.toRight}
                    ]}
                />

                {/*跑道*/}
                <Animated.Image source={road}
                                resizeMode='stretch'
                                style={[
                                    RaceStyle.road,
                                    {right:this.state.toRight}
                                ]}
                />

                {/*赛车*/}
                <View
                    style={RaceStyle.carsContainer}
                >
                    {this.state.carViews}
                </View>

                {/*旗子  h:48  w:40*/ }

                <Animated.View
                    style={[
                        RaceStyle.flagsContainer,
                        {opacity: this.state.showFlags ? 1 : 0},
                        {
                            transform: [
                                {
                                    rotateZ: this.state.showLeftFlag
                                        ? this.flagAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['-30deg', '105deg']
                                    })
                                        : this.flagAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['55deg', '-75deg']
                                    })
                                },
                            ]
                        }
                    ]}
                >
                    <Image resizeMode='contain'
                           source={flags[1]}
                           style={[RaceStyle.flags, {opacity: this.state.showLeftFlag ? 1 : 0}]}/>
                    <Image resizeMode='contain'
                           source={flags[0]}
                           style={[RaceStyle.flags, {opacity: this.state.showLeftFlag ? 0 : 1}]}/>
                </Animated.View>


                {/*底部*/}
                <Image source={carNum} resizeMode='contain' style={RaceStyle.carNum}/>
                {/*<TouchableOpacity
                 onPress={()=>{
                 DeviceEventEmitter.emit('drawVideoReturn', obj)
                 }}
                 style={{backgroundColor: '#cb2', width: 40, height: 20, alignItems: 'center', left:0,position:'absolute'}}
                 >
                 <Text>开始</Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                 onPress={()=>this.reSetGame()}
                 style={{backgroundColor: '#f72', width: 40, height: 20, alignItems: 'center', left:40,position:'absolute'}}
                 >
                 <Text>重置</Text>
                 </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.aaa()}
                    style={{
                        backgroundColor: '#de2',
                        width: 40,
                        height: 20,
                        alignItems: 'center',
                        left: 80,
                        position: 'absolute'
                    }}
                >
                    <Text>旗子</Text>
                </TouchableOpacity>*/}
            </View>

        )

    }
}

module.exports = Race;