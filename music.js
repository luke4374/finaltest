import React, { Component } from 'react'
import { Text, View , Button, StyleSheet, Image, Dimensions,ScrollView} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from "react-native-vector-icons/AntDesign" 
import Video from 'react-native-video';
import { FlatList, TouchableOpacity, TouchableHighlight  } from 'react-native-gesture-handler';

const Stack = createStackNavigator()
class Music extends React.Component {
    render(){
        return(
        <Stack.Navigator>
            <Stack.Screen name="热曲榜单TOP10" component={ItemList}/>
        </Stack.Navigator>
     )  
    }
     
}



class FAQ extends React.Component {

      render() {
        return(
            <ScrollView>
                <View style={{backgroundColor:'grey'}}>
                <Text style={{ color:'white',fontSize:30, textAlign: 'center' }}>问题与建议</Text>
                <Text style={{ color:'black',fontSize:30, textAlign: 'auto' }}>1.这个APP需要付费吗？</Text>
                <Text style={{ color:'white',fontSize:30, textAlign: 'auto' }}>A:本APP完全不收取任何费用的。</Text>
                <Text style={{ color:'black',fontSize:30, textAlign: 'auto' }}>2.制作这个APP的初衷是什么呢？</Text>
                <Text style={{ color:'white',fontSize:30, textAlign: 'auto' }}>A:为北城的大家提供自己的音乐平台。</Text>
                <Text style={{ color:'black',fontSize:30, textAlign: 'auto' }}>3.与其他音乐平台的相比，有何优势？</Text>
                <Text style={{ color:'white',fontSize:30, textAlign: 'auto' }}>A:我们作为北京城市学院的音乐平台，更加贴近大家的生活</Text>
                <Text style={{ color:'black',fontSize:30, textAlign: 'auto' }}>4.目前为止用户体验如何？</Text>
                <Text style={{ color:'white',fontSize:30, textAlign: 'auto' }}>A:用户们的普遍反映还是ok的。</Text>
                <Text style={{ color:'black',fontSize:30, textAlign: 'auto' }}>5.APP有何需要进步的地方吗？</Text>
                <Text style={{ color:'white',fontSize:30, textAlign: 'auto' }}>A:目前使用我们APP的用户数目较少。</Text>
                </View>
                <Button
           title="查看更多"
           color='pink'/>
            </ScrollView>
    )
      }
    }
class ItemList extends React.Component {
    constructor(props){
        super(props)
        this.max=4
        this.state={data:[],albums:[]}
    }

    componentDidMount(){
        fetch("http://123.57.91.61:8085/album/Allmusic",{method:"GET"})
        .then(resp=>resp.json())
        .then(albums=>{
            this.setState({albums:albums})
        })
    }

    _renderItem=({item})=>{
        return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.container} onPress={this._goDetails}>
                <View style={styles.Lone}>
                  <Text style={{color:'red',fontSize:20}}>{item.id}</Text>
                </View>
                <View>
                  <Image style={styles.Ltwo} source={{uri:item.cover}} />
                </View>
                <View style={styles.Rthree}>
                  <Text style={{color:'blue'}}>{item.name}</Text>
                </View>
                </TouchableOpacity>   
                <View style={styles.Rfour}>
                  <Text style={{color:'red'}}>{item.singer}</Text>
                </View>
            </View>
        )
    }
    _ItemSeparatorComponent=()=>{
        return <View style={{height:1,backgroundColor:"gray"}}></View>
      }

    _showDetail =()=>{
        this.props.navigation.navigate("歌曲详情")
    }
    render(){
        return(
            <View>
                <FlatList 
                    keyExtractor={({item,index})=>index}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={this.state.albums} 
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}
function ItemDetail(){
    return(
        <Text>ItemDetail</Text>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:3,
        width:'100%'
      },
      Lone:{
        width:25,
        height:70,
        flexDirection:'row'
      },
      Ltwo:{
        flexDirection:'column',
        width:80,
        height:80
      },
      Rthree:{
        flexDirection:'row',
        width:'60%',
        height:80,
        justifyContent:'center',
        alignSelf:'center',
        fontSize:16,
        alignItems:'center',
        textAlign:"center",
        textAlignVertical:'center'
      },
      Rfour:{
        marginRight:-38,
        alignSelf:'center',
        height:20,
        flexDirection:'row-reverse'
      },
})

export { Music, FAQ}