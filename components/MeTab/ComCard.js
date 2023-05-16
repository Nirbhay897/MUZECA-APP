import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ComCard = ({imageurl, title, caption, index}) => {
  const navigation = useNavigation();
  return (
        <TouchableOpacity
        onPress={()=>{
          if(index === 1){
            navigation.navigate('ArtistPage')
          } else{
            navigation.navigate('PlayList', {paramKey: {imageurl, title, caption}})
          }
        }}
         className='flex-row items-center ml-4 w-full h-18 mt-4' >
        <View key={index}>
            <Image
            source={{
                uri: imageurl
            }}
            className={index === 1 ?'w-16 h-16 rounded-full' : 'w-14 h-14 rounded-lg object-contain'}
             />
        </View>
        <View>
      <Text numberOfLines={1} className='text-white text-lg font-bold ml-2'>{title}</Text>
      <Text className='text-gray-600 text-sm ml-2'>{caption}</Text>
        </View>

        </TouchableOpacity>
  )
}

export default ComCard