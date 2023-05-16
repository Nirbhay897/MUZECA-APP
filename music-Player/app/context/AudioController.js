// paly
import { storeAudioForNextOpening } from "./Helper";

export const play = async (playBackObject, uri) => {
    try {
        return await playBackObject.loadAsync({ uri: uri }, { shouldPlay: true, progressUpdateIntervalMillis: 1000 })
    } catch (error) {
        console.log("error inside play : ", error.message);
    }
}

// pause
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync({ shouldPlay: false })
    } catch (error) {
        console.log("error inside pause : ", error.message);
    }
}


// resume
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync()
    } catch (error) {
        console.log("error inside resume : ", error.message);
    }
}

// select
export const selectAudio = async (playbackObj, uri) => {
    try {
        //   return 
        await playbackObj.stopAsync()
        await playbackObj.unloadAsync()
        return await play(playbackObj, uri)
    } catch (error) {
        console.log("error inside selectAudio : ", error.message);
    }
}

export const playPause = async (item, context) => {

    const { playbackObj, soundObj, currentaudio, updateState, audioFiles, onPlaybackStatusUpdate } = context

    try {

        // playing audio for first time
        if (soundObj === null) {
            const index = audioFiles.indexOf(item)
            const status = await play(playbackObj, item.uri)
            updateState(context, { soundObj: status, currentaudio: item, isPlaying: true, activeListIcon: index })
            playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            return storeAudioForNextOpening(item, index)
        }

        // pause 
        if (soundObj.isLoaded && soundObj.isPlaying && currentaudio.id === item.id) {
            const status = await pause(playbackObj)
            return updateState(context, { soundObj: status, isPlaying: false, playbackPosition: status.positionMillis })
        }

        // resume 
        if (soundObj.isLoaded && !soundObj.isPlaying && currentaudio.id === item.id) {
            const status = await resume(playbackObj)
            return updateState(context, { soundObj: status, isPlaying: true })
        }

        // Replay
        // if(playbackStatus.didJustFinish && currentaudio.id === item.id){
        //   const index = audioFiles.indexOf(item)
        //   const playBackObject = new Audio.Sound()
        //   const status = await play(playBackObject, item.uri)
        //   updateState(this.context, { playbackObj: playBackObject, soundObj: status, currentaudio: item, isPlaying: true, activeListIcon: index })
        //   playBackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
        //   return storeAudioForNextOpening(item, index)
        // }

        // select Diff audio
        if (soundObj.isLoaded && currentaudio !== item.id) {
            const index = audioFiles.indexOf(item)
            const status = await selectAudio(playbackObj, item.uri)
            updateState(this.context, { currentaudio: item, soundObj: status, isPlaying: true, activeListIcon: index })
            return storeAudioForNextOpening(item, index)
        }

    } catch (error) {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
    }
}

export const changeAudio = async (context, select) => {

    const { playbackObj, activeListIcon, totalCount, audioFiles, updateState } = context

    try {

        const { isLoaded } = await playbackObj.getStatusAsync()
        const isLastAudio = activeListIcon + 1 === totalCount;
        let audio;
        let index;
        let status;

        if (select === 'next') {

            audio = audioFiles[activeListIcon + 1]

            if (!isLastAudio && !isLoaded) {
                index = activeListIcon + 1;
                status = await play(playbackObj, audio.uri)
            }

            if (!isLastAudio && isLoaded) {
                index = activeListIcon + 1;
                status = await selectAudio(playbackObj, audio.uri)
            }

            if (isLastAudio) {
                index = 0;
                audio = audioFiles[index]
                if (isLoaded) {
                    status = await selectAudio(playbackObj, audio.uri)
                } else {
                    status = await play(playbackObj, audio.uri)
                }
            }

        } 

        if(select === 'previous'){

            // Previous 
            const isFirstAudio = activeListIcon <= 0
            audio = audioFiles[activeListIcon - 1]

            if (!isFirstAudio && !isLoaded) {
                index = activeListIcon - 1;
                status = await play(playbackObj, audio.uri)
            }

            if (!isFirstAudio && isLoaded) {
                index = activeListIcon - 1;
                status = await selectAudio(playbackObj, audio.uri)
            }

            if (isFirstAudio) {
                index = totalCount - 1;
                audio = audioFiles[index]
                if (isLoaded) {
                    status = await selectAudio(playbackObj, audio.uri)
                } else {
                    status = await play(playbackObj, audio.uri)
                }
            }

        }

        updateState(context, { soundObj: status, currentaudio: audio, isPlaying: true, activeListIcon: index })
        storeAudioForNextOpening(audio, index);

    } catch (error) {

        console.log('====================================');
        console.log(error.message);
        console.log('====================================');

    }


}
