

// import React from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   Text,

// } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector } from "react-redux";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Item = ({ title, amount, total, date, description }) => (

//   <View style={styles.item}>
//     <Icon name='rotate-3d-variant' size={40} style={[styles.icon]} />
//     <View style={[styles.right, styles.rw]}>
//       <View style={styles.clm}>
//         <Text style={styles.title}>{title}</Text>
//         {/* <Text style={styles.amount}>RS:{amount}</Text> */}
//         <Text style={[styles.date]}>{date}</Text>
//         <Text style={[styles.date]}>{description}</Text>

//       </View>
//       <View style={styles.clm}>
//         <Text style={[styles.amount]} >RS:{amount}</Text>
//         <View style={[styles.rw]}>
//           <Icon name='bank' size={30} style={[styles.icon]} />
//           <Text style={[styles.amount]} >{total}</Text>
//         </View>
//         {/* <Text style={styles.title}>N</Text> */}
//       </View>
//     </View>
//   </View>
// );
// const TransactionList = () => {
//   const data = useSelector((state) => state)
//   // const DATA=useSelector((state) => state)
//   var aa = data.user.DATA2
//   // var aa=data.user.transactions=data.user.transactions.push(1)
//   // console.log('aa', aa)

//   return (


//     <FlatList
//       data={aa}
//       renderItem={({ item }) => <Item title={item.title}
//         amount={item.amount} total={item.total}
//         date={item.date}
//         description={item.description} />

//       }
//       keyExtractor={item => item.id}
//     />



//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // marginTop: 10,

//   },
//   item: {
//     padding: 10,
//     // marginVertical: 8,
//     marginHorizontal: 10,
//     flexDirection: 'row',
//     backgroundColor: "white",
//     alignItems: 'center',


//   },
//   title: {
//     maxWidth: "100%",
//     // fontSize: 20,
//     color: 'black'
//   },
//   amount: {
//     fontSize: 20,
//     textAlign: 'right',
//     color: 'black'
//   },

//   icon: {
//     flex: 0,
//     paddingRight: 5,
//     color: 'green',
//   },
//   right: {
//     flex: 1,
//     justifyContent: "space-between",

//   },
//   date: {
//     textAlignVertical: 'bottom',
//     color: 'black'
//   },
//   clm: {
//     flexDirection: 'column'
//   },
//   rw: {
//     flexDirection: 'row',
//   }

// });

// export default TransactionList;







import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';


const Transactionlist = () => {

  const [result, setresult] = useState()
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const txt = useSelector((state) => state)
  var token = txt?.user?.token
  const accessToken = token?.token?.access;
  const DATA = useSelector((state) => state.user);
  const Data = DATA.userData;


  useEffect(() => {
    onTransactionlist()
  }, []);

  const onTransactionlist = async () => {

    try {
      const res = await actions.transaction({
        amount: 200,
        category: 1,
        description: 'by hand',
        frequency: 'daily',
        payment_method: 1,
        type: 1,

      },






      )

      console.log("res of Transactionlist==>>>>>", res)
      // showMessage("password Change successfully...!!!! Please ReLogin")

      // showSuccess(res)
      // navigation.navigate('MainScreen')
    }
    catch (error) {
      console.log('Transactionlist error', error)
      // let err = error.errors.trans_type;
      // showError(err)


      // navigation.goBack()
    }

  }



  return (

    <View >
      {/* <Text style={[styles.txt]}>{result}</Text> */}
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',

  },
  btn: {
    alignItems: 'center'
  },
  txt: {
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'aqua'
  }

});


export default Transactionlist;
