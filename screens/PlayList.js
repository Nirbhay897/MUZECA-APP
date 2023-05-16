import { View, Text, Image, TouchableHighlight, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import BottomTab from '../components/Home/BottomTab'
import Recommend from '../components/PlayList/Recommend'
import {
    RefreshControl,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const PlayList = ({route}) => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
    
    return (
        <SafeAreaView className='bg-black h-full w-full'>
             <StatusBar 
      className='bg-black'
      barStyle='dark-content'
      />
            <ScrollView>
            <View className='flex-row justify-between mt-1'>

                <View>
                    {/* back icon */}
                </View>

                <View >
                    <Image
                        source={{
                            // uri: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752',
                            uri: route.params.paramKey.imageurl
                        }}
                        className='h-52 w-52 object-contain rounded-lg'
                    />
                </View>

                <View className='mr-4'>
                    <TouchableOpacity onPress={() => { }}>
                        <Text className='font-bold text-white text-2xl'>...</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className='ml-4 mt-6'>
                <Text className='text-2xl text-white font-bold'>{route.params.paramKey.title}</Text>
            </View>

            <View className='flex-row justify-between'>
                <View className='ml-4 mt-1 flex-row  items-center'>
                    <View>
                        <Image
                            source={{
                                uri: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752'
                            }}
                            className='h-7 w-7 rounded-full mr-2'
                        />
                    </View>

                    <TouchableOpacity>
                        <Text className='text-l text-white font-semibold'>Nirbhay Gupta</Text>
                    </TouchableOpacity>

                </View>

                <View className='mr-4'>
                    <TouchableOpacity onPress={() => { }}>
                        <Image
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfWbB640lxeD4tVh_FpmeWaHO094naSHz0bw&usqp=CAU'
                                
                            }}
                            className='w-5 h-5'
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='flex-row justify-between'>
                <View className='items-center mt-4 '>
                    {/* <Button className='bg-white' title='Create'   /> */}
                    <TouchableOpacity className='bg-red-500 border rounded-full p-2 w-40 items-center ml-4' >
                        <Text className='font-semibold text-lg text-white'>PLAY</Text>
                    </TouchableOpacity>
                </View>

                <View className='items-center mt-4 '>
                    {/* <Button className='bg-white' title='Create'   /> */}
                    <TouchableOpacity className='bg-black border-white border rounded-full p-2 w-40 items-center mr-4' >
                        <Text className='font-semibold text-lg text-white'>SHUFFLE</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View className='flex items-center mt-12'>
                <Text className='text-sm font-semibold text-white items-center justify-center'>Start adding songs to the playlist</Text>
                <View className='items-center mt-2'>
                    {/* <Button className='bg-white' title='Create'   /> */}
                    <TouchableOpacity onPress={()=>{navigation.navigate('AddSong')}} className='bg-red-500 border rounded-full p-2 w-28 items-center' >
                        <Text className='font-medium text-sm text-white'>Add Songs</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View className='flex ml-2 mt-8'>
                <Text className='text-2xl text-white font-bold'>More recommendations</Text>
                <Recommend />
                {/* recommendation component */}
            </View>

            <View className='items-center mt-4 '>
                    <TouchableOpacity   
                    refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                          } 
                          onPress={()=>{}} className='bg-black border-white border rounded-full p-0.5 w-20 items-center mb-20' >
                        <Text className='font-medium text-sm text-white'>Refresh</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
         <BottomTab />
        </SafeAreaView>
    )
}

export default PlayList