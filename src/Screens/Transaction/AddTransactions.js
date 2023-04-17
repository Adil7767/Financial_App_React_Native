// // import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// // import React, { useState } from 'react'
// // // import DropDownPicker from 'react-native-dropdown-picker';
// // import { Dropdown } from '../Components/AddTransaction/DropDown';
// // import { TextInput } from 'react-native-gesture-handler';
// // import { useSelector, useDispatch } from "react-redux";
// // import { RemoveTransaction, AddTransaction, } from "../../redux/actions/UserAction";
// // import Icon from 'react-native-vector-icons/FontAwesome5';
// // import dayjs from "dayjs";
// // var date = dayjs(Date()).format(" MMMM-DD-YYYY");
// // const AddTransactions = ({ navigation }) => {
// //   const myFunction = ({ navigation }) => {
// //     // console.log('hello')
// //     AddATransaction()
// //     navigation.goBack()
// //   }
// //   const dispatch = useDispatch();
// //   const data = useSelector((state) => state)
// //   var AA = data.user.DATA2
// //   console.log('DATA2', AA)
// //   const [input1, setInput1] = useState('');
// //   const [input2, setInput2] = useState('');
// //   const [input3, setInput3] = useState('');
// //   const [input4, setInput4] = useState('');

// //   const [Error, setError] = useState(null);
// //   const AddATransaction = () => {
// //     dispatch(AddTransaction({
// //       id: Math.random() * 10,
// //       title: input1,
// //       amount: input2,
// //       description: input3,
// //       date: date,
// //       total: Math.floor(Math.random() * (Math.random() * 100) * (Math.random() * 100)),

// //     }
// //     )
// //     )

// //     if (Error == '') {
// //       alert('empty transaction')

// //     }
// //     setInput1('')
// //     setInput2('')
// //     // navigation.navigate('MainScreen')

// //   }

// //   const handleInput1Change = (newText) => {
// //     setInput1(newText);
// //     if (input1 == '') {
// //       setError('The input cannot be empty');
// //     } else {
// //       setError(null);
// //     }
// //   };

// //   const handleInput2Change = (newText) => {
// //     setInput2(newText);
// //     if (input2 == '') {
// //       setError('The input cannot be empty');
// //     }
// //     else {
// //       setError(null);
// //     }
// //   };
// //   const handleInput3Change = (newText) => {
// //     setInput3(newText);
// //     if (input3 == '') {
// //       setError('The input cannot be empty');
// //     }
// //     else {
// //       setError(null);
// //     }
// //   };
// //   return (
// //     <View style={[styles.container]}>
// //       <View>
// //         <TextInput style={[styles.txt]}
// //           value={input1}
// //           placeholder='Name'
// //           onChangeText={handleInput1Change}
// //         />

// //         <TextInput style={[styles.txt]}
// //           keyboardType='phone-pad'
// //           value={input2}
// //           placeholder='Rupees'
// //           onChangeText={handleInput2Change}
// //         />
// //         <TextInput style={[styles.txt]}
// //           keyboardType='text'
// //           value={input3}
// //           placeholder='Description :By Jazzcash'
// //           onChangeText={handleInput3Change}
// //         />

// //       </View>
// //       <Button title='Add Transaction'
// //         onPress={() => myFunction({ navigation })
// //         }></Button >

// //     </View>

// //   )

// // }

// // export default AddTransactions

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // backgroundColor:'red'
// //   },
// //   row: {
// //     flexDirection: 'column',
// //     //   justifyContent:'space-between',
// //   },
// //   sign: {
// //     padding: 20,
// //     backgroundColor: 'blue',
// //     borderRadius: 70,
// //     width: '15%',

// //   },
// //   touch: {
// //     justifyContent: 'center',
// //     // alignContent: 'center'
// //   },
// //   txt: {
// //     borderWidth: 2,
// //     color: 'black',
// //     margin: 2
// //   }

// // })



// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
// // import ButtonWithLoader from '../../Components/ButtonWithLoader';
// // import TextInputWithLable from '../../Components/TextInputWithLabel';
// // import validator from '../../utils/validations';
// // import { showError, showSuccess } from '../../utils/helperFunction';
// // import actions from '../../redux/actions';
// // import { showMessage } from 'react-native-flash-message';
// // import { ScrollView } from 'react-native-gesture-handler';
// // import Icon from 'react-native-vector-icons/AntDesign';
// // import { ImagePicker, ShowHide, QuikNavigation, QuikNavigationList } from "../../index";
// // import { useNavigation } from '@react-navigation/native';

