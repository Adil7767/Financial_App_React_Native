import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {
  TransactionList,
  AllTransactionHeader,
  Income, Others,
  Expences,
  TotalOfTransactions,
  Expence
} from "../../index"
import { useNavigation } from '@react-navigation/native';
import TransactionAddButton from '../../Components/TransactionAddButton';
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

const AllTransactions = () => {


  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('Expences');
  const [activeButtonText, setActiveButtonText] = useState('Expences');

  const handleExpencesPress = () => {
    setActiveButton('Expences');
    setActiveButtonText('Expences');
  };

  const handleIncomePress = () => {
    setActiveButton('Income');
    setActiveButtonText('Income');
  };
  const handleOthersPress = () => {
    setActiveButton('Others');
    setActiveButtonText('Others');
  };

  const renderScreen = () => {
    if (activeButton === 'Expences') {
      // const type_name = 'EXPENSE'
      return (
        <View style={styles.list}>
          <TotalOfTransactions type={5} />
          <Expence />

          {/* <TransactionList type_name={type_name} /> */}
        </View>
      );
    } else if (activeButton === 'Income') {
      // const type_name = 'INCOME'

      return (
        <View>
          <TotalOfTransactions type={6} />
          {/* <TransactionList type_name={type_name} /> */}

          <Income />
        </View>
      );
    } else if (activeButton === 'Others') {


      return (
        <View>
          <TotalOfTransactions type={6} />
          <TransactionList />
          <Others />
        </View>

      )
        ;
    }
  };







  return (


    <View style={styles.container}>
      <View style={[styles.customHeader]}>
        <View style={[styles.header]}>
          <TouchableOpacity style={styles.view}
            onPress={() => {
              navigation.navigate("MainScreen")
            }}
          >
            <Icon
              name="arrowleft"
              style={[styles.icon]}
            >
            </Icon>
          </TouchableOpacity>

          <View style={[styles.view, styles.font]}>
            <Text style={[styles.font]}> Trans.FIlter </Text>
          </View>
          <TouchableOpacity style={styles.view}
            onPress={() => {
              navigation.navigate('Bills')
              //api work for filtered values
            }}
          >
            <Icon
              name="filter"
              style={[styles.icon]}
            >
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view}
            onPress={() => {
              navigation.navigate('Bills')
            }}

          >
            <Icon
              name="search1"
              style={[styles.icon]}
            >
            </Icon>
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity style={styles.view}
              onPress={() => {
                navigation.navigate('SearchBoxModal')
              }}>
              <Icon
                name="ellipsis1"
                style={[styles.iconellipsis1]}
              ></Icon>
            </TouchableOpacity>
          </View>

        </View >
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'Expences' && styles.activeButton,
            ]}
            onPress={handleExpencesPress}>
            <Text
              style={[
                styles.buttonText,
                activeButtonText === 'Expences' && styles.activeButtonText,
              ]}>
              Expences
            </Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'Income' && styles.activeButton,
            ]}
            onPress={handleIncomePress}>
            <Text
              style={[
                styles.buttonText,
                activeButtonText === 'Income' && styles.activeButtonText,
              ]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === 'Others' && styles.activeButton,
            ]}
            onPress={handleOthersPress}>
            <Text
              style={[
                styles.buttonText,
                activeButtonText === 'Others' && styles.activeButtonText,
              ]}>
              Others
            </Text>
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </View>



      <View style={styles.screenContainer}>{renderScreen()}</View>

      <TransactionAddButton style={styles.tab} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  customHeader: {
    backgroundColor: '#483d8b',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  activeButton: {
    borderBottomWidth: 1,
  },
  buttonText: {

    fontSize: 20
  },
  activeButtonText: {
    color: 'white',
    fontSize: 20
  },
  screenContainer: {
    flex: 1,
  },

  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },
  view: {
    margin: 20,
    justifyContent: 'space-between'

  },
  font: {
    fontSize: 15,
    fontStyle: 'bold',
    fontWeight: '500',
    color: "white",
  },
  iconellipsis1: {
    color: "white",
    fontSize: 25,
    transform: [{ rotate: '90deg' }],
  },
  icon: {
    color: "white",
    fontSize: 25
  },



});

export default AllTransactions