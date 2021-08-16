import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Animated, Button, StatusBar} from 'react-native';
import Logo from '../images/splash-logo.png';
import FlatButton from './button';
import {Actions} from 'react-native-router-flux';

class LoadingScreen extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
    props:[]
  };

  componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 4000,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000000"/>
        <Animated.View style={{
          opacity: this.state.LogoText}}>
          <Text style={styles.text}> Bine ați venit </Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            bottom: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }}>
          <Image style={styles.logoStyle} source={Logo} />
          <FlatButton text='Începeți' onPress={() => {
            Actions.logIn()
          }} />
        </Animated.View>
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#28282B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
    fontSize: 40,
    marginTop: 29.1,
    fontWeight: '700',
  },

  logoStyle: {
    width: 350,
    height: 350
  },
});
