import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const CArd = ({id, ImageUrl , smallTitle, caption}) => {
    const navigation = useNavigation()
  return (
    <View>
        <TouchableOpacity onPress={()=>{
            if(id === 4){
                navigation.navigate('ArtistScreen')
            }
            else{
                navigation.navigate('AlbumScreen', {paramKey: {ImageUrl, smallTitle, caption}})
            }
            }}>
                        <View key={id} className={id===4 ? 'items-center mx-2' : 'mx-2'}>
                            <View className='w-28 h-28'>
                                <Image
                                    source={{
                                        uri: ImageUrl
                                    }}
                                    className= {id===4 ?'h-full w-full mt-4 rounded-full' : 'h-full object-cover mt-4 rounded-md'}
                                />
                            </View>

                            <Text className= 'text-white text-md font-semibold mt-5'>{smallTitle}</Text>
                            <Text className=' text-sm text-gray-500 mb-2'>{caption}</Text>
                        </View>
                    </TouchableOpacity>

    </View>
  )
}

export default CArd