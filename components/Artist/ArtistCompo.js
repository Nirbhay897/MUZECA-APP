import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'


const ArtistCompo = ({Aname, AimgUrl}) => {
  return (


    <TouchableOpacity onPress={()=>{}}>
    <View className='flex-row my-2 items-center'>
      <View>
        <Image
        source={{
            
            uri: AimgUrl
        }}
        className='w-16 h-16 ml-2 rounded-full mr-4'
         />
      </View>
        <View>
        <Text className='text-white font-bold text-lg'>{Aname}</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

export default ArtistCompo