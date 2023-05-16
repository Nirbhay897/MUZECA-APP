import { View, Text, Image, TouchableHighlight, TouchableOpacity, StatusBar, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slider } from 'react-native-elements'
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { AudioContext } from '../context/AudioProvider'
import { changeAudio, pause, play, playPause, resume, selectAudio } from '../context/AudioController'
import { convertTime, storeAudioForNextOpening } from '../context/Helper'

const VideoPlayer = ({ route }) => {
  const [currentPosition,setCurrentPosition] = useState(0)
  const [repeat, setRepeat] = useState(false)
  const context = useContext(AudioContext)
  const { playbackPosition, playbackDuration } = context;

  const handlePlayPause = async () => {

    await playPause(context.currentaudio , context)


    // // play
    // if (context.soundObj === null) {
    //   const item = context.currentaudio;
    //   const status = await play(context.playbackObj, item.uri)
    //   context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
    //   return context.updateState(context, { soundObj: status, currentaudio: item, isPlaying: true, activeListIcon: context.activeListIcon })
    // }
    // // pause

    // if (context.soundObj && context.soundObj.isPlaying) {
    //   const status = await pause(context.playbackObj)
    //   return context.updateState(context, { soundObj: status, isPlaying: false })
    // }
    // // resume
    // if (context.soundObj && !context.soundObj.isPlaying) {
    //   const status = await resume(context.playbackObj)
    //   return context.updateState(context, { soundObj: status, isPlaying: true })
    // }
    // // Next audio
    // if (soundObj.isLoaded && currentaudio !== item.id) {
    //   const item = context.currentaudio;
    //   const status = await selectAudio(context.playbackObj, item.uri)
    //   return updateState(context, { currentaudio: item, soundObj: status, isPlaying: true, activeListIcon: context.activeListIcon })

    // }
  }

 const handleNext = async () => {

    await changeAudio(context, 'next')

    // const { isLoaded } = await context.playbackObj.getStatusAsync()
    // const isLastAudio = context.activeListIcon + 1 === context.totalCount;
    // let audio = context.audioFiles[context.activeListIcon + 1]
    // let index;
    // let status;


    // if (!isLastAudio && !isLoaded) {
    //   index = context.activeListIcon + 1;
    //   status = await play(context.playbackObj, audio.uri)
    // }

    // if (!isLastAudio && isLoaded) {
    //   index = context.activeListIcon + 1;
    //   status = await selectAudio(context.playbackObj, audio.uri)
    // }

    // if (isLastAudio) {
    //   index = 0;
    //   audio = context.audioFiles[index]
    //   if(isLoaded){
    //     status = await selectAudio(context.playbackObj, audio.uri)
    //   } else{
    //     status = await play(context.playbackObj, audio.uri)
    //   }
    // }
    // context.updateState(context, { soundObj: status, currentaudio: audio, isPlaying: true, activeListIcon: index, playbackPosition:null, playbackDuration: null })
    // storeAudioForNextOpening(audio, index);
  }

 const handlePrev = async () => {

    await changeAudio(context, 'previous')

    // const { isLoaded } = await context.playbackObj.getStatusAsync()
    // const isFirstAudio = context.activeListIcon <=0
    // let audio = context.audioFiles[context.activeListIcon - 1]
    // let index;
    // let status;

    // if (!isFirstAudio && !isLoaded) {
    //   index = context.activeListIcon - 1;
    //   status = await play(context.playbackObj, audio.uri)
    // }

    // if (!isFirstAudio && isLoaded) {
    //   index = context.activeListIcon - 1;
    //   status = await selectAudio(context.playbackObj, audio.uri)
    // }

    // if (isFirstAudio) {
    //   index = context.totalCount-1;
    //   audio = context.audioFiles[index]
    //   if(isLoaded){
    //     status = await selectAudio(context.playbackObj, audio.uri)
    //   } else{
    //     status = await play(context.playbackObj, audio.uri)
    //   }
    // }
    // context.updateState(context, { soundObj: status, currentaudio: audio, isPlaying: true, activeListIcon: index,playbackPosition:null, playbackDuration: null  })
    // storeAudioForNextOpening(audio, index);
  }

 const renderCurrentTime = () =>{

  if(context.playbackPosition === null){
    return '00:00'
  }else{
    return convertTime(context.playbackPosition / 1000)
  }
  }

  const calculateSeekBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration
    }
    return 0
  }


  useEffect(() => {
    context.loadPreviousAudio()
  }, [])

  if (!context.currentaudio){
    return null
  } 
    

  return (
    <>
      <SafeAreaView className='bg-gray-700 flex-1'>
      <StatusBar backgroundColor='rgb(55, 65, 81)' barStyle='light-content' />
        <ScrollView>
          <View className='flex-row justify-between items-center'>

            <View className=' ml-2'>
              <TouchableOpacity className='flex-row items-center ml-4'>
                <Text className='text-white font-bold text-md'>For you</Text>
                <Entypo name='chevron-thin-down' size={20} color='white' />
              </TouchableOpacity>
            </View>

            <View className='mt-2 items-center'>
              {/* <Text className='text-white font-medium text-xs'>PLAYING FROM YOUR LIBRARY{ }</Text> */}
              {/* <Text className='text-white font-bold text-sm'>Liked Songs</Text> */}
            </View>

            <View className='mr-4'>
              <TouchableOpacity>
                <Text className='text-white font-medium text-lg'> {`${context.activeListIcon + 1}/${context.totalCount}`} </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='justify-center items-center mt-20'>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqQ-FgOTHWsOCfw9GjWkn24_Q02GFRXf9Z6iSnmdfLQ&usqp=CAU&ec=48665699'
              }}
              className='h-72 w-72 object-cover rounded-lg'
            />
          </View>

          <View className='flex-row justify-between items-center m-2 mt-14 mx-8'>
            <View>
              <Text numberOfLines={1} className='text-white font-semibold text-xl w-60'>{context.currentaudio.filename}</Text>
              
              {/* <Text className='text-white font-semibold text-2xl'>{Recom[songIndex].name}</Text> */}
              {/* <Text className='text-white font-normal text-md'>{Recom[songIndex].caption}</Text> */}
            </View>

            <View>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                  }}
                  className='w-7 h-7 object-contain'
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className='mx-6'>

          <View className='flex-row justify-between mt-2 items-center'>
              <Text className='text-white font-normal text-md'>{ currentPosition ? currentPosition : renderCurrentTime()}</Text>
              <Text className='text-white font-normal text-md'>{convertTime(context.currentaudio.duration)}</Text>
              </View>

            <Slider
              minimumValue={0}
              maximumValue={1}
              onValueChange={(value)=>{
                  setCurrentPosition(
                    convertTime(value * context.currentaudio.duration)
                  )
              }}
              value={calculateSeekBar()}
              thumbStyle={{ width: 12, height: 12 }}
              thumbTintColor='#fff'
              minimumTrackTintColor='white'
              maximumTrackTintColor='gray'
              onSlidingStart={
                async()=>{
                  if(!context.isPlaying){
                    return
                  } 
                  try {
                    await pause(context.playbackObj)
                  } catch (error) {
                    console.log('====================================');
                    console.log(error.message);
                    console.log('====================================');
                  }
                }
              }
              onSlidingComplete={async (value) => {
                if(context.soundObj === null || !context.isPlaying){
                  return;
                }
                try {
                const status = await context.playbackObj.setPositionAsync(Math.floor(context.soundObj.durationMillis * value))
                 context.updateState(context, {soundObj:status, playbackPosition: status.positionMillis })
                 await resume(context.playbackObj)
                 setCurrentPosition(0)
                //  context.updateState(context, { soundObj: status, isPlaying: true})
                } catch (error) {
                  console.log('====================================');
                  console.log(error.message);
                  console.log('====================================');
                }
              }}
            />

          </View>

          <View className='flex-row justify-between items-center mx-4' >

            <TouchableOpacity onPress={() => {

            }}>
              {/* <Entypo name='shuffle' size={30} color='white'  /> */}
              <Ionicons name='shuffle' size={35} color='white' />
            </TouchableOpacity>



            <TouchableOpacity onPress={handlePrev}>
              <AntDesign name='stepbackward' size={35} color='white' />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause}>
              <AntDesign
                // onPress={()}
                name={context.isPlaying ? 'pause' : 'play'}
                size={50}
                color='white' />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext}>
              <AntDesign name='stepforward' size={35} color='white' />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setRepeat(true)
            }}>
              <MaterialCommunityIcons name={!repeat ? 'repeat-variant' : 'repeat-once'} size={35} color='white' />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default VideoPlayer