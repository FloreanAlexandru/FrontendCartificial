import React, {Component} from 'react';
import {View, StatusBar, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import BackImg from '../images/LogRegPhoto.jpg';
import FlatButton from './button';
import {Actions} from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScene = () => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    token: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const storeToken = async (token) => {
    try {
        console.log("salut");
        await AsyncStorage.setItem('token',token);
    } catch (error) {
      console.log("LocalStorage");
    }
  }

  const handleOnLogin = () => {
    //console.warn(data.username + " " + data.password);
   
     const authData = {
      username: data.username,
      password: data.password,
    };

    axios
      .post("http://10.0.2.2:5000/api/auth/login", authData)
      .then((response) => {
        //console.log(response.data);
        if(response.data.token != ''){
          storeToken(response.data.token);
          Actions.main();
        }
        Alert.alert('Utilizator conectat cu succes');
      })
      .catch((err) => {
        console.log(err);
      
        if (data.username == '' && data.password != '') {
            Alert.alert('Introduceti un nume de utilizator !');
        } else if (data.password == '' && data.username != '') {
            Alert.alert('Introduceti o parola !');
        } else if (data.password == '' && data.username == '') {
            Alert.alert('Introduceti datele in campurile precizate!');
        } else {
            Alert.alert('Parola, user gresite sau contul nu exista!');
        }
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={BackImg} style={styles.image}></ImageBackground>
      <StatusBar backgroundColor="#000000"/>
      <Animatable.View animation="zoomIn">
        <View style={{marginBottom: 10}}>
          <Text style={styles.text_header}>Nume de utilizator</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="white" size={25} />
            <TextInput
              placeholder="Utilizator"
              placeholderTextColor="red"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? 
              <Animatable.View animation="zoomIn">
                <Feather name="check-circle" color="white" size={25} />
              </Animatable.View>
             : 
             <Animatable.View animation="zoomOut">
                <Feather name="check-circle" color="white" size={25} />
              </Animatable.View>}
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation="zoomIn">
        <View style={{marginBottom: 70}}>
          <Text style={styles.text_header}>Parolă</Text>
          <View style={styles.action}>
            <Feather name="lock" color="white" size={25} />
            <TextInput
              placeholder="Parolă"
              placeholderTextColor="red"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? 
                <Feather name="eye-off" color="white" size={25} />
               : 
                <Feather name="eye" color="white" size={25} />
              }
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>

      <Animatable.View animation="slideInLeft">
        <FlatButton
          text="Logare"
           onPress={() => {
             handleOnLogin();
           }}
        />
      </Animatable.View>

      <Animatable.View animation="slideInRight">
        <Text></Text>
        <FlatButton
          text="Înregistrare"
          onPress={() => {
            Actions.register();
          }}
        />
      </Animatable.View>
      <Text></Text>
    </View>
  );
};

export default AuthScene;

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

  text_header: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    color: 'white',
    width: 300,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'white',
    fontSize: 15,
  },
});



  // const tokenStore = async ( val ) => {
  //   try {
  //       await AsyncStorage.setItem('token',value);
  //   } catch (e) {
  //       console.log(e);
  //   }
  // }

  // const storeUserPass = async ( val ) => {
  //   try{
  //       await AsyncStorage.setItem('username', val.username);
  //       await AsyncStorage.setItem('password', val.password);
  //   } catch (e) {
  //       console.log(e);
  //   }
  // }

  // const LogInHandler = () => {
  //   axios.post('http://localhost:5000/api/auth/login', {
  //     username: data.username,
  //     password: data.password,
  //   })
  //   .then((response){
  //     data.token = response.data.token;
  //     if(response)
  //   })
  // }