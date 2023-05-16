import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OptionComponent = ({ visible, onClose, currentItem, onPlayPress,onAddPlayList }) => {
    const { filename } = currentItem
    const navigation = useNavigation()
    return (
        <>
            <StatusBar hidden={true} />
            <Modal animationType='slide' transparent visible={visible}>

                <View className=' bg-black absolute bottom-0  pl-4   z-50 border border-black   shadow hover:shadow-lg  rounded-t-xl h-64  w-full'>

                    <View className='flex-row items-center mr-2 mb-4 justify-between'>
                        <Text numberOfLines={2} className='text-white text-xl mt-2 font-bold mb-4 w-72'>{filename}</Text>
                        <Entypo onPress={() => { onClose() }} className='' name="cross" size={30} color="white" />
                    </View>

                    <View className=''>
                        <TouchableOpacity onPress={() => onPlayPress()}>
                            <Text className='text-white text-lg font-medium mb-5'>Play</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {navigation.navigate('VideoPlayList')}}>
                            <Text className='text-white text-lg font-medium '>Add to Playlist</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </>
    )
}

export default OptionComponent