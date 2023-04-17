

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


// <FlatList
//   data={aa}
//   renderItem={({ item }) => <Item title={item.title}
//     amount={item.amount} total={item.total}
//     date={item.date}
//     description={item.description} />

//   }
//   keyExtractor={item => item.id}
// />



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
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { category } from '../../redux/actions/admin';


const TransactionList = () => {

  const [result, setresult] = useState()
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const txt = useSelector((state) => state)
  var token = txt?.user?.token
  const accessToken = token?.token?.access;
  const DATA = useSelector((state) => state.user);
  const Data = DATA.userData;


  useEffect(() => {
    onTransactionList()
  }, []);

  const onTransactionList = async () => {

    try {
      const res = await actions.transactionget({
        // trans_type,
      },
        {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      )

      console.log("res of TransactionList==>>>>>", res.results)


      setresult(res.results)
      // showSuccess(res.results.id)
      // navigation.navigate('MainScreen')
    }
    catch (error) {
      console.log('TransactionList error', error)
      // let err = error.errors.trans_type;
      showError('plz Login Again')

    }

  }





  const Item = ({ title, amount, total, date, description,
    category_name, frequency, id, imagename, payment_method, payment_method_name,
    type, type_name
  }) => (

    <View style={styles.item}>
      <Image
        style={[styles.img]}
        source={{ uri: imagename }}
      />
      {/* {console.log("ite++++++", imagename) } */}
      {/* <Icon name={imagename} size={40} style={[styles.icon]} /> */}
      <View style={[styles.right, styles.rw]}>
        <View style={styles.clm}>
          <Text style={styles.id}>{id}</Text>
          {/* <Text style={styles.image}></Text> */}
          {/* <Text style={styles.title}>{title}</Text>
          <Text style={[styles.date]}>{date}</Text> */}
          <Text style={styles.type_name}>{type_name}</Text>
          {/* <Text style={styles.category_name}>cn:{category_name}</Text> */}
          {/* <Text style={styles.frequency}>f:{frequency}</Text> */}
          {/* <Text style={styles.payment_method}>pm:{payment_method}</Text> */}
          {/* <Text style={styles.payment_method_name}>pmn:{payment_method_name}</Text> */}
          {/* <Text style={styles.type}>type:{type}</Text> */}
          <Text style={[styles.description]}>{description}</Text>
          {/* <Text style={styles.payment_method_name}>{payment_method_name}</Text> */}
          {/* <Text style={styles.payment_method_name}>{payment_method_name}</Text> */}


        </View>
        <View style={styles.clm}>
          <Text style={[styles.amount]} >RS:{amount}</Text>
          <View style={[styles.rw]}>
            <Icon name='bank' size={30} style={[styles.icon]} />
            <Text style={[styles.amount]} >.....{total}</Text>
          </View>
          {/* <Text style={styles.title}>N</Text> */}
        </View>
      </View>
    </View>
  );


  return (

    <FlatList
      data={result}
      renderItem={({ item }) => <Item
        id={item.id}
        title={item.title}
        amount={item.amount} total={item.total}
        date={item.date}
        description={item.description}

        category_name={item.category_name}
        frequency={item.frequency}
        imagename={item.image}
        payment_method={item.payment_method}
        payment_method_name={item.payment_method_name}
        type={item.type}
        type_name={item.type_name}
      // description={item.description}





      />

      }
      keyExtractor={item => item.id}
    />
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
  },

  item: {
    padding: 8,
    // marginVertical: 8,

    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: "white",
    alignItems: 'center',


  },
  id: {
    color: 'red'
  },
  title: {
    maxWidth: "100%",
    // fontSize: 20,
    color: 'black'
  },
  amount: {
    fontSize: 15,
    textAlign: 'right',
    color: 'black'
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 3
  },
  icon: {
    flex: 0,
    paddingRight: 5,
    color: 'green',
  },
  right: {
    flex: 1,
    justifyContent: "space-between",

  },
  date: {
    textAlignVertical: 'bottom',
    color: 'black'
  },
  clm: {
    flexDirection: 'column',


  },
  rw: {
    flexDirection: 'row',
  },
  category_name: {
    color: 'red'
  },
  frequency: {
    color: 'green'
  },
  payment_method: {
    color: 'aqua'
  }, payment_method_name: {
    color: 'yellow'
  },
  type: {
    color: 'pink'
  },
  category_name: {
    color: 'blue'
  },
  type_name: {
    color: 'purple'
  },
  description: {
    color: 'orange',
    maxWidth: '90%'
  },



});


export default TransactionList;

















