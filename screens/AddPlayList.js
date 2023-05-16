import { View, Text, TextInput, TouchableHighlight, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import BottomTab from '../components/Home/BottomTab'
import { useNavigation } from '@react-navigation/native'
// import SanityClient from '../sanity.js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext } from 'react'
import { AudioContext } from '../music-Player/app/context/AudioProvider'
import { useEffect } from 'react'
import { PlayListContext } from './PlayListController'



const AddPlayList = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });


  // const { username, email, message } = formData;

  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };


  const navigation = useNavigation();
  const [val, setValue] = useState('');
  const [valueArr, setValueArr] = useState([]);

  // const handlechange = (e) =>{
  //  const  newvalue  = e.target.defaultValue;

  //   setValue(newvalue)
  // }

  const context = useContext(AudioContext)
  const { addToPlaylist, playlist, updateState } = context


  let title = val;
  let imageurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAADTCAMAAAAhx6asAAAAMFBMVEUiIyY+PkASExQ0NDY6OjwmJykkJSgqKy4oKSwxMjQsLTA0NTc4ODowMDMnJys2NzjPLoA2AAAD9klEQVR4nO3d7XqiMBAFYC0QICDe/91Wd+sqKmSYTMoc95z/nScvH0lAkh6+PjGHvRtQJBfV4eNCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1T9bkIcjsexVf2tT1WI1fEnUfP3/lQPomvqTlHDl+py1dXHp/SKOn5UzRvRNZWilg/VkghX1bTLIkxV01arIjxVEIiwVFIRjmqLCEO1VeRfFdp+s8i3Sivyq8oR+VSFLk/kT2Uh8qWyEnlSTaOVyJEqWpq8qFpblA9VGD5R1Zh1E1RRRRVV/6lqPHXTrc5nqIbYzOrAq+ohhpc60Kq6apu3dWBVz6JZHUhV3bdhtQ6c6tLVvRXN6kCpLiJZHRhVSjSrA6H6GY7kdbyrHocjeR3Pqlp6jl7qeFW9G47kdTyqloYjeR1vqrXhSF7Hl6rSi+Z1FH9cULVjHarKt8aqDlXlW2NVh6ryrbGqQ1X51ljVoap8a6zqUFW+NVZ1qCrfGqs6VJVvjVUdqsq3xqoOVeVbY1WHqvKtsapDVfnWWNWhqnxrrOpQVb41VnWoKt8aqzpUlW+NVR1XqtCdzuM4VnEKn6JqTo+/k9fVJ6i683EhuKqmWjIBq07LJlhVWDlRsKomsQYNUpX8nhBRlf5IElAlWIMGqOqTKECVZA0knEq0BhJOJVqDu58qTF2MXXP9InCDKohWS++jCvG+E0ddxVaukq0s3mOXqXbxeKdV6zOlWzQbneWplk0CVRCtvfj1fc7Wp6VJVSc6VWfN57sZqnb9WCdVsl0ITpqm6VWpRiVVgnnF5QLc/n3/IUO1+qRnp1KdKrUqibJRjbqP4pUqwT1holLtX6lVdYJO2aK30K5fUKnC4muuLar01GLQLspQqdI3lUSVHIV1/d81GpXk+pPMmBIHR49SqURdskC1fnRGPUqjEq6dFTxBrJ0s1UzpFoVKdFflPgtrnj/u2a6Sbk0kaddSZ1rrto/+l+0q6eJt0QD6ftrf5y2z06iEe2NJe7D4cpCGaTvjKdtVwm3M5NOCOHv0rPJNGpWsXz9uuTNC24+XU1aPlXLe95xSKvVkxySlVJmdWGYK3Vd5w012yvSBObMdiyhG4fR4pXrbZRnFjCn5cjJ3ZpAfhSp1Ce6PKvAksvvld9CpVmeCmVsl2ET1hL/yuKd7f2cd23dMw849+i3K94FvH7LODu6ov1G/ke6efuSpe4vJtlEyfhOZTuOd5OY0/Unmb41h6rrJQ683z/7/+6VEqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidf39HXK73dLg4vAAAAAElFTkSuQmCC'


  const handlePress = async () => {
    
    const result = await AsyncStorage.getItem('playlist');

    if (result !== null) {
      
      const audios = [];

      if (addToPlaylist) {
        audios.push(addToPlaylist);
      }
      const newList = {
        id: Date.now(),
        title: title,
        imageurl: imageurl,
        audios: audios
      }
      const updateList = [...playlist, newList]
      updateState(context, { addToPlaylist: null, playlist: updateList })
      await AsyncStorage.setItem('playlist', JSON.stringify(updateList))
      console.log('====================================');
      console.log(updateList);
      console.log('====================================');

    }
    navigation.navigate("PlayList", { paramKey: { title, imageurl } })
    setValue('');
  }

  // const renderPlayList = async() =>{
  //  const result =  await AsyncStorage.getItem('playlist')

  //  if(result === null){
  //   const defaultPlaylist = {
  //     id: Date.now(),
  //     title: 'Favorite',
  //     imageurl:  'data:image/jpeg;base64,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 ' ,
  //     audios: []
  //   }

  //   const newPlaylist = [...playlist, defaultPlaylist]
  //   updateState(context, {playlist: newPlaylist})
  //   return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlaylist]))
  //  }

  //  updateState(context, {playlist:JSON.parse(result)})

  // }


  // useEffect(()=>{
  //   if(!playlist.length) {
  //     renderPlayList()
  //   }
  // },[])


  return (

    <SafeAreaView className='bg-black h-full w-full'>
      <StatusBar
        className='bg-black'
        barStyle='dark-content'
      />

      <View className='flex items-center justify-center mt-4'>
        <Text className='text-2xl text-white font-bold '>Create New Playlist</Text>
      </View>

      <View>
        <Text className='text-white font-semibold text-2xl mt-20 ml-4'>Name your playlist</Text>
      </View>

      <View className='my-8 mx-2'>
        <TextInput defaultValue={val} onChangeText={newText => setValue(newText)} placeholder='create your playlist here' className='h-12 rounded-md bg-white p-2' />
      </View>

      <View className='items-center mt-4 '>
        {/* <Button className='bg-white' title='Create'   /> */}
        <TouchableHighlight disabled={!title} className={!title ? ' bg-red-400 border rounded-full p-2 w-44 items-center' : 'bg-red-500 border rounded-full p-2 w-44 items-center'} onPress={() => {
          handlePress()
        }} >
          <Text className='font-semibold text-lg text-white'>Submit</Text>
        </TouchableHighlight>
      </View>

      <BottomTab />
    </SafeAreaView>
  )
}

export default AddPlayList