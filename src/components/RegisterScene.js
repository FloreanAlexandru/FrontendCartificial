import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native';
import BackImg from '../images/LogRegPhoto.jpg';
import FlatButton from './button';
import {Actions} from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import axios from 'axios'; 

const RegisterScene = () => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    check_textInputChange: false,
    check_emailInputChange: false,
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

  const textInputChange1 = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false,
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

  const handleOnRegister = () => {
     //console.warn(data.username + " " + data.password + " " + data.email);
   
     const authData = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    axios
      .post("http://10.0.2.2:5000/api/auth/signup", authData)
      .then((response) => {
        console.warn(response);
        if(data.username != '' && data.password !='' && data.email != '') {
          Actions.main();
        }
      })
      .catch((err) => {
        console.log(err);

        if (data.username == '' && data.password != '' && data.email !='') {
            Alert.alert('Introduceti un nume de utilizator !');
        } else if (data.password == '' && data.username != '' && data.email != '') {
            Alert.alert('Introduceti o parola !');
        } else if (data.password != '' && data.username != '' && data.email == '') {
            Alert.alert('Introduceti o adresa de email !');
        } else if (data.password == '' && data.username == '' || data.password == '' && data.email == '' || data.email == '' && data.username == '') {
            Alert.alert('Nu ati completat toate campurile !');
        } else if (data.password != '' && data.username != '' && data.email != '') {
            Alert.alert('Numele de utilizator sau emailul sunt deja folosite !');
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
      <View style={{marginBottom: 10}}>
        <Text style={styles.text_header}>E-mail</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="white" size={25} />
          <TextInput
            placeholder="Adresă de e-mail"
            placeholderTextColor="red"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange1(val)}
          />
          {data.check_emailInputChange ? 
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
          text="Înregistrare"
          // onPress={() => {
          //   Actions.main();
          // }}
          onPress={ handleOnRegister }
        />
      </Animatable.View>
      <Text></Text>

      <Animatable.View animation="slideInRight">
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
};

export default RegisterScene;

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
