import React, { Component, createContext } from 'react'
import { Text, View } from 'react-native'

export const PlayListContext = createContext()

export class PlayListController extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            playlist: [],
            addToPlaylist: null,
        }
    }

    UPdateState = (prevState, newState = {}) =>{
        this.setState({...prevState, ...newState})
    }


  render() {
    const {playlist, addToPlaylist} = this.state
    return <PlayListContext.Provider value={{  addToPlaylist, playlist, UPdateState:this.UPdateState}}>
        {this.props.children}
    </PlayListContext.Provider>
    
  }
}

export default PlayListController
