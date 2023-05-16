import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.toLocaleString()

const Icons = [
    {
        name: 'Bell',
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGLu18tTyT1C-ePq6e7jCVdAu1TRTrZQnxoxSNqGBKBJxIut64ClOlvsdRtujfmydnqMg&usqp=CAU',
    },
    {
        name: 'Recent',
        ImageUrl: 'https://images.vexels.com/media/users/3/131904/isolated/preview/314ac7a195e5759f2cfadde070a92cc7-reloading-timer-clock-icon.png',
    },
    {
        name: 'Setting',
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnqflz-CoiW_5308w4BVUsaxRbwcb2a6xa2E4qT6MOnB8YzzkpZ21tVQ8JhOnnWDWDTQ&usqp=CAU',
    },
]


const Header = () => {
    return (
        <SafeAreaView className='mt-2 flex-row justify-between'>
            <View >
                <Text className='font-bold text-2xl ml-3 text-white'>MUZECA</Text>
                {/* <Text className='font-medium text-md ml-3 text-white'>GOOD MORNING</Text> */}
            </View>
            <View className='flex-row'>
                {Icons.map((icon, index) => (
                    <View key= {index}>
                        <TouchableOpacity className='mr-5'>
                        <Image
                            source={{
                                uri: icon.ImageUrl
                            }}
                            className='h-7 w-7 object-contain'
                        />
                        </TouchableOpacity>
                    </View>

                ))}
            </View>
        </SafeAreaView>
    )
}

export default Header