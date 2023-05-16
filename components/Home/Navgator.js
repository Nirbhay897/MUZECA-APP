import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { datas } from '../../data/MeCom'
import NavagotarComponent from './NavagotarComponent'
import Grid from 'react-native-grid-component';
import { AudioContext } from '../../music-Player/app/context/AudioProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navgator = () => {
  const context = useContext(AudioContext)
  const { addToPlaylist, playlist, updateState } = context

  // const renderPlayList = async() =>{
  //   const result =  await AsyncStorage.getItem('playlist')
 
  //   if(result === null){
      
  //    const defaultPlaylist1 = {
  //      id: Date.now(),
  //      title: 'Favorite',
  //      imageurl:  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQcNFREWFhURFRUYHSggGBomGxUVITEmJTUrLjE6Fx8zODMtNygtLisBCgoKDg0NFQ0PFSsdFR4rKy03NysxKystLystKysrKzcsKy0tLSsrKy4tLTcrOCsrKy0rLSsrLSs3LS0tKy0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAQEBAQADAAAAAAAAAAABAgAGBwQDBQj/xAAyEAEBAAEDAQUGBAYDAAAAAAABAAIDBBEFBhITMVEhIkFSYZEUI0KBBxUyRHKxJDNj/8QAGgEBAQEBAQEBAAAAAAAAAAAAAgEABQMEBv/EAB4RAQEBAQADAQADAAAAAAAAAAABEQIDBDESIUJh/9oADAMBAAIRAxEAPwDzqosFQX7q17MFQWCriNrMFUBUEbUYKiwVEdZgqLBJG1CVBYKghagCsIKgjajFQWKiOswVBYkI2oSoIKghahCoIKiNrEksFQRtZgqLBIRtQlRAVEbUa08WjrOOJCwVBdu19DBUFioI2owVBYkI2swVBYKgjajBUWCoI2owVBFRC1CVBBURtZiqxURtRgqCAqCOoSogKiFrMFYQVEbWYKgsSRtQhUQVBGoxUFgqI2sJniY6zjQqLFQXbte4CoLBUEbWYqCwVBG1GCoIKgjahkLBUEbWYKgsVEbUYqCAqCGowVBYKiNqMVEFRG1iSWKgjazFRYqCNqMEhYqI2oxUWKiFrMVEBURtRrTxams48qCwVBdq17sVEFQRtYhIWKgjajBUFgkjahJCxUEdRgqCAqCNrHiSwVEKjFQWJCOsSogKiNrMVFgkI2oQqICoI2oQkLEkbWJUEFUUJUQEhG1DabR1nISWKi7Vr6GCoLEkdRioLFQRtRgqCAqI2swVFgkjqEqCAqjajBWFInqVEdYlRASR1lEhAnrUQtQhUEFUdRiosSRtY1BBURtQyQVBG1CVBAVEbWbi02pqOQKixJdm19BKiAqClqMFRYkhqGSwVcRtZioLEkbUfseh9G19/rGhoY8vnlk/0aGPzLes9D7B7Da4jqaZudX456pzhz9MPKv+H3RsdpsNPJx/O3GJrar8eE5xx/Y4unuP7Hs9ddXnm5yz5P5Xte73fw2h3fLu+Fhxx9rnuu9g9jucV0cDa6vHu5aZxpr9cfL7XWWvn58nXN2VnjeHYHqXi+G6eBjzx43fPD49fW7vonYXY7bEdXA3Orx72Wqc4c/TDyuptenfseTuZrPk/lm17vd/D6Hd+XwsOPtxfoOt9htluMV0sDbavwy0jjDJ+uPldVa8ue+ubsrPBurdL1tnrZaOvj3cj2ie3HVx+GWL6XyF672/6RjudnnqB+bt/wAzB+Lj+rH7f6vIy6Xi8v752/RpKuIKidqMVEFQRtQ8SWKiNrMVEFRG1GtNqazkSosSF2LXuSQsFRHUYqCCopazBUWJCNqEnj7WqCFZ/Re0DwtPjy8PDjjy47pfmub7BdXx3ew0jn83Qxx0dU+PunGOX7nF0lwe+bz1ZWa1rRZrWtZmta1mfN1HjwNfny8LU559O63gwXr3bvquO22WeA/m7gdLA+PH6svteRX2+rP4tGnioICoL30WqLEkbWJPFiopajFRAVBCo0VWprOSKiCoLs692Ki3EkdYklpI6hKggqI2sxUWJI2s/adnOtavT9xjrabyeWpp8+zcYej9fS9v6T1LR3ehhr6OXewzP30344vol/PxdD2O7SZ9O1/eXLbaiGth8r8+P1L4/Y8P7n6n1Htlr8W318NXDHU08jPDPEyxyPaZDfluarWtazNfF1fqels9HPX1njHE9gf1auXwxPrfn3W5w0dPPV1MjDDDFyyyfLELx/tT2gz6hr97246GHJpafofM/VvTxeP93/EtfH1vq2rvtfLW1Xz9mGH6dvh8MS+IiS+/5MgqJIKiiGSxURtRgqI4kpqEqiojazWm0dZyZJYJLsa9yEhYKiNqNxUWJI2s1RYJCNrMVBbioI2owVQFXEbUdh2D7U/g8zba+X/G1Mvdyf7PN+P+LesCPtHkfJ8+S/ngvQ/4f9quO7stzn7PLb6mT5f+a/6vi9jxf35WV6LGWQCqACqvBietubznt92p7/e2W2y9w9mvqYv/AGPyD6et8vHF6uRrX67tt2md5qOhovG203zP7rM/U/T0uWLBJdDmTmZBPEliS1qEqIKiNqEksSEdY1FJWR1GqCCY2seLTams5MqIKi7GvZiriwTC1iVEEx1jxVAVFLUYKiKgjajFRBUR1jIQVBGo+96zvHT8J3Wu6fHHd8TLhPT1viIKiHz4xJIKgohJLElEJVxBMbWJUQVEbUYrIJjaxJCxMKzTa1GcpxUWJLsa9mKrSR1jxJaSNQhUQSRtY1EVEUbioioijVEFRTUYKixJGsQkgqI2oZIKimsZLEkKhCoiSmsaiCojazFUFRDUa1rW1nLExUF1texJ4sTG1iSFiSlrEJLBJG1DxUQVEWaoiojajFQRNLUNRFRFGKiCqNZiqxJGoQksTG1mKiCqmsaggkihkioizWm1GcsTYm61exJLFUdZpLEkdQyFqilqMVQTGsaiCSKEni0xtYlUSR1CSWJKMSS0kUJURJG1iVEExQlRBNGJURJG1Da1qazlyS08XWe5ktIRtQhNiSOsSSCojqMVBBVRDNiY6xJsSRQzBVHUJJBUUtYzBUEazVEVRYkwSURRMFRHWYqIJI6jWm1NZy9Ra11nsaiLRZRVa1EJJNosSS1qVFE2tFlEk2jUYqtaKKJm1GJJa1KyptaNYkk2ghKi1qMSbWghta1mf//Z ' ,
  //      audios: []
  //    }
  //    const defaultPlaylist2 = {
  //     id: Date.now(),
  //     title: 'Downloads',
  //     imageurl:  'data:image/png;base64,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' ,
  //     audios: []
  //   }
  //   const defaultPlaylist = {
  //     id: Date.now(),
  //     title: 'Artist',
  //     imageurl:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZeifIsS5zkWeJjS6dnCGA89nWF_rZbv5rgP3PUudBQ&usqp=CAU&ec=48665699' ,
  //     audios: []
  //   }
 
  //    const newPlaylist = [...playlist, defaultPlaylist1, defaultPlaylist,defaultPlaylist2]
  //    updateState(context, {playlist: newPlaylist})
  //    return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlaylist]))
  //   }
 
  //   updateState(context, {playlist:JSON.parse(result)})
 
  //  }
 
  //  useEffect(()=>{
  //    if(!playlist.length) {
  //      renderPlayList()
  //    }
  //  },[])
  return (
   <View className='mb-11 ml-3' style={{flexWrap:'wrap', flexDirection:'row',}}>
    {datas.map((data, index)=>(
        <NavagotarComponent title={data.title} imageurl={data.icon} key={index} index ={index} />
    ))}

  {/* {playlist.slice(0, 6).map((item, index)=>(
          <NavagotarComponent key={index} title={item.title} imageurl={item.imageurl}  index={index} />
        ))} */}

   </View>
  )
}

export default Navgator