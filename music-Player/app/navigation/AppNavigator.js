import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import VideoList from '../videoscreens/VideoList'
import VideoPlayer from '../videoscreens/VideoPlayer'
import VideoPlayList from '../videoscreens/VideoPlayList'
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// import AudioList from '../screenmm/AudioList'


const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator  className='bg-black'>

       <Tab.Screen name='AudioList'  component={VideoList} options={{
        tabBarIcon: ()=>{
          return (<Ionicons name="headset" size={30} color="black" />)
        },
        presentation: "fullScreenModal", headerShown: false
       }}/>
       <Tab.Screen name='Player' component={VideoPlayer} options={{
        tabBarIcon: ()=>{
          return (<Foundation name="record" size={35} color="black" />)
        },
        presentation: "fullScreenModal", headerShown: false
       }}/>
       <Tab.Screen name='PlayList' component={VideoPlayList} options={{
        tabBarIcon: ()=>{
          return (<MaterialCommunityIcons name="playlist-music" size={35} color="black" />)
        },
        presentation: "fullScreenModal", headerShown: false
       }}/>
    </Tab.Navigator>
  )

}

export default AppNavigator