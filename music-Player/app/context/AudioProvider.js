import { getPermissionsAsync } from 'expo-media-library'
import React, { Component, createContext } from 'react'
import { Alert, Text, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeAudioForNextOpening } from './Helper';
import { selectAudio } from './AudioController';


export const AudioContext = createContext()


export class AudioProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audioFiles: [],
            playlist: [],
            addToPlaylist: null,
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 != r2),
            playbackObj: null,
            soundObj: null,
            currentaudio: {},
            isPlaying: false, 
            activeListIcon: null,
            playbackDuration: null,
            playbackPosition: null
        }
        this.totalCount= 0
    }

    permissionAllert = () => {
        Alert.alert("Permission Required", 'Sangeet needs to read the audio files', [{
            text: 'Allow',
            onPress: () => this.getPermissions()

        }, {
            text: 'cancel',
            onPress: () => this.permissionAllert()
        }])
    }

    getAudioFiles = async () => {
        const { dataProvider, audioFiles } = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media?.totalCount,
        })
        this.totalCount = media?.totalCount
        console.log('====================================');
        console.log(media);
        console.log('====================================');
        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets] })
    }

    loadPreviousAudio = async() =>{
       let previousAudio = await AsyncStorage.getItem('previousAudio')
       let currentaudio;
       let activeListIcon;

       if(previousAudio === null){
        currentaudio = this.state.audioFiles[0]
        activeListIcon = 0;
       } else{
       previousAudio = JSON.parse(previousAudio)
       console.log('====================================');
       console.log(previousAudio);
       console.log('====================================');
       currentaudio = previousAudio.item
       activeListIcon = previousAudio.index
       }
       this.setState({...this.state, currentaudio, activeListIcon})
    }

    getPermissions = async () => {

        const permission = await MediaLibrary.getPermissionsAsync();

        console.log('====================================');
        console.log(permission);
        console.log('====================================');

        if (permission.granted) {
            // get all aaudio files
            this.getAudioFiles()
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({ ...this.state, permissionError: true })
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()

            if (status === 'denied' && canAskAgain) {
                this.permissionAllert()
            }

            if (status === 'granted') {
                this.getAudioFiles()

            }
            if (status === 'denied' && !canAskAgain) {
                this.setState({ ...this.state, permissionError: true })
            }
        }
    }

    componentDidMount() {
        this.getPermissions()
        if(this.state.playbackObj === null){
            this.setState({...this.state, playbackObj: new Audio.Sound()})
        }
    }

    onPlaybackStatusUpdate = async (playbackStatus) => {

        if (playbackStatus?.isLoaded && playbackStatus.isPlaying) {
          this.updateState(this, {
            playbackPosition: playbackStatus.positionMillis,
            playbackDuration: playbackStatus.durationMillis
          })
        }
    
        if (playbackStatus.didJustFinish) {
          let nextAudioIndex = this.state.activeListIcon + 1
          // there  is no next audio to play
          if (nextAudioIndex >= this.totalCount) {
            nextAudioIndex = 0;
          }
          const audio = this.state.audioFiles[nextAudioIndex]
          const status = await selectAudio(this.state.playbackObj, audio.uri)
          this.updateState(this, { soundObj: status, currentaudio: audio, isPlaying: true, activeListIcon: nextAudioIndex })
          await storeAudioForNextOpening(audio, nextAudioIndex)
        }
      }
    

    updateState = (prevState, newState = {}) =>{
        this.setState({...prevState, ...newState})
    }

    render() {
        const { permissionError, addToPlaylist, playlist, playbackDuration, playbackPosition, dataProvider, audioFiles, playbackObj, soundObj, currentaudio, isPlaying, activeListIcon } = this.state;
        if (permissionError) {
            return <View className='text-white font-extrabold'>
                <Text>no permission</Text>
            </View>
        }
        return <AudioContext.Provider value={{ audioFiles, addToPlaylist, playlist, dataProvider, playbackObj, soundObj, currentaudio, updateState:this.updateState, isPlaying , activeListIcon, totalCount:this.totalCount, playbackPosition, playbackDuration, loadPreviousAudio: this.loadPreviousAudio, onPlaybackStatusUpdate:this.onPlaybackStatusUpdate}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider
