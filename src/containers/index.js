import React, { Component } from 'react';
// import * as React from 'react'
import { Router, Scene } from "react-native-router-flux";
import { connect } from "react-redux";
import { AsyncStorage, Text } from "react-native";
import Loader from '../constants/Loader';
import Splash from './Splash'
import Login from './Login';
import HomeComponent from './../containers/Home'
import AddEventComponent from './../containers/AddEvent'
import SpinnerComponent from './Spinner'
import SearchPlaces from './../containers/SearchPlaces'





const RouterWithRedux = connect()(Router);

class Root extends Component{   
    constructor(props){
        super(props);

        this.state = {
            token: null,
            isStorageLoaded: false,
            loginState:true,
            homeState:false
        }
    }

  async  componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
        });
    
        

    }

    render(){
        let { isLogged } = this.props.login;
        let { token, isStorageLoaded } = this.state;
        if(!isStorageLoaded){
            return (
                <Loader loading={true} />
            )
        }else{
            return(
                <RouterWithRedux>
                    <Scene key='root'>
                    <Scene
                            component={Splash}
                            initial={false}
                            hideNavBar={true}
                            key='Splash'
                            title='Splash'
                        />
                        <Scene
                            component={Login}
                            initial={false}
                            hideNavBar={true}
                            key='Login'
                            title='Login'
                        />
                         <Scene
                            component={HomeComponent}
                            initial={true}
                            hideNavBar={true}
                            key='Home'
                            title='Home'
                        />
                         <Scene
                            component={SpinnerComponent}
                            initial={false}
                            hideNavBar={true}
                            key='Spinner'
                            title='Spinner'
                        />
                         <Scene
                            component={AddEventComponent}
                            initial={false}
                            hideNavBar={true}
                            key='AddEvent'
                            title='Add Event'
                        />
                         <Scene
                            component={SearchPlaces}
                            initial={false}
                            hideNavBar={true}
                            key='SearchPlaces'
                            title='SearchPlaces'
                        />
                        </Scene>
                </RouterWithRedux>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(Root)
