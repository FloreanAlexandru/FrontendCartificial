import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackImg from '../images/AppPhoto.jpg';
import FlatButton from './button';
import {Actions} from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackImg}
          style={styles.image}></ImageBackground>

        <Animatable.View animation="fadeIn">
        <FlatButton
          text="Foto mașină"
          style={styles.container}
          onPress={() => {
            Actions.identifyCar();
            retrieveData();
          }}
        />
      </Animatable.View>
      <Text></Text>

        <Animatable.View animation="fadeInDown">
        <FlatButton
          text="Foto VIN"
          onPress={() => {
            Actions.historyCar();
          }}
        />
      </Animatable.View>
      <Text></Text>
      
        <Animatable.View animation="fadeInDownBig">
          <FlatButton
            text="Înapoi"
            onPress={() => {
              Actions.logIn();
            }}
          />
        </Animatable.View>
        <Text></Text>

      </View>
    );
  }
}

export default MainScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 450,
    height: 700,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 25,
    color: 'white',
  },
});
