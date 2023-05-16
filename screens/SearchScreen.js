import { View, Text, SafeAreaView, TextInput, StatusBar } from 'react-native'

import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import BottomTab from '../components/Home/BottomTab'

const SearchScreen = () => {
  const [val, setVal] = useState('')
  return (
    <>
     <StatusBar 
      className='bg-black'
      barStyle='dark-content'
      />
     {/* <SafeAreaView className='bg-black h-full w-full'> */}
   <ScrollView className='bg-black h-full w-full'>
    <View className=''>
        <Text className='text-white text-3xl font-bold mt-9 ml-4'>
            Search
        </Text>
    </View>
        <View className='mt-3 h-12 w-full '>
            <TextInput defaultValue={val} onChangeText={newText => setVal(newText)} placeholder='Search Songs' className='bg-white border-solid rounded-md mr-3 ml-3 p-2'/>
        </View>
        <ScrollView>
    <View className='items-center mt-10'>
        <Text className='font-bold text-white text-xl'>Browse all</Text>
    </View>
   </ScrollView>
   </ScrollView>

  
   <BottomTab className='z-0'/>
   </>
    //  {/* </SafeAreaView> */}
  )
}

export default SearchScreen