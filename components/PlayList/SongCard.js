import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SongScreen from './SongSrc'
// import { Icon } from 'react-native-vector-icons/Icon'

const SongCard = ({title, index, caption, imgurl, songUrl, setModal}) => {
    const navigation = useNavigation();
   
  return (
        <TouchableOpacity
         onPress={
            ()=>{
                // navigation.navigate('SongScreen', {paramKey: {title, caption, imgurl, songUrl}})
                setModal(true);
            }}
         >
    <View className='flex-row items-center m-2 justify-between' key={index}>

        <View className='flex-row'>
        <View className='mr-2'>
            <Image 
            source={{
                uri: imgurl,
            }}
            className='w-12 h-12 object-contain rounded-md'/>
        </View>

        <View>
            <Text className='text-white font-medium text-lg'>{title}</Text>
            <Text className='text-gray-600 font-medium text-sm'>{caption}</Text>
        </View>  
        </View>

        <View>
            {/* <Icon name='stepbackward'/> */}
        </View>


    </View>
        </TouchableOpacity>
  )
}

export default SongCard