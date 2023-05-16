import { View, Text, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import BottomTab from '../components/Home/BottomTab'
import Filters from '../components/Home/Filters'
import { ScrollView } from 'react-native'
import Com from '../components/MeTab/Com'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const MeScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className='bg-black w-full h-full'>
            <StatusBar
                hidden={false}
                barStyle='dark-content'
            />
            <View className='flex-row justify-between mt-3'>
                <Text className='text-white font-bold text-2xl ml-8'>Your Library</Text>

                <View className='flex-row justify-between mr-8'>
                    <TouchableOpacity onPress={() => { navigation.navigate("AddPlayList") }}>
                        <View className='mr-8'>
                            <Image
                                source={{
                                    uri: 'data:image/png;base64,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'
                                }}
                                className='w-7 h-7 object-contain' />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>

                        <View>
                            <Image
                                source={{
                                    uri: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png'
                                }}
                                className='w-7 h-7 object-contain' />
                        </View>

                    </TouchableOpacity>


                </View>

            </View>

            <View className='mb-4'>
                <Filters className='mb-8' />
            </View>

            <ScrollView className='mb-16'>
                <Com />
            </ScrollView>

            <BottomTab />
        </SafeAreaView>
    )
}

export default MeScreen