// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
// TouchableOpacity,
//   SectionList,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useSelector } from "react-redux";

// const DATA = [
//   {
//     title: 'Latest transactions',
//     amount:'to',
//     data:[Math.random()*10,Math.random()*10,Math.random()*10,Math.random()*10]
//   },

// ];
// const List=(item)=>{
//   const data = useSelector((state) => state)
//   var AA = data.user.DATA
//   // var aa=data.user.transactions=data.user.transactions.push(1)
//   console.log(AA)
//     const aa =Date();
//     return(
// <View style={{flexDirection:'row'}}>
//         <View>
// <Icon amount='rotate-3d-variant' size={30} />
// </View>
// <View style={{flexDirection:'column'}}>
//         <Text>{item}</Text>
//         <Text>{item}</Text>
//         <Text>{aa}</Text>
//         </View>
//         <Text>{item}</Text>
//           </View>
//     )
// }
// // style={{margin:5}}
// const TransactionList = () => (

//     <SectionList
//     sections={DATA}
//     keyExtractor={(item, index) => item + index}
//     renderItem={({item}) => (
//         <View style={[styles.item,{margin:2}]}>
//           <Text style={styles.title}>{List(item)}</Text>
//         </View>
//       )}

//       renderSectionHeader={({section: {title}}) => (
//           <Text style={styles.header}>{title}</Text>
//           )}
//           />


// );





// const styles = StyleSheet.create({
//   container: {
//     flex: 0,
//     paddingTop: StatusBar.currentHeight,
//     marginHorizontal: 16,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 10,
//     marginVertical: 6,
//   },
//   header: {
//     fontSize: 32,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//   },
// });

// export default TransactionList;

import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Item = ({ title, amount, total, date, description }) => (

  <View style={styles.item}>
    <Icon name='rotate-3d-variant' size={40} style={[styles.icon]} />
    <View style={[styles.right, styles.rw]}>
      <View style={styles.clm}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.amount}>RS:{amount}</Text> */}
        <Text style={[styles.date]}>{date}</Text>
        <Text style={[styles.date]}>{description}</Text>

      </View>
      <View style={styles.clm}>
        <Text style={[styles.amount]} >RS:{amount}</Text>
        <View style={[styles.rw]}>
          <Icon name='bank' size={30} style={[styles.icon]} />
          <Text style={[styles.amount]} >{total}</Text>
        </View>
        {/* <Text style={styles.title}>N</Text> */}
      </View>
    </View>
  </View>
);
const TransactionList = () => {
  const data = useSelector((state) => state)
  // const DATA=useSelector((state) => state)
  var aa = data.user.DATA2
  // var aa=data.user.transactions=data.user.transactions.push(1)
  // console.log('aa', aa)

  return (


    <FlatList
      data={aa}
      renderItem={({ item }) => <Item title={item.title}
        amount={item.amount} total={item.total}
        date={item.date}
        description={item.description} />

      }
      keyExtractor={item => item.id}
    />



  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,

  },
  item: {
    padding: 10,
    // marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: "white",
    alignItems: 'center',


  },
  title: {
    maxWidth: "100%",
    // fontSize: 20,
    color: 'black'
  },
  amount: {
    fontSize: 20,
    textAlign: 'right',
    color: 'black'
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
    flexDirection: 'column'
  },
  rw: {
    flexDirection: 'row',
  }

});

export default TransactionList;