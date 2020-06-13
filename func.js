import React, { Component } from 'react'
import { Text, View , Button} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from "react-native-vector-icons/AntDesign" 

const Stack = createStackNavigator()
function Home (){
    return(
        <View>
            <AntDesign name="forward" size={50} color="skyblue"/>
            <Text>Damn it</Text>
        </View>
    ) 
}

function Buy() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="ItemList" component={ItemList}/>
            <Stack.Screen name="ItemDetail" component={ItemDetail}/>
            
        </Stack.Navigator>
     )       
}

function FAQ(){
    return(
        <Text>Third</Text>
    ) 
}


class ItemList extends React.Component {
    _showDetail =()=>{
        this.props.navigation.navigate("ItemDetail")
    }
    render(){
        return(
            <View>
                <Text>ItemList</Text>
                <Button title="Go Detail" onPress={this._showDetail}/>
            </View>
        )
    }
}
function ItemDetail(){
    return(
        <Text>ItemDetail</Text>
    ) 
}
export {Home, Buy, FAQ}
