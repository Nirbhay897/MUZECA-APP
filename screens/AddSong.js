import { View, Text, ScrollView, TextInput, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from '../components/Home/BottomTab'
import { Recom} from '../data/Recomdata'
import SongCard from '../components/PlayList/SongCard'
import Plusicon from '../components/PlayList/Plusicon'
import { songs } from '../songs/data'


const AddSong = () => {
    return (
        <>
        <SafeAreaView className='bg-gray-500 flex-1 h-full w-full'>
        <StatusBar 
      backgroundColor=' rgb(107, 114, 128)'
      barStyle='default'
      />
            <View className='items-center mt-2'>
                <Text className='text-white font-bold text-xl'>Add to your playlist</Text>
            </View>

            <View className='mt-6 h-12 w-full '>
                <TextInput placeholder='Search Songs' className='bg-white border-solid rounded-md mr-3 ml-3 p-2' />
            </View>



            <View className=' bg-black mb-44 rounded-lg mx-6 mt-3'>
                <View >
                    <Text className='text-white font-bold text-xl m-3'>Suggested</Text>
                </View>

                    <ScrollView>
                <View>
                        {songs.map((r, index) => (
                            <View key={index} className='flex-row justify-between items-center'>
                                <SongCard key={index} title={r.title} caption={r.artist} imgurl={r.artwork} index={index} />
                                <Plusicon />
                            </View>
                        ))}
                </View>
                    </ScrollView>

            </View>

            {/* <BottomTab /> */}
        </SafeAreaView>
        </>
    )
}

export default AddSong