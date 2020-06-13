import React, { Component } from 'react'
import { Text, View , Modal , Button, StyleSheet} from 'react-native'
import { Home, Buy, FAQ } from './func'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPager from '@react-native-community/viewpager';
import Feather from "react-native-vector-icons/Feather" 
import Ionicons from 'react-native-vector-icons/Ionicons';


const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={visible:false}
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
                    <Text>First page aaa</Text>
                </View>
                <View key="2">
                    <Text>Second page aaa</Text>
                    <Button title="close" onPress={this._hide}/>
                </View>
              </ViewPager>
            </Modal>

            <Drawer.Navigator>
              <Drawer.Screen name="Main" component={Main}/>
              <Drawer.Screen name="Settings" component={Settings}/>
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
          } else if (route.name === 'Buy') {
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
        <Tab.Screen name="Buy" component={Buy}/>
        <Tab.Screen name="FAQ" component={FAQ}/>
      </Tab.Navigator>
    )
  }
}

class Settings extends React.Component{
  render(){
    return <Text>Settings</Text>
  }
}

const style = StyleSheet.create({

})