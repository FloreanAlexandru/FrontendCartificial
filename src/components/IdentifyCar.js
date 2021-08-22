import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity, TextInput, Alert} from 'react-native';
import BackImg from '../images/carIdentifier.jpg';
import FlatButton from './button';
import {Actions} from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import FormData from 'form-data';

const IdentifyCar = () => {

         const retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    console.log(value);
                    return value;
                }
            } catch (error) {
                console.log(error);
            }
        }

        const takePhotoFromCamera = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                allowsEditing: true,
            }).then(image => {
                console.log(image);
            });
        }
        
         const takePhotoFromLibrary = () => {
            ImagePicker.openPicker({
                width: 1400,
                height: 900,
                cropping: true,
                allowsEditing: true,
            }).then(async image => {
                token = await retrieveData();
                //console.log("IMAGINE",image);

                let localUri = image.path;
                //console.log(localUri)
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`; 
                
                let data = new FormData();
                data.append('image', { uri: localUri, name:'photo.png',
                                    filename: filename, type: type });
                data.append('Content-Type','image/png');

                console.log(data);
                //console.log(token); 
               
                config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': `multipart/form-data`
                    }
                }
                
                await axios.post('http://10.0.2.2:5000/api/carIdentifier', data, config     
                ).then(response => {
                    Alert.alert('Mașina este: ',JSON.stringify(response.data[0]));
                    console.log(response.data);
                    Alert.alert('S-a identificat mașina'); 
                })
                .catch((err) => {
                    Alert.alert('A apărut o eroare în identificarea mașinii');
                    console.log("mâncărică la burtică");
                    console.log(err);
                })
                console.log(config);
            });
        }

        renderInner = () => (
            <View style={styles.panel}>
                <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                    <Text style={styles.panelButtonTitle}> Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromLibrary}>
                    <Text style={styles.panelButtonTitle}> Choose a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={() => this.bs.current.snapTo(1)}>
                    <Text style={styles.panelButtonTitle} > Cancel</Text>
                </TouchableOpacity>
            </View>
        );

        renderHeader =() => (
            <View style={styles.header}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                </View>
            </View>
        );

        bs = React.createRef();
        fall = new Animated.Value(1);

        return(
            <View style={styles.container}>
                
                <ImageBackground
                    source={BackImg}
                    style={styles.image}>
                </ImageBackground>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[330,0]}
                    initialSnap={1}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    callbackNode={this.fall}
                    enabledGestureInteraction={true}
                />
               
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <View style={{margin:20}}> 
                    <View style = {{alignItems:'center'}}>
                    <Icon name="camera" size={75} color="#fff" style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor:'#fff',
                            borderRadius:10,  
                        }}
                        />                    
                    </View>
                </View>
            </TouchableOpacity>


                <Animatable.View animation="fadeIn">
                    <FlatButton
                    text="Înapoi"
                    style={styles.container}
                    onPress={() => {
                    Actions.main();
                    }}
                    />
                </Animatable.View>
                <Text></Text>
        </View>
        );
}

export default IdentifyCar;

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
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
