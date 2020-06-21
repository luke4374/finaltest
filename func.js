import React, { Component } from 'react'
import { Text, View , Button, StyleSheet, Image, Dimensions, Animated, Easing, findNodeHandle, Slider} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from "react-native-vector-icons/AntDesign" 
import Video from 'react-native-video';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { FlatList, TouchableOpacity, TouchableHighlight  } from 'react-native-gesture-handler';

const Stack = createStackNavigator()
const songs =require('./musicList.json')
const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
  }

class Home extends React.Component{
    constructor(props){
        super(props)
        this.player=null
        this.state={
            paused:true,
            viewRef: null,
            duration: 0.00,
            slideValue: 0.00,
            currentTime: 0.00,
            currentIndex: 0,
            playMode: 0,
            spinValue: new Animated.Value(0),
            playIcon: 'play',
            musicInfo: {},
        }
        this.spinAnimated = Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.linear)
          })
    }

    componentDidMount(){
        console.disableYellowBox = true;
        this.setState({musicInfo: songs.list[this.state.currentIndex]})
    }

    formatMediaTime(duration) {
      let min = Math.floor(duration / 60)
      let second = duration - min * 60
      min = min >= 10 ? min : '0' + min
      second = second >= 10 ? second : '0' + second
      return min + ':' + second
    }

    spining() {
        if (this.rotation) {
          this.state.spinValue.setValue(0)
          this.spinAnimated.start(() => {
            this.spining()
          })
        }
      }
    
      spin() {
        this.rotation = !this.rotation
        if (this.rotation) {
          this.spinAnimated.start(() => {
            this.spinAnimated = Animated.timing(this.state.spinValue, {
              toValue: 1,
              duration: 6000,
              easing: Easing.inOut(Easing.linear)
            })
            this.spining()
          })
        } else {
          this.state.spinValue.stopAnimation((oneTimeRotate) => {
            this.spinAnimated = Animated.timing(this.state.spinValue, {
              toValue: 1,
              duration: (1 - oneTimeRotate) * 6000,
              easing: Easing.inOut(Easing.linear)
            })
          })
        }
      }

      imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)})
      }

      setDuration(duration) {
        this.setState({duration: duration.duration})
      }

      setTime(data) {
        let sliderValue = parseInt(this.state.currentTime)
        this.setState({
          slideValue: sliderValue,
          currentTime: data.currentTime
        })
      }

    _playcontorller=()=>{
        this.spin()
        //this.setState({paused:!paused})
        this.setState({
            paused: !this.state.paused,
            playIcon: this.state.paused ? 'pause' : 'play'
          })
    }
    _seekHandler=value=>{
      this.player.seek(value)
    }

    reset() {
        this.setState({
          currentTime: 0.00,
          slideValue: 0.00,
          musicInfo: {}
        })
      }
      playMode(playMode) {
        playMode ++
        playMode = playMode === 3 ? playMode = 0 : playMode
      }
      
      _endHandler=()=>{
        this.nextSong
      }

    preSong(currentIndex) {
        this.reset()
        this.setState({currentIndex: currentIndex < 0 ? songs.list.length - 1 : currentIndex})

    }

    nextSong(currentIndex) {
        this.reset()
        this.setState({currentIndex: currentIndex >= songs.list.length ? 0 : currentIndex})
      }

    render(){
        let musicInfo = songs.list[this.state.currentIndex]
        return(
        <View>
        <Image
            ref={(img) => { this.backgroundImage = img}}
            style={styles.bgContainer}
            source={{uri: songs.list[this.state.currentIndex].cover}}
            resizeMode='cover'
            onLoadEnd={() => this.imageLoaded()}
          />
        <View style={styles.bgContainer}>
        {
              Platform.OS === 'ios' ?
                <VibrancyView
                  blurType={'light'}
                  blurAmount={20}
                  style={styles.container}/> :
                <BlurView
                  style={styles.absolute}
                  viewRef={this.state.viewRef}
                  blurType="light"
                  blurAmount={10}
                />
            }
          </View>
          <View style={styles.bgContainer}>
            <View style={styles.navBarStyle}>
                <View style={styles.navBarContent}>

              <AntDesign name={'star'} size={20} color='#FF69B4'/>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>{musicInfo.title}</Text>
            </View>
            <AntDesign name={'star'} size={20} color='#FF69B4'/>

                </View>

            </View>
            <View style={styles.djCard}></View>
            <Image
          style={{width: 260, height: 260, alignSelf: 'center', position: 'absolute', top: 160}}
          source={require('./bgCD.png')}/>
        <Animated.Image
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            alignSelf: 'center',
            position: 'absolute', 
            top: 205,
            transform: [{rotate: this.state.spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })}]
          }}
          source={{uri: musicInfo.cover}}/>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 50, justifyContent: 'space-around', bottom: -60}}>
                
                </View>
            <View style={styles.progressStyle}>
            <Text style={{width: 35, fontSize: 13, color: "#FF69B4", marginLeft: 5}}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
            <Slider
              style={styles.slider}
              value={this.state.slideValue}
              maximumValue={this.state.duration}
              minimumTrackTintColor='antiquewhite'
              maximumTrackTintColor='aqua'
              thumbTintColor='skyblue'
              step={1}
              onValueChange={value => this.setState({currentTime: value})}
              onSlidingComplete={this._seekHandler}
            />
            <View style={{width: 35, alignItems: 'flex-end', marginRight: 5}}>
              <Text style={{fontSize: 13, color:"#FF69B4"}}>{this.formatMediaTime(Math.floor(this.state.duration))}</Text>
            </View>
          </View>
          
            <View style={styles.toolBar}>

            <View style={styles.cdStyle}>
                <Video source={{uri: musicInfo.url}} 
                        ref={ref=>{this.player=ref}}
                        paused={this.state.paused}
                        playInBackground={true}
                        onLoadStart={this.loadStart}
                        onLoad={data => this.setDuration(data)}
                        onProgress={(data) => this.setTime(data)}
                        onEnd={this._endHandler}
                        onError={(data) => this.videoError(data)}
                        onBuffer={this.onBuffer}
                        onTimedMetadata={this.onTimedMetadata}/>
                <TouchableOpacity onPress={() => this.preSong(this.state.currentIndex - 1)}>
                    <AntDesign name="banckward" size={25} color="skyblue" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this._playcontorller}>
                    <AntDesign name={`${this.state.playIcon}`} size={50} color="skyblue"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.nextSong(this.state.currentIndex + 1)}>
                    <AntDesign name={'forward'} size={25} color="skyblue"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{width: 50, alignItems: 'flex-end', marginRight: 5, marginTop:10}}
            >
              <AntDesign name={'bars'} size={25} color='skyblue'/>
            </TouchableOpacity>
            </View>

            </View>
        </View>
        </View>

    ) 
    }

}


const styles = StyleSheet.create({
   
      bgContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: deviceInfo.deviceHeight,
        width: deviceInfo.deviceWidth
      },
      button: {
        width:65,
        padding:15,
        borderRadius:70,
        marginTop:20,
        margin:6,
        alignContent:"flex-start",
        backgroundColor: 'aqua'
      }, navBarStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: deviceInfo.deviceWidth,
        height: 64,
        borderWidth: 0.5,
        borderColor: 'gray'
      },
      navBarContent: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
      },
      title: {
        color: '#FF69B4',
        fontSize: 18
      },
      subTitle: {
        color: 'antiquewhite',
        fontSize: 11,
        marginTop: 5
      },
      djCard: {
        width: 270,
        height: 270,
        marginTop: 155,
        borderColor: 'gray',
        borderWidth: 10,
        borderRadius: 190,
        alignSelf: 'center',
        opacity: 0.2
      },
      playerStyle: {
        position: 'absolute',
        width: deviceInfo.deviceWidth,
      },
      progressStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 150
      },
      slider: {
        flex: 1,
        marginHorizontal: 5,
      },
      toolBar: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 30,
        marginVertical: 50
      },
      cdStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
})
export {Home}
