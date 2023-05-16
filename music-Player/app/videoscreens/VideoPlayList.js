import { View, Text, StatusBar } from 'react-native' 
import React from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const VideoPlayList = () => {
  return (
    <>
    <SafeAreaView className='bg-black flex-1'>
       <StatusBar hidden={false} barStyle='light-content'/>
    <ScrollView className='bg-black flex-1'>
      <TouchableOpacity className='mx-4 mt-3 rounded-lg bg-gray-500 p-1'>
        <Text className='text-white font-bold text-2xl'>Favorite</Text>
        <Text className='text-gray-400 font-medium text-sm'>0 songs</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{}} className='bg-gray-600 border  border-black rounded-full items-center justify-center mt-9 ml-3 h-10 w-36'>
        <Text className='text-md font-bold'>+ Add New Playlist</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default VideoPlayList