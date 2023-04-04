import React from 'react'
import { Button } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux";

import {
  BillsCard,
  Card,
  Control,
  CreateBudget,
  MainScreenHeader,
  TransactionList,
  AllTransactions,
  MyWidget,
} from '../../index'
// import { BackHandler } from 'react-native';

const MainScreen = ({ navigation }) => {
  const data = useSelector((state) => state)
  var sum = data.user.TotalSum
  // var aa=data.user.transactions=data.user.transactions.push(1)
  // console.log('sum', sum)

  // React.useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       alert('You cannot go back from  if u want u need to logout');
  //       return true;
  //     },
  //   );

  //   return () => backHandler.remove();
  // }, []);



  return (
    <View>
      <ScrollView style={[styles.main]}>
        <MainScreenHeader navigation={navigation} AdArt='AdArt' />
        <Card navigation={navigation} />
        <View style={[styles.lst]}>
          <Text style={[styles.txt]}>Latest transaction</Text>
          {/* <ScrollView > */}
          <TransactionList />
          {/* </ScrollView> */}
          <TouchableOpacity onPress={() => {
            navigation.navigate('AllTransactions')
          }}>
            <Text style={[styles.txt]}>View Details</Text>
          </TouchableOpacity>
        </View>



        <View style={[styles.rw]}>

          <TouchableOpacity style={[styles.sidebyside, styles.rw]} onPress={() => {
            navigation.navigate('AllTransactions')
          }}>
            <Icon name='cash' size={32} style={[styles.icon, { color: 'green' }]} />
            <View style={[styles.clm]}>
              <Text>Cash in hand</Text>
              <Text >     {sum}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rw, styles.sidebyside]} onPress={() => {
            navigation.navigate('Accounts')
          }}>

            <Icon name='bank' size={32} style={[styles.icon, { color: 'blue' }]} />
            <Text >Accounts</Text>
          </TouchableOpacity>

        </View>
        <BillsCard navigation={navigation} />
        <CreateBudget navigation={navigation} />
        <Control navigation={navigation} />
        {/* <MyWidget navigation={navigation} title='AdArt' abd={<TransactionList />} /> */}
        {/* <PasswordValidation /> */}
      </ScrollView>
      <TouchableOpacity style={styles.TrnsitionBtn}
        onPress={() => {
          navigation.navigate('AddTransactions')
        }}>
        <Icon
          name="plus"
          style={[styles.icon]}
        >
        </Icon>
      </TouchableOpacity>
    </View>

  )
}

export default MainScreen

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#D9D9D9',

  },
  txt: {
    padding: 8,
    fontSize: 30,
    backgroundColor: "#FBFBFB",
    marginHorizontal: 10,
    color: 'black'

  },
  lst: {
    maxHeight: 360
  },
  clm: {
    flexDirection: 'column'
  },
  rw: {
    flexDirection: 'row',
  },
  sidebyside: {
    margin: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  TrnsitionBtn: {
    backgroundColor: '#F419C9',
    height: 50,
    bottom: 0,
    // right: -200,
    left: '80%',
    top: '92%',
    position: 'absolute',
    width: 50,
    borderRadius: 50
  },
  icon: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: '#fff'
  },
})
