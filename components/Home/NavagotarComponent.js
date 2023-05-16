import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const NavagotarComponent = ({ imageurl, title, index }) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    return (
        <TouchableOpacity onPress={() => {
            if(index === 1){
                navigation.navigate('ArtistPage')
            }
            else{
                navigation.navigate('PlayList', {paramKey: {imageurl, title}})
            }
            // setShowModal(true);
        }}
            className=''>
            <View className='ml-1 mr-2'>
                <View className=' flex-row w-40 mb-4 bg-zinc-600 border-solid rounded-md  items-center'>

                    <View>
                        <Image
                            source={{
                                uri: imageurl,
                            }}
                            className='h-14 w-14 object-contain rounded-l-md' />
                    </View>

                    <View>
                        <Text numberOfLines={1} className='text-white text-lg p-2 font-medium w-24'>{title}</Text>
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    )
}

export default NavagotarComponent