import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import CArd from './CArd'
import { sugg } from '../../data/Posts'
import { AlbumCategories } from '../../SpotifyAssets/data/AlbumCategories'
import { SuggCard } from '../../data/Suggest'
import { Artist } from '../../data/ArtistData'

const Suggests = ({ title, id }) => {
    return (
        <View className='mb-9'>
            <Text key={id} className='text-white text-2xl ml-4 font-bold'>{title}</Text>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
            >
                {id ===4 ? Artist.map((art, index)=>(
                    <View key={index} className=''>
                    <CArd smallTitle={art.name} ImageUrl={art.imgUrl} id={id} />
                </View>
                ))

                   : SuggCard.map((sug, index) => (
                        <View key={index} className=''>
                            <CArd ImageUrl={sug.ImageUrl} smallTitle={sug.smallTitle} caption={sug.caption} id={id} />
                        </View>
                    ))
                }

            </ScrollView>
        </View>

    )
}

export default Suggests