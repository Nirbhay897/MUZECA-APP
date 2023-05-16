import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import {Recom} from '../../data/Recomdata'
import SongCard from './SongCard'
import Plusicon from './Plusicon'
import { songs } from '../../songs/data'

const Recommend = () => {
  return (
   <ScrollView>
        {songs.map((r, index)=>(
            <View key={index} className='flex-row justify-between items-center'>
                <SongCard title={r.title} caption={r.artist} imgurl={r.artwork} songUrl ={r.url} />
                <Plusicon />
            </View>
        ))}
   </ScrollView>
  )
}

export default Recommend