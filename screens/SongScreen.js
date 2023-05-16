// import { View, Text, Image, TouchableOpacity, StatusBar, Animated } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import TrackPlayer from 'react-native-track-player'
// import { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
// import { ScrollView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Slider } from 'react-native-elements'
// import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
// import { Dimensions } from 'react-native';
// import { songs } from '../songs/data'



// const { width, height } = Dimensions.get('window');

// const setupPlayer = async () => {
//   try {
//     await TrackPlayer.setupPlayer();
//     await TrackPlayer.updateOptions({
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//         Capability.Stop,
//       ],
//     });
//     await TrackPlayer.add(songs);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const togglePlayBack = async playBackState => {
//   const currentTrack = await TrackPlayer.getActiveTrackIndex();
//   console.log(currentTrack, playBackState, State.Playing);
//   if (currentTrack != null) {
//     if (playBackState == State.Paused) {
//       await TrackPlayer.play();
//     } else {
//       await TrackPlayer.pause();
//     }
//   }
// };


// const SongScreen = async ({ route }) => {

//   const playBackState = usePlaybackState();
//   const progress = useProgress();

//   //   custom states
//   const [songIndex, setsongIndex] = useState(0);
//   const [repeatMode, setRepeatMode] = useState('off');
//   const [trackTitle, setTrackTitle] = useState();
//   const [trackArtist, setTrackArtist] = useState();
//   const [trackArtwork, setTrackArtwork] = useState();

//   // custom referecnces
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const songSlider = useRef(null);

//   //   changing the track on complete
//   useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
//     if (event.type === Event.PlaybackActiveTrackChanged && event.nextTrack !== null) {
//       const track = await TrackPlayer.getTrack(event.nextTrack);
//       const { title, artwork, artist } = track;
//       setTrackTitle(title);
//       setTrackArtist(artist);
//       setTrackArtwork(artwork);
//     }
//   });

//   const repeatIcon = () => {
//     if (repeatMode == 'off') {
//       return 'repeat-off';
//     }

//     if (repeatMode == 'track') {
//       return 'repeat-once';
//     }

//     if (repeatMode == 'repeat') {
//       return 'repeat';
//     }
//   };

//   const changeRepeatMode = () => {
//     if (repeatMode == 'off') {
//       TrackPlayer.setRepeatMode(RepeatMode.Track);
//       setRepeatMode('track');
//     }

//     if (repeatMode == 'track') {
//       TrackPlayer.setRepeatMode(RepeatMode.Queue);
//       setRepeatMode('repeat');
//     }

//     if (repeatMode == 'repeat') {
//       TrackPlayer.setRepeatMode(RepeatMode.Off);
//       setRepeatMode('off');
//     }
//   };

//   const skipTo = async trackId => {
//     await TrackPlayer.skip(trackId);
//   };

//   useEffect(() => {
//     setupPlayer();

//     scrollX.addListener(({ value }) => {
//         console.log(`ScrollX : ${value} | Device Width : ${width} `);

//       const index = Math.round(value / width);
//       skipTo(index);
//       setsongIndex(index);

//         console.log(`Index : ${index}`);
//     });

//     return () => {
//       scrollX.removeAllListeners();
//       TrackPlayer.destroy();
//     };
//   }, []);

//   const skipToNext = () => {
//     songSlider.current.scrollToOffset({
//       offset: (songIndex + 1) * width,
//     });
//   };

//   const skipToPrevious = () => {
//     songSlider.current.scrollToOffset({
//       offset: (songIndex - 1) * width,
//     });
//   };

//   const renderSongs = ({ item, index }) => {
//     return (
//       <Animated.View className='justify-center items-center w-screen'>
//         <View className=''>
//           <Image
//             source={trackArtwork}
//             className=' h-72 w-72 object-cover rounded-lg' />
//         </View>
//       </Animated.View>
//     )
//   }

//   return (
//     <SafeAreaView className='bg-gray-700 flex-1'>
//       <StatusBar
//         backgroundColor='rgb(55 65 81)'
//         className='bg-gray-700'
//         barStyle='light-content'
//       />
//       <ScrollView>

//         <View className='flex-row justify-between items-center'>

//           <View className=' ml-2'>
//             <TouchableOpacity className='flex-row items-center'>
//               <Text className='text-white font-bold text-md'>For you</Text>
//               <Entypo name='chevron-thin-down' size={20} color='white' />
//             </TouchableOpacity>
//           </View>

//           <View className='mt-2 items-center'>
//             <Text className='text-white font-medium text-xs'>PLAYING FROM YOUR LIBRARY{ }</Text>
//             <Text className='text-white font-bold text-sm'>Liked Songs</Text>
//           </View>

//           <View className='mr-2'>
//             <TouchableOpacity>
//               <Text className='text-white font-extrabold text-3xl'>...</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className='justify-center items-center mt-20'>
//           <Animated.FlatList
//             ref={songSlider}
//             className=''
//             renderItem={renderSongs}
//             data={songs}
//             keyExtractor={item => item.id}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             onScroll={
//               Animated.event(
//                 [
//                   {
//                     nativeEvent: {
//                       contentOffset: { x: scrollX }
//                     },
//                   },
//                 ],
//                 { useNativeDriver: true }
//               )
//             }
//           />
//           {/* <Image
//             source={{
//               uri: route.params.paramKey.imgurl
//             }}
//             className='h-72 w-72 object-cover rounded-lg'
//           /> */}
//         </View>

