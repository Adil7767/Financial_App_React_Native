import React, { useState } from 'react';
import {
  Modal,
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BackgroungImage, NavList, QuikNavigation, QuikNavigationList } from '../../../index';

const DrawerModal = ({ navigation }) => {
  return (

    <View style={styles.container}>
      <BackgroungImage navigation={navigation} />
      <View>
        <TouchableOpacity style={[styles.rw, styles.icon]}
          onPress={() => { navigation.navigate('MainScreen') }}
        >
          <Image
            style={[styles.img]}
            source={require('../../../assets/logo.png')} />
          <Text style={[styles.txt]}>Home</Text>
        </TouchableOpacity>
      </View>
      <QuikNavigation navigation={navigation} title='Quik Navigation' data={<QuikNavigationList navigation={navigation} />} />
      <NavList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    height: '100%',
    backgroundColor: '#FAFAFA',


  },
  icon: {
    color: "#483d8b",
    fontSize: 30,
    backgroundColor: '#E8E8E8',
    padding: 10,

  },
  rw: {
    flexDirection: 'row',
  },
  txt: {
    color: '#2495EB',
    // textAlign: 'center',
    paddingLeft: 20,
    fontSize: 16,
  },
  img: {
    width: 28,
    height: 28,
  }


});

export default DrawerModal;