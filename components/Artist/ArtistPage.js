import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { Artist } from '../../data/ArtistData'
import BottomTab from '../Home/BottomTab'
import ArtistCompo from './ArtistCompo'
import Filters from '../Home/Filters'



const ArtistPage = () => {
  return (
    <SafeAreaView className='bg-black w-full h-full'>
      <StatusBar hidden={false} barStyle='light-content' />
      <Text className='text-white font-bold text-2xl mt-4 mx-2'>Your Artists</Text>
      <Filters />
    <ScrollView className='mt-5 mb-14'>  
    {
        Artist.map((art, index)=>(
            <ArtistCompo key={index} Aname={art.name} AimgUrl={art.imgUrl}/>
        ))
    }
    </ScrollView>
    <BottomTab />
    </SafeAreaView>

  )
}

export default ArtistPage