//         <View className='flex-row justify-between items-center m-2 mt-14 mx-8'>
//           <View>
//             <Text className='text-white font-semibold text-2xl'>{trackTitle}</Text>
//             <Text className='text-white font-normal text-md'>{trackArtist}</Text>
//           </View>

//           <View>
//             <TouchableOpacity>
//               <Image
//                 source={{
//                   uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
//                 }}
//                 className='w-7 h-7 object-contain'
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className='mx-6'>

//           <Slider
//             value={progress.position}
//             minimumValue={0}
//             maximumValue={progress.duration}
//             thumbTintColor="#FFD369"
//             minimumTrackTintColor="#FFD369"
//             maximumTrackTintColor="#fff"
//             onSlidingComplete={async value => {
//               await TrackPlayer.seekTo(value);
//             }}
//           />

//           <View className='flex-row justify-between mx-2'>
//             <Text className='text-white text-sm font-medium'>
//               {new Date(progress.position * 1000)
//                 .toLocaleTimeString()
//                 .substring(3)}
//             </Text>
//             <Text className='text-white text-sm font-medium'>
//               {new Date((progress.duration - progress.position) * 1000)
//                 .toLocaleTimeString()
//                 .substring(3)}
//             </Text>
//           </View>
//         </View>


//         <View className='flex-row justify-between items-center mx-4' >

//           <TouchableOpacity onPress={() => {

//           }}>
//             {/* <Entypo name='shuffle' size={27} color='white'  /> */}
//             <Ionicons name='shuffle' size={35} color='white' />
//           </TouchableOpacity>



//           <TouchableOpacity onPress={skipToPrevious}>
//             <AntDesign name='stepbackward' size={35} color='white' />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
//             <AntDesign
//               name={playBackState === State.Playing ? 'pausecircle' : 'play'}
//               size={50}
//               color='white' />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={skipToNext}>
//             <AntDesign name='stepforward' size={35} color='white' />
//           </TouchableOpacity>

//           {/* <TouchableOpacity onPress={() => {
//           setRepeat(true)
//         }}>
//           <MaterialCommunityIcons name={!repeat ? 'repeat-variant' : 'repeat-once'} size={35} color='white' />
//         </TouchableOpacity> */}

//           <TouchableOpacity onPress={() => { }}>
//             <Ionicons name="heart-outline" size={30} color="#888888" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={changeRepeatMode}>
//             <MaterialCommunityIcons
//               name={`${repeatIcon()}`}
//               size={30}
//               color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { }}>
//             <Ionicons name="share-outline" size={30} color="#888888" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { }}>
//             <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
//           </TouchableOpacity>


//         </View>

//       </ScrollView>
//     </SafeAreaView >
//   )
// }

// export default SongScreen


import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { Slider } from 'react-native-elements'
// import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import songs from '../model/data';
import { songs } from '../songs/data'

const {width, height} = Dimensions.get('window');

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getActiveTrackIndex();
  console.log('The current track is :',currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

    // changing the track on complete
  // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
  //   if (event.type === Event.PlaybackActiveTrackChanged && event.index !== null) {
  //     const track = await TrackPlayer.getTrack(event.index);
  //     const {title, artwork, artist} = track;
  //     setTrackTitle(title);
  //     setTrackArtist(artist);
  //     setTrackArtwork(artwork);
  //   }
  // });

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }

    if (repeatMode == 'track') {
      return 'repeat-once';
    }

    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    setupPlayer();

    scrollX.addListener(({value}) => {
        // console.log(`ScrollX : ${value} | Device Width : ${width} `);

      const index = Math.round(value / width);
      skipTo(index);
      setsongIndex(index);

        // console.log(`Index : ${index}`);
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={style.mainWrapper}>
        <View style={[style.imageWrapper, style.elevation]}>
          <Image
              source={{uri : item.artwork}}
            // source={trackArtwork}
            style={style.musicImage}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {/* music player section */}
      <View style={style.mainContainer}>
        {/* Image */}

        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={songs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />

        {/* Title & Artist Name */}
        <View>
          <Text style={[style.songContent, style.songTitle]}>
            { songs[songIndex].title}
            {/* {trackTitle} */}
          </Text>
          <Text style={[style.songContent, style.songArtist]}>
             {songs[songIndex].artist} 
             {/* {trackArtist} */}
          </Text>
        </View>

        {/* songslider */}
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            thumbStyle={{ width: 12, height: 12 }}
            thumbTintColor='#fff'
            minimumTrackTintColor='white'
            maximumTrackTintColor='gray'
            minimumValue={0}
            maximumValue={progress.duration}
            // thumbTintColor="#FFD369"
            // thumbStyle={{height:15, width:15}}
            // minimumTrackTintColor="#FFD369"
            // maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000).toLocaleTimeString().substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000).toLocaleTimeString().substring(3)}
            </Text>
          </View>
        </View>

        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* bottom section */}
      <View style={style.bottomSection}>
        <View style={style.bottomIconContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});