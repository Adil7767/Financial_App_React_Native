// // import React, { useState } from 'react';
// // import { View, Button, StyleSheet, Text } from 'react-native';
// // import Subcription from './Subcription';
// // import { TransactionList } from '../../index';
// // import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// // import { useNavigation } from '@react-navigation/native';
// // import TransactionAddButton from '../../Components/TransactionAddButton';
// // const ButtonRow = () => {
// //   const navigation = useNavigation();
// //   const [activeButton, setActiveButton] = useState('Bills');

// //   const handleBillsPress = () => {
// //     setActiveButton('Bills');
// //   };

// //   const handleSubscriptionPress = () => {
// //     setActiveButton('Subscription');
// //   };

// //   const renderScreen = () => {
// //     if (activeButton === 'Bills') {
// //       return (
// //         <View style={styles.list}>
// //           <TransactionList />
// //         </View>
// //       );
// //     } else if (activeButton === 'Subscription') {
// //       return <Subcription />;
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.buttonRow}>
// //         <Button
// //           title="Bills"
// //           color={activeButton === 'Bills' ? 'green' : 'grey'}
// //           onPress={handleBillsPress}
// //         />
// //         <Button

// //           title="Subscription"
// //           color={activeButton === 'Subscription' ? 'green' : 'grey'}
// //           onPress={handleSubscriptionPress}
// //         />

// //       </View>
// //       <View style={styles.screenContainer}>{renderScreen()}</View>

// //       <TransactionAddButton style={styles.tab} />
// //     </View>

// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-evenly',
// //     // alignItems: 'center',
// //     marginVertical: 20,

// //   },
// //   screenContainer: {
// //     flex: 1,
// //   },



// // });

// // export default ButtonRow;



// import React, { useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Subcription from './Subcription';
// import { TransactionList } from '../../index';
// import { ScrollView } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import TransactionAddButton from '../../Components/TransactionAddButton';

// const Bills = () => {
//   const navigation = useNavigation();
//   const [activeButton, setActiveButton] = useState('Bills');
//   const [activeButtonText, setActiveButtonText] = useState('Bills');
//   const handleBillsPress = () => {
//     setActiveButton('Bills');
//   };

//   const handleSubscriptionPress = () => {
//     setActiveButton('Subscription');
//   };

//   const renderScreen = () => {
//     if (activeButton === 'Bills') {
//       return (
//         <View style={styles.list}>
//           <TransactionList />
//         </View>
//       );
//     } else if (activeButton === 'Subscription') {
//       return <Subcription />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             activeButton === 'Bills' && styles.activeButton,
//             activeButtonText === 'Bills' && styles.activeButtonText,


//           ]}
//           onPress={handleBillsPress}>
//           <Text style={styles.buttonText}>Bills</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             activeButton === 'Subscription' && styles.activeButton,
//           ]}
//           onPress={handleSubscriptionPress}>
//           <Text style={styles.buttonText}>Subscription</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.screenContainer}>{renderScreen()}</View>

//       <TransactionAddButton style={styles.tab} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginVertical: 20,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#F419C9',
//     color: '#F419C9',

//     flexDirection: 'row',
//     justifyContent: 'space-evenly',

//   },
//   activeButton: {
//     backgroundColor: 'aqua',
//   },
//   buttonText: {
//     color: '#F419C9',
//   },
//   activeButtonText: {
//     color: 'red',
//   },
//   screenContainer: {
//     flex: 1,
//   },
// });

// export default Bills;






import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { TransactionList, Subcription } from '../../index';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TransactionAddButton from '../../Components/TransactionAddButton';

const Bills = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState('Bills');
  const [activeButtonText, setActiveButtonText] = useState('Bills');

  const handleBillsPress = () => {
    setActiveButton('Bills');
    setActiveButtonText('Bills');
  };

  const handleSubscriptionPress = () => {
    setActiveButton('Subscription');
    setActiveButtonText('Subscription');
  };

  const renderScreen = () => {
    if (activeButton === 'Bills') {
      return (
        <View style={styles.list}>
          <TransactionList />
        </View>
      );
    } else if (activeButton === 'Subscription') {
      return <Subcription />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Bills' && styles.activeButton,
          ]}
          onPress={handleBillsPress}>
          <Text
            style={[
              styles.buttonText,
              activeButtonText === 'Bills' && styles.activeButtonText,
            ]}>
            Bills
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Subscription' && styles.activeButton,
          ]}
          onPress={handleSubscriptionPress}>
          <Text
            style={[
              styles.buttonText,
              activeButtonText === 'Subscription' && styles.activeButtonText,
            ]}>
            Subscription
          </Text>
        </TouchableOpacity>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F419C9',
    color: '#F419C9',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  activeButton: {
    backgroundColor: 'aqua',
  },
  buttonText: {
    color: '#F419C9',
    fontSize: 20
  },
  activeButtonText: {
    color: 'white',
    fontSize: 20
  },
  screenContainer: {
    flex: 1,
  },
});

export default Bills;
