import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
// Components for router

import LoadingScreen from './components/LoadingScreen';
import AuthScene from './components/AuthScene';
import RegisterScene from './components/RegisterScene';
import MainScreen from './components/MainScreen';
import IdentifyCar from './components/IdentifyCar';
import HistoryCar from './components/HistoryCar';

class App extends Component {
    render(){

        return (
                
                <Router>
                <Scene key="root">
                    <Scene key="logoScreen" component={LoadingScreen} initial={true} hideNavBar={true}></Scene>
                    <Scene key="logIn" component={AuthScene} hideNavBar={true}></Scene>
                    <Scene key="register" component={RegisterScene} hideNavBar={true}></Scene>
                    <Scene key="main" component={MainScreen} hideNavBar={true}></Scene>
                    <Scene key="identifyCar" component={IdentifyCar} hideNavBar={true}></Scene>
                    <Scene key="historyCar" component={HistoryCar} hideNavBar={true}></Scene>
                </Scene>
                </Router>
           
        )
    }
}

export default App;
