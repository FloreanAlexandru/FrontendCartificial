import React, {Component} from 'react';
import {View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity, TextInput} from 'react-native';
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


const IdentifyCar = () => {

        const takePhotoFromCamera = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
            });
        }
        const takePhotoFromLibrary = () => {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
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
