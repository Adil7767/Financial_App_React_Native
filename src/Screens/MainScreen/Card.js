import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import { Chart } from "../../index";
import dayjs from "dayjs";
var date = dayjs(Date()).format(" MMMM-YYYY");
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
const Card = () => {
  const [result, setresult] = useState()
  const [trans_type, settrans_type] = useState(5)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const txt = useSelector((state) => state)
  var token = txt?.user?.token
  const accessToken = token?.token?.access;

  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // for (let i = 0; i <= array.length; i++) {
  //   // const element = array[i];
  //   console.log(i)
  //   // settrans_type(i)

  // }

  useEffect(() => {
    onTotalOfTransactions(trans_type)
  }, [trans_type]);
  const onTotalOfTransactions = async (trans_type) => {
    console.log('trans_type', trans_type)
    try {
      const res = await actions.total_transaction({
        trans_type,
      },
        {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      )
      console.log("res of TotalOfTransactions==>>>>>", res)
      var sum = res.data.amount__sum;
      setresult(sum)
    }
    catch (error) {
      console.log('TotalOfTransactions error', error)
      // let err = error.errors.trans_type;
      showError(error.msg)


      // navigation.goBack()
    }

  }



  return (
    <View style={[styles.box]}>
      <Text style={[styles.txt1]}>Expenses</Text>
      <View style={[{ flex: 0, flexDirection: 'row', margin: 10, }]}>
        <View style={[styles.rs]} >
          <TouchableOpacity >
            <Text style={[styles.txt2]}>Rs : {result}</Text>
            <Text style={[styles.txt3]}>{date}</Text>
          </TouchableOpacity >
          <TouchableOpacity >

            <Text style={[styles.txt2]}>  ~36%</Text>
            <Text style={[styles.txt3]}>of monthly avg</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Chart navigation={navigation} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Expences')
        }}
      >
        <Text style={[styles.details]}>View Detials</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 0,
    borderWidth: 1,
    margin: 10,
    padding: 2,
    backgroundColor: 'white'
  },
  rs: {

    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  details: {
    borderTopWidth: 2,
    padding: 10,
    color: 'purple',
    fontSize: 20,
  },
  txt1: {
    fontSize: 25,
    color: 'black',
    marginLeft: 5
  },
  txt2: {
    fontSize: 20,

    color: "#483d8b"
  },
  txt3: {
    fontSize: 18,
  }

});
export default Card