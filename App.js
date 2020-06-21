import React, { Component } from 'react'
import { Text, View , Modal , Button, StyleSheet, Image, ScrollView, ViewPagerAndroid} from 'react-native'
import { Home } from './func'
import { Music, FAQ } from './music'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, TouchableOpacity, TouchableHighlight  } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPager from '@react-native-community/viewpager';
import Feather from "react-native-vector-icons/Feather" 
import AntDesign from 'react-native-vector-icons/AntDesign';


const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const songs =require('./musicList.json')
export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      visible:true,
      currentTime: 0.00,
      currentIndex: 0
    }
  }
  _hide=()=>{
    this.setState({visible:false})  
  }
  render() {
    return (
        <NavigationContainer>
            <Modal visible={this.state.visible}>
              <ViewPager style={{flex:1}} initialPage={0}>
                <View key="1">
                <Image
            source={{uri: 'http://123.57.91.61/alum%20cover/timg%20(4).jpg'}}
            style={{flex:1}}
          />
                </View>
                <View key="2" style={{backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:50, color:'white'}}>   就这？</Text>
                <Button title="进入" onPress={this._hide} style={style.button}/>
                </View>
              </ViewPager>

            </Modal>

            <Drawer.Navigator>
              <Drawer.Screen name="主页" component={Main}/>
              <Drawer.Screen name="制作人员" component={Settings}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
  }
}

class Main extends React.Component{
  render(){
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Music') {
            iconName = focused ? 'music' : 'music';
          }else if (route.name === 'FAQ') {
            iconName = focused ? 'info' : 'info';
          }
          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'skyblue',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Music" component={Music}/>
        <Tab.Screen name="FAQ" component={FAQ}/>
      </Tab.Navigator>
    )
  }
}

class Settings extends React.Component{
  render(){
    return (
      <ScrollView>
        <Image 
          source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3516689169,1068601019&fm=26&gp=0.jpg'}}
          style={{width:400, height:420}}
        />
        <Text style={{ color:'green',fontSize:30, textAlign: 'center' }}>制作成员(第五组)</Text>
        <Text style={{ color:'grey',fontSize:40, textAlign: 'center' }}>骆铭，施孟宇，苏杨，史鑫祺</Text>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container:{
    marginTop:300,
    borderWidth:1,
    borderRadius:6,
    flexDirection:"row-reverse",
    justifyContent:"flex-end",
    margin:4
},
  button: {
    padding:10,
    borderRadius:6,
    marginTop:20,
    marginLeft:10,
    margin:6,
    alignContent:"flex-end",
    backgroundColor: 'black',
    
  }
})