import { View, Text, StatusBar } from 'react-native'
import React, { Component, useEffect } from 'react'
import { AudioContext } from '../context/AudioProvider'
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import { Dimensions } from 'react-native'
import VideoListItem from '../videocomponents/VideoListItem'
import OptionComponent from '../videocomponents/OptionComponent'
import { Audio } from 'expo-av'
import { pause, play, playPause, resume, selectAudio } from '../context/AudioController'
import { storeAudioForNextOpening } from '../context/Helper'
import Filters from '../../../components/Home/Filters'
import BottomTab from '../../../components/Home/BottomTab'
import { SafeAreaView } from 'react-native-safe-area-context'



export class VideoList extends Component {

  static contextType = AudioContext

  constructor(props) {
    super(props)
    this.state = {
      optionModalVisible: false,
    }
    this.currentItem = {}
  }

  layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
    switch (type) {
      case 'audio':
        dim.width = Dimensions.get('window').width
        dim.height = 70;
        break;
      default:
        dim.height = 0
        dim.width = 0
    }
  })

  // onPlaybackStatusUpdate = async (playbackStatus) => {

  //   if (playbackStatus?.isLoaded && playbackStatus.isPlaying) {
  //     this.context.updateState(this.context, {
  //       playbackPosition: playbackStatus.positionMillis,
  //       playbackDuration: playbackStatus.durationMillis
  //     })
  //   }

  //   if (playbackStatus.didJustFinish) {
  //     let nextAudioIndex = this.context.activeListIcon + 1
  //     // there  is no next audio to play
  //     if (nextAudioIndex >= this.context.totalCount) {
  //       nextAudioIndex = 0;
  //     }
  //     const audio = this.context.audioFiles[nextAudioIndex]
  //     const status = await selectAudio(this.context.playbackObj, audio.uri)
  //     this.context.updateState(this.context, { soundObj: status, currentaudio: audio, isPlaying: true, activeListIcon: nextAudioIndex })
  //     await storeAudioForNextOpening(audio, nextAudioIndex)
  //   }
  // }

  handleAudioPress = async (item) => {

    await playPause(item, this.context)

    // const { playbackObj, soundObj, currentaudio, updateState, audioFiles } = this.context

    // // playing audio for first time
    // if (soundObj === null) {
    //   const index = audioFiles.indexOf(item)
    //   const playBackObject = new Audio.Sound()
    //   const status = await play(playBackObject, item.uri)
    //   updateState(this.context, { playbackObj: playBackObject, soundObj: status, currentaudio: item, isPlaying: true, activeListIcon: index })
    //   playBackObject.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);
    //   return storeAudioForNextOpening(item, index)
    // }

    // // pause 
    // if (soundObj.isLoaded && soundObj.isPlaying && currentaudio.id === item.id) {
    //   const status = await pause(playbackObj)
    //   return updateState(this.context, { soundObj: status, isPlaying: false })
    // }

    // // resume 
    // if (soundObj.isLoaded && !soundObj.isPlaying && currentaudio.id === item.id) {
    //   const status = await resume(playbackObj)
    //   return updateState(this.context, { soundObj: status, isPlaying: true })
    // }

    // // Replay
    // // if(playbackStatus.didJustFinish && currentaudio.id === item.id){
    // //   const index = audioFiles.indexOf(item)
    // //   const playBackObject = new Audio.Sound()
    // //   const status = await play(playBackObject, item.uri)
    // //   updateState(this.context, { playbackObj: playBackObject, soundObj: status, currentaudio: item, isPlaying: true, activeListIcon: index })
    // //   playBackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    // //   return storeAudioForNextOpening(item, index)
    // // }

    // // select Diff audio
    // if (soundObj.isLoaded && currentaudio !== item.id) {
    //   const index = audioFiles.indexOf(item)
    //   const status = await selectAudio(playbackObj, item.uri)
    //   updateState(this.context, { currentaudio: item, soundObj: status, isPlaying: true, activeListIcon: index })
    //   return storeAudioForNextOpening(item, index)
    // }

  }

  componentDidMount() {
    this.context.loadPreviousAudio()
  }

  rowRenderer = (type, item, index, extendedState) => {
    // const { isPlaying } = this.context
    // console.log(item);
    return <VideoListItem
      onOptionPress={() => {
        this.setState({ ...this.state, optionModalVisible: true })
        this.currentItem = item
      }}
      isPlaying={extendedState.isPlaying}
      onPlayPress={() => this.handleAudioPress(item)}
      activeListIcon={this.context.activeListIcon === index}
      title={item.filename}
      duration={item.duration}
      currentaudio={this.context.currentaudio}
    />
  };

  Icons = [
    {
      name: 'Bell',
      ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGLu18tTyT1C-ePq6e7jCVdAu1TRTrZQnxoxSNqGBKBJxIut64ClOlvsdRtujfmydnqMg&usqp=CAU',
    },
    {
      name: 'Recent',
      ImageUrl: 'https://images.vexels.com/media/users/3/131904/isolated/preview/314ac7a195e5759f2cfadde070a92cc7-reloading-timer-clock-icon.png',
    },
    {
      name: 'Setting',
      ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnqflz-CoiW_5308w4BVUsaxRbwcb2a6xa2E4qT6MOnB8YzzkpZ21tVQ8JhOnnWDWDTQ&usqp=CAU',
    },
  ]


  render() {
    return (
      <>
        <AudioContext.Consumer>
          {({ dataProvider, isPlaying }) => {
            if (!dataProvider._data.length) return null;
            return (
              <SafeAreaView className={this.state.optionModalVisible ? ' bg-slate-900 h-full w-full' : ' bg-black h-full w-full'}>
                <StatusBar hidden={false} barStyle='light-content' />
                <View className='h-full w-full'>
                  <View>
                    <Text className='text-white text-2xl font-bold ml-4 mt-4 mb-2'>MUZECA</Text>
                  </View>

                  <View className='mb-5'>
                    <Filters />
                  </View>

                  {/* <View className='h-full mb-32'> */}
                  <RecyclerListView
                    style={{}}
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                    extendedState={{ isPlaying }}
                  />
                  {/* </View> */}

                  <OptionComponent
                    currentItem={this.currentItem}
                    visible={this.state.optionModalVisible}
                    onClose={() => this.setState({ ...this.state, optionModalVisible: false })}
                    onPlayPress={() => { }}
                    onAddPlayList={() => { }}
                  />
                </View>
                  <BottomTab />
              </SafeAreaView>
            )
          }}
        </AudioContext.Consumer>
      </>
    )
  }
}

export default VideoList
