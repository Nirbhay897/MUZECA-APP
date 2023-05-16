import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const data =[
    {
        title:'Artists',

    },
    {
        title:'Playlists',

    },
    {
        title:'Recommended',

    },
    {
        title:'Today',

    },
]

const Filters = () => {
    const navigation = useNavigation()
    const handlePress =(index) =>{
        if(index === 1){
            navigation.navigate('VideoPlayList')
        }
        if(index === 0){
            navigation.navigate('ArtistPage')
        }
        if(index === 2){
            navigation.navigate('AddSong')
        }
    }
  return (
    <View>
   <ScrollView className='mt-5' horizontal showsHorizontalScrollIndicator={false}>
        {data.map((dat, index)=>(
            <TouchableOpacity key={index} className='ml-2' onPress={()=>{handlePress(index)}}>
                <Text className='text-white bg-zinc-600 border-solid rounded-3xl mr-2 text-md font-semibold p-2' key={index}>{dat.title}</Text>
            </TouchableOpacity>
        ))}
   </ScrollView>

   {/* <Divider width={1} orientation='vertical' /> */}

    </View>

  )
}

export default Filters