// // const AddTransactions = () => {
// //   const navigation = useNavigation()
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [state, setState] = useState({
// //     isLoading: false,
// //     type: '',
// //     description: '',
// //     amount: '',
// //     category: '',
// //     payment_method: 'M',
// //     image: '',
// //     frequency: '',

// //   })
// //   const { isLoading, type, payment_method, description, category, amount,
// //     image, frequency, isSecure } = state
// //   const updateState = (data) => setState(() => ({ ...state, ...data }))




// //   const onAddTransactions = async () => {

// //     updateState({ isLoading: true })

//   try {
//     const res = await actions.transactionadd({
//       type,
//       description,
//       category,
//       amount,
//       payment_method,
//       image,
//       frequency
//     })

//     console.log("res of AddTransactions==>>>>>", res)
//     showMessage("Transaction Add successfully...!!!! ")
//     showSuccess(res.msg)
//     updateState({ isLoading: false })
//     navigation.goBack()
//   }
//   catch (error) {
//     console.log('AddTransactions error', error)
//     // showError(error.msg)
//     // let err = error.errors.non_field_errors;
//     // showError(err)
//     updateState({ isLoading: false })
//     // navigation.goBack()
//   }

// }
// //   return (
// //     <ScrollView style={styles.container}>
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => {
// //           setModalVisible(false);
// //           navigation.navigate('MainScreen')
// //         }}>
// //         <View style={styles.modalView}>
// //           <ImagePicker />

// //           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
// //             <Text style={[styles.txt2]}>Close</Text>
// //           </TouchableOpacity>

// //         </View>

// //       </Modal>

// //       <View >
// //         <TextInputWithLable
// //           label="Type"
// //           placheHolder="Enter your Type"
// //           onChangeText={(type) => updateState({ type })}
// //           keyboardType="text"
// //         />
// //         <TextInputWithLable
// //           label="description"
// //           placheHolder="Enter your descriptio"
// //           onChangeText={(description) => updateState({ description })}
// //           keyboardType="text"
// //         />
// //         {/* category */}
// //         <TextInputWithLable
// //           label=" category"
// //           placheHolder="Enter your  category"
// //           onChangeText={(category) => updateState({ category })}
// //           keyboardType="numeric"
// //           maxLength={13}
// //           minLength={11}
// //         />
// //         <TextInputWithLable
// //           label=" payment_method"
// //           placheHolder="Enter your  payment_method"
// //           onChangeText={(payment_method) => updateState({ payment_method })}
// //           keyboardType="text"
// //           maxLength={11}
// //           minLength={1}
// //         />
// //         <TextInputWithLable
// //           label="amount"
// //           placheHolder="Enter your amount"
// //           onChangeText={(amount) => updateState({ amount })}
// //           keyboardType="amount-address"
// //         />
// //         <ShowHide navigation={navigation} title='More/Less Oprtions ' data={
// //           <TouchableOpacity onPress={() => {
// //             setModalVisible(true)
// //           }}>
// //             <Icon
// //               name="camera"
// //               style={[styles.icon]}
// //             ></Icon>
// //           </TouchableOpacity>} />
// //         <TextInputWithLable
// //           label="frequency"
// //           placheHolder="Enter your frequency"
// //           // isSecure={isSecure}
// //           secureTextEntry={isSecure}
// //           onChangeText={(frequency) => updateState({ frequency })}
// //           keyboardType="image"
// //           maxLength={20}
// //           minLength={4}
// //         />
// //         <View style={[styles.btn]}>

// //           <ButtonWithLoader
// //             text="AddTransactions"
// //             onPress={onAddTransactions}
// //             isLoading={isLoading}
// //           />
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 24,
// //     backgroundColor: 'white',

// //   },
// //   button: {
// //     flex: 0,
// //     justifyContent: 'flex-end',
// //     // marginBottom: 36
// //   },
// //   modalView: {
// //     flex: 0,
// //     margin: 40,
// //     marginVertical: '60%',
// //     height: '30%',
// //     // backgroundColor: 'blue',

// //     // backgroundColor: 'red'
// //     borderWidth: 1
// //   }, txt2: {
// //     fontWeight: '600',
// //     fontSize: 20,
// //     flex: 0,
// //     textAlign: 'center',
// //     // margin: 8,
// //     color: '#26bc9e',

// //     backgroundColor: 'red'
// //   },
// //   btn: {
// //     alignItems: 'center',
// //   },
// //   icon: {

// //     color: "#483d8b",
// //     fontSize: 30,
// //     backgroundColor: '#E8E8E8',
// //     padding: 10,
// //     alignItems: 'center',

// //   },
// // });


// // export default AddTransactions;





















import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import actions from '../../redux/actions';
import RNFS from 'react-native-fs';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { date } from 'is_js';
const AddTransactions = () => {
  const navigation = useNavigation();
  const txt = useSelector((state) => state)
  var token = txt?.user?.token
  const accessToken = token?.token?.access;
  // const [image, setImage] = useState();
  const [state, setState] = useState({
    isLoading: false,
    type: '',
    description: '',
    amount: '',
    category: '',
    payment_method,
    frequency: '',
    image: null,
  })
  const { isLoading, type, image, payment_method, description, category, amount,
    frequency, isSecure } = state
  const updateState = (data) => setState(() => ({ ...state, ...data }))
  console.log('payload', state)
  // console.log('image', image)

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
      mediaType: 'photo',
      includeBase64: true,
      fileName: Date.now(),


    },
  };
  const handleImagePick = () => {
    try {
      launchImageLibrary(options, async (response) => {
        // console.log(response)
        // const file_uri = response['assets'][0]['uri'];
        // console.log("FILE URI", file_uri);

        const formData = new FormData();
        const filePayload = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName, type: response.assets[0].type
        }
        formData.append('file', filePayload)
        // setImage(formData._parts[0])
        updateState({ image: formData });

        // updateState(filePayload)
      });
    } catch (error) {
      console.log('Error Adding image', error);
      updateState({ isLoading: false });
    }
  };

  const validateFields = () => {
    const { type, description, amount, category } = state;
    if (!type || !description || !amount || !category) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return false;
    }
    return true;
  };

  const onAddTransactions = async () => {
    const isValid = validateFields();
    if (!isValid) return;
    updateState({ isLoading: false })
    try {
      console.log('image file', image)
      console.log('data', state.description)
      const res = await actions.transactionadd({
        type,
        description,
        category,
        amount,
        payment_method,
        image,
        frequency
      },
        // {
        //   'Authorization': `Bearer ${accessToken}`,
        //   // 'Content-Type': 'multipart/form-data'
        //   // 'Content-Type': 'application/json'
        // }

      )
      console.log("res of AddTransactions==>>>>>", res)
      showMessage("Transaction Add successfully...!!!! ")
      showSuccess(res.msg)
      updateState({ isLoading: false })
      navigation.goBack()
    }
    catch (error) {
      console.log('AddTransactions error', error)

      updateState({ isLoading: false })
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TextInputWithLabel
          label="Type"
          placeholder="Enter Type"
          onChangeText={(type) => updateState({ type })}
          keyboardType="numeric"
          maxLength={20}
          minLength={1}
        />
        <TextInputWithLabel
          label="Description"
          placeholder="Enter Description"
          onChangeText={(description) => updateState({ description })}
          keyboardType="default"
          maxLength={100}
          minLength={1}
        />
        <TextInputWithLabel
          label="Amount"
          placeholder="Enter Amount"
          onChangeText={(amount) => updateState({ amount })}
          keyboardType="numeric"
          maxLength={8}
          minLength={1}
        />
        <TextInputWithLabel
          label="Category"
          placeholder="Enter Category"
          onChangeText={(category) => updateState({ category })}
          keyboardType="numeric"
          maxLength={20}
          minLength={1}
        />
        <TextInputWithLabel
          label="Payment Method"
          placeholder="Enter Payment Method"
          onChangeText={(payment_method) => updateState({ payment_method })}
          maxLength={1}
          minLength={1}
          keyboardType="numeric"
        />
        <TouchableOpacity
          // style={styles.imageContainer}
          onPress={handleImagePick}>
          <Icon name="camera" size={30} color="#bfbfbf" />
        </TouchableOpacity>
        <TextInputWithLabel
          label="Frequency"
          placeholder="Enter Frequency"
          onChangeText={(frequency) => updateState({ frequency })}
          keyboardType="text"
          maxLength={20}
          minLength={1}
        />
        <View style={styles.buttonContainer}>
          <ButtonWithLoader
            isLoading={isLoading}
            text="Add"
            onPress={onAddTransactions}
            title="Add Transactions"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#bfbfbf',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddTransactions;    