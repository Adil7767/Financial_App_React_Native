import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Chart } from "../../index";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
var date = dayjs(Date()).format(" MMMM-YYYY");
const Card = ({ navigation }) => {
  const data = useSelector((state) => state)
  var sum = data.user.TotalSum
  console.log('card Sum', sum)
  return (
    <View style={[styles.box]}>
      <Text style={[styles.txt1]}>Expenses</Text>
      <View style={[{ flex: 0, flexDirection: 'row', margin: 10, }]}>
        <View style={[styles.rs]} >
          <TouchableOpacity >
            <Text style={[styles.txt2]}>Rs : {sum}</Text>
            <Text style={[styles.txt3]}>{date}</Text>
          </TouchableOpacity >
          <TouchableOpacity >

            <Text style={[styles.txt2]}> Rs 26%</Text>
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