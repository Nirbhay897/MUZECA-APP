import { View, Text, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import BottomTab from '../Home/BottomTab'

const SongScreen = () => {
  return (
    <SafeAreaView className='bg-gray-700 h-full'>
    <ScrollView>

      <View className='flex-row justify-between items-center'>

        <View className=' ml-2'>
          <TouchableOpacity className='flex-row items-center'>
          <Text className='text-white font-bold text-md'>For you</Text>
          <Image 
          source={{
            uri: 'https://w7.pngwing.com/pngs/459/709/png-transparent-arrow-computer-icons-fleche-angle-text-rectangle.png'
            // uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/arrow-computer--v1.png'
          }}
          className='ml-1 w-6 h-6'
          />
          </TouchableOpacity>
        </View>

        <View className='mt-2 items-center'>
          <Text className='text-white font-medium text-xs'>PLAYING FROM YOUR LIBRARY{}</Text>
          <Text className='text-white font-bold text-sm'>Liked Songs</Text>
        </View>

        <View className='mr-2'>
          {/* <Image 
          source={{
            uri:''
          }}
          className='w-7 h-7'
            /> */}
            <TouchableOpacity>
            <Text className='text-white font-extrabold text-3xl'>...</Text>
            </TouchableOpacity>
        </View>
      </View>

      <View className='items-center mt-20'>
        <Image
        source={{
          uri:'data:image/jpeg;base64,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'
          
        }}
        className='h-72 w-72 object-cover rounded-lg'
         />
      </View>

      <View className='flex-row justify-between items-center m-2 mt-14 mx-8'>
        <View>
          <Text className='text-white font-semibold text-2xl'>Demons</Text>
          <Text className='text-white font-normal text-md'>Imagine Dragon</Text>
        </View>

        <View>
          <TouchableOpacity>
          <Image
          source={{
            uri:'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
          }}
          className='w-7 h-7 object-contain'
           />
          </TouchableOpacity>
        </View>
      </View>

      <View>
            
      </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default SongScreen