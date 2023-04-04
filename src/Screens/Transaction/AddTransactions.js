import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from '../Components/AddTransaction/DropDown';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux";
import { RemoveTransaction, AddTransaction, } from "../../redux/actions/User/UserAction";
import Icon from 'react-native-vector-icons/FontAwesome5';
import dayjs from "dayjs";
var date = dayjs(Date()).format(" MMMM-DD-YYYY");
const AddTransactions = ({ navigation }) => {
  const myFunction = ({ navigation }) => {
    // console.log('hello')
    AddATransaction()
    navigation.goBack()
  }
  const dispatch = useDispatch();
  const data = useSelector((state) => state)
  var AA = data.user.DATA2
  console.log('DATA2', AA)
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  const [Error, setError] = useState(null);
  const AddATransaction = () => {
    dispatch(AddTransaction({
      id: Math.random() * 10,
      title: input1,
      amount: input2,
      description: input3,
      date: date,
      total: Math.floor(Math.random() * (Math.random() * 100) * (Math.random() * 100)),

    }
    )
    )

    if (Error == '') {
      alert('empty transaction')

    }
    setInput1('')
    setInput2('')
    // navigation.navigate('MainScreen')

  }

  const handleInput1Change = (newText) => {
    setInput1(newText);
    if (input1 == '') {
      setError('The input cannot be empty');
    } else {
      setError(null);
    }
  };

  const handleInput2Change = (newText) => {
    setInput2(newText);
    if (input2 == '') {
      setError('The input cannot be empty');
    }
    else {
      setError(null);
    }
  };
  const handleInput3Change = (newText) => {
    setInput3(newText);
    if (input3 == '') {
      setError('The input cannot be empty');
    }
    else {
      setError(null);
    }
  };
  return (
    <View style={[styles.container]}>
      <View>
        <TextInput style={[styles.txt]}
          value={input1}
          placeholder='Name'
          onChangeText={handleInput1Change}
        />

        <TextInput style={[styles.txt]}
          keyboardType='phone-pad'
          value={input2}
          placeholder='Rupees'
          onChangeText={handleInput2Change}
        />
        <TextInput style={[styles.txt]}
          keyboardType='text'
          value={input3}
          placeholder='Description :By Jazzcash'
          onChangeText={handleInput3Change}
        />

      </View>
      <Button title='Add Transaction'
        onPress={() => myFunction({ navigation })
        }></Button >

    </View>

  )

}

export default AddTransactions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  row: {
    flexDirection: 'column',
    //   justifyContent:'space-between',
  },
  sign: {
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 70,
    width: '15%',

  },
  touch: {
    justifyContent: 'center',
    // alignContent: 'center'
  },
  txt: {
    borderWidth: 2,
    color: 'black',
    margin: 2
  }

})