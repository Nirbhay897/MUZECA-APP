import { Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import MeScreen from './screens/MeScreen';
import AddPlayList from './screens/AddPlayList';
import PlayList from './screens/PlayList';
import SongScreen from './screens/SongScreen';
import AddSong from './screens/AddSong'
import AppNavigator from './music-Player/app/navigation/AppNavigator';
import AudioProvider from './music-Player/app/context/AudioProvider';
import VideoPlayer from './music-Player/app/videoscreens/VideoPlayer';
import VideoList from './music-Player/app/videoscreens/VideoList';
import VideoPlayList from './music-Player/app/videoscreens/VideoPlayList';
import ArtistPage from './components/Artist/ArtistPage';
import ArtistScreen from './screens/ArtistScreen';
import AlbumScreen from './screens/AlbumScreen';

// import { TailwindProvider } from 'tailwindcss-react-native';
// import TrackPlayer from 'react-native-track-player';
// TrackPlayer.registerPlaybackService(() => require('./service'));



// AppRegistry.registerComponent(...);

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AudioProvider>
    <NavigationContainer>
        <Stack.Navigator>
             <Stack.Screen name="Home" component={HomeScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="Search" component={SearchScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="Me" component={MeScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="AddPlayList" component={AddPlayList} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="PlayList" component={PlayList} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="SongScreen" component={SongScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="AddSong" component={AddSong} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="VideoList" component={VideoList} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="VideoPlayList" component={VideoPlayList} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="ArtistPage" component={ArtistPage} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="ArtistScreen" component={ArtistScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
             <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
        </Stack.Navigator>
        {/* <AppNavigator />  */}
    </NavigationContainer>
    </AudioProvider>

  //  <View>
  //    <VideoListItem />
  //    <VideoListItem />
     
  //  </View> 
    

  );
}
