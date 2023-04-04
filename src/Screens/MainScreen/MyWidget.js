import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TransactionList } from "../../index";
const MyWidget = ({ navigation }) => (
  <View style={styles.flx}>
    <View style={[styles.header]}>
      <Text style={styles.title}>AdArt</Text>
      <TouchableOpacity style={styles.view}>
        <Icon
          name="clock"
          style={[styles.icon]}
          onPress={() => navigation.navigate('Bills')}></Icon>
      </TouchableOpacity>
      <TouchableOpacity style={styles.view}>
        <Icon
          name="plus"
          style={[styles.icon]}
          onPress={() => navigation.navigate('AddTransactions')}
        ></Icon>
      </TouchableOpacity>
    </View>
    <TransactionList />
    {/* <Text style={styles.abd}>{abd}</Text> */}
  </View>

);

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#483d8b',
    marginHorizontal: 10
  },
  abd: {
    marginTop: 8,


  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  },
  view: {
    margin: 10,
  },
  font: {
    fontSize: 35,
    fontStyle: 'bold',
    fontWeight: '500',
    color: "#483d8b",
  },
  icon: {
    color: "#483d8b",
    fontSize: 30,
  },
  flx: {
    flex: 1,

  }
});

export default MyWidget;
