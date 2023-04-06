// //import liraries
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Modal, Button } from 'react-native';
// import { Help } from '../../../index';
// import { useNavigation } from '@react-navigation/native';

// // create a component
// const Help = () => {
//   const navigation = useNavigation();
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [modalVisible, setModalVisible] = useState(true);
//   const back = () => {
//     setModalVisible(false)
//     navigation.navigate('MainScreen')
//   }
//   return (
//     <View style={[styles.container]}>
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.container}>
//           {/* <Help navigation={navigation} /> */}
//           <Text>Hello</Text>
//           < View style={styles.button}>

//             <Button title='Close Modal' onPress={() => back()}>
//             </Button>
//           </View>
//         </View>
//       </Modal >
//     </View >
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 40,
//     marginVertical: '60%',
//     height: '50%',
//     backgroundColor: 'white',

//     // backgroundColor: 'red'
//     borderWidth: 1
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     // marginBottom: 36
//   },



// })


// export default Help;

import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
const Help = ({ navigation }) => {


  return (
    <View style={[styles.container]}>
      <View style={styles.top}>
        <Image
          style={[styles.icon]}
          source={require('../../../assets/logo.png')} />

        <Text style={styles.TopText}>AdArt </Text>

      </View >

      <Text style={styles.txt1}>Data backup allow you to keep backup of your AdArt data onn your own Google drive which can be restored incase you lose your phone or switch to new one.</Text>
      <Text style={[styles.txt3]}>Do you still want to dissable the backup?</Text>
      {/* <View style={[styles.shedule]}> */}
      <TouchableOpacity style={[styles.enabled_disabled]}>
        <Text style={styles.txt2}>YES, DISABLE BACKUP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.enabled_disabled]}>
        <Text style={styles.txt2}>NO, KEEP IT ENABLED</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View >
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // paddingVertical: 30
  },


  enabled_disabled: {
    paddingVertical: 6
  },
  shedule: {
    flex: 0,
    justifyContent: 'flex-end',
    marginTop: '9%'
    // marginBottom: 36
  },
  txt1: {
    // marginTop: 20,
    fontSize: 16,
    marginHorizontal: 18
  },
  txt3: {
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 18


  },
  txt2: {
    fontWeight: '800',
    flex: 0,
    textAlign: 'right',
    margin: 8,
    color: '#26bc9e'

    // backgroundColor: 'red'
  },
  top: {
    flexDirection: 'row',
    // marginTop: 20,
    backgroundColor: 'purple1',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },

  TopText: {
    fontSize: 20,
    color: '#000',
    marginHorizontal: 10,
    marginTop: 6,
    fontWeight: '500'
  },
  icon: {
    flex: 0,
    color: 'black',
    fontSize: 25,
    marginVertical: 10,
    marginLeft: 20

  },
})
