import {Text, View, ScrollView, StatusBar  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header'
import Filters from '../components/Home/Filters';
import Navgator from '../components/Home/Navgator';
import BottomTab from '../components/Home/BottomTab';
import Suggests from '../components/Home/Suggests';
// import {AlbumCategories} from '../SpotifyAssets/data/AlbumCategories'
import { sugg } from '../data/Posts'
import { Divider } from 'react-native-elements';
import MiniPlayer from '../components/Songs/MiniPlayer';


const HomeScreen = ({showModal, setShowModal}) => {
  return (
    <SafeAreaView className='bg-black h-full w-full'>
      <StatusBar 
      // className='bg-black'
      barStyle='dark-content'
      />

    <Header/>

    <Filters />


    <ScrollView className='mt-10 mb'>

    <Navgator />

    {sugg.map((tit, index)=>(
      <Suggests title={tit.title} id={index} />
    ))}
    </ScrollView>

    {
      // showModal && (<MiniPlayer showModal={showModal} setShowModal={setShowModal} />)
    } 
     {/* <MiniPlayer  showModal={showModal} setShowModal={setShowModal} />  */}

    <BottomTab/>
   </SafeAreaView>
  )
}

export default HomeScreen