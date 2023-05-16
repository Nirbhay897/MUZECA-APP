import { View, Text } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';



const getFirstLetter = (filename) => filename[0];

const convertTime = minutes =>{
  if(minutes){
    const hrs = minutes/60;
    const minute = hrs.toString().split('.')[0]
    const percent = parseInt(hrs.toString().split('.')[1].slice(0,2))
    const sec = Math.ceil((60* percent) / 100)

    if(parseInt(minute) < 10 && sec < 10){
      return `0${minute}:0${sec}`
    }
    if(parseInt(minute) < 10 ){
      return `0${minute}:${sec}`
    }
    if(sec < 10){
      return `${minute}:0${sec}`
    }
    return `${minute}:0${sec}`
  }
}

const renderPlayPauseIcon = (isPlaying) =>{
  if(isPlaying){
    return <Entypo name="controller-paus" size={24} color="black" />
  }
  else{
    return  <Entypo name="controller-play" size={24} color="black" />
  }
}


const VideoListItem = ({title, duration,onOptionPress,currentaudio, onPlayPress, isPlaying, activeListIcon}) => {
  return (
    <>
      <SafeAreaView className='flex-row justify-between items-center mx-5 '>

        <TouchableOpacity className='' onPress={()=>onPlayPress()}>
          <View className='flex-row  items-center  justify-center'>

            <View className=' h-12 w-12 items-center mt-4 justify-center border border-white bg-red-200 rounded-full'>
              <Text className='text-3xl font-extrabold '>{
             
             activeListIcon ? renderPlayPauseIcon(isPlaying) :  getFirstLetter(title)
              }</Text>
            </View>

            <View className='ml-4'>
              <Text numberOfLines={1} className={activeListIcon ? 'text-red-300 font-semibold w-52 text-lg' :'text-white font-semibold w-52 text-lg' }>{title}</Text>
              <Text className='font-normal text-slate-500 text-xs'>{convertTime(duration)}</Text>
            </View>

          </View>
        </TouchableOpacity>

        <TouchableOpacity className='p-2'>
          <View className='mt-4'>
            <Entypo onPress={()=>{onOptionPress()}} name="dots-three-vertical" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <View className='w-full h-0.5 opacity-5 align-middle mt-3' style={{ backgroundColor: '#333' }} />
    </>
  )
}

export default VideoListItem