import { View, Text, Modal, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const MiniPlayer = ({ imageurl, title, caption, setShowModal, showModal }) => {
    return (
        // <Modal className='mb-14 h-12 rounded-lg items-center justify-between bg-slate-800 w-full flex-row'>
        <TouchableOpacity className='z-50 mb-14 h-14 rounded-lg items-center justify-between bg-slate-800 w-full flex-row'>
            <View className='flex-row items-center justify-between mb-0.5'>
                <View>
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,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'
                            // uri: imageurl
                        }}
                        className='h-11 ml-2 w-11 object-contain rounded-md'
                    />
                </View>

                <View className='ml-3'>
                    <Text numberOfLines={1} className='text-white font-semibold font-md'>Title</Text>
                    <Text numberOfLines={1} className='text-gray-500 font-medium font-xs'>caption</Text>
                </View>
            </View>

            <View className='items-center flex-row mx-3'>
                <TouchableOpacity className=''>
                    <View className='mr-4'>
                        <Image
                            source={{

                                uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                            }}
                            className='h-7 w-7 object-contain rounded-md'
                        />
                    </View>
                </TouchableOpacity>

                <Entypo name='controller-play' size={30} color='white' />
            </View>

        </TouchableOpacity>
        //  </Modal>
    )
}

export default MiniPlayer