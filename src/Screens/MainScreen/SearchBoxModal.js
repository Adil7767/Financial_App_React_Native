// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useSelector } from "react-redux";
// import SearchBoxModal from 'react-native-search-modal';
// const SearchBoxModal = () => {

//   const data = useSelector((state) => state)
//   var aa = data.user.DATA2
//   console.log('Seach Box Modal', aa)
//   return (
//     console.log('hello')

//   );
// }

// export default SearchBoxModal

// const styles = StyleSheet.create({})






// import React, { useState, useMemo } from 'react';
// import { Modal, TextInput, Text, FlatList, View } from 'react-native';
// import { useSelector } from "react-redux";

// const SearchBoxModal = ({ aa, visible, onClose }) => {
//   const data = useSelector((state) => state)
//   var aa = data.user.DATA2
//   console.log('Seach Box Modal', aa)

//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const filteredData = useMemo(() => {
//     return aa.filter((item) => {
//       return (
//         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.amount.toString().includes(searchQuery)
//       );
//     });
//   }, [data, searchQuery]);

//   const renderItem = ({ item }) => (
//     <View style={{ marginVertical: 10 }}>
//       <Text>{item.title}</Text>
//       <Text>{item.description}</Text>
//       <Text>{item.amount}</Text>
//     </View>
//   );

//   return (
//     <Modal visible={visible} onRequestClose={onClose}>
//       <View style={{ margin: 20 }}>
//         <TextInput
//           placeholder="Search"
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//         />
//       </View>
//     </Modal>
//   );
// };

// export default SearchBoxModal;





import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image } from 'react-native';
import { useSelector } from "react-redux";
import actions from "../../redux/actions/index";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showError } from '../../utils/helperFunction';
import { empty } from 'is_js';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TextInputWithLable from '../../Components/TextInputWithLabel';

const SearchBoxModal = () => {

  const txt = useSelector((state) => state)
  var token = txt?.user?.token
  const accessToken = token?.token?.access;
  const DATA = useSelector((state) => state.user);
  const Data = DATA.userData;
  const [result, setresult] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  console.log('result', result)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
      console.log("res of search==>>>>>", res.results)
      setresult(res.results)
    }
    catch (error) {
      console.log('Transaction search error==========>', error)
    }
  }
  const handleSearch = async () => {
    if (searchQuery == '') {
      showError('First type somthing')
    }
    else {
      try {
        setisLoading(true)

        if (!result) {
          showError('Data Loading plz bit wait ')
        } else {
          const filtered = await result.filter((item) => {
            const searchLower = searchQuery.toLowerCase();
            const frequencyLower = typeof item.frequency === 'string' ? item.frequency.toLowerCase() : '';
            const type_nameLower = typeof item.type_name === 'string' ? item.type_name.toLowerCase() : '';
            const category_nameLower = typeof item.category_name === 'string' ? item.category_name.toLowerCase() : '';
            const descriptionLower = typeof item.description === 'string' ? item.description.toLowerCase() : '';
            const amountLower = typeof item.amount === 'string' ? item.amount.toLowerCase() : '';
            const typeStr = typeof item.type === 'number' ? item.type.toString() : '';
            const IdStr = typeof item.id === 'number' ? item.id.toString() : '';
            return (
              type_nameLower.includes(searchLower) ||
              descriptionLower.includes(searchLower) ||
              category_nameLower.includes(searchLower) ||
              frequencyLower.includes(searchLower) ||
              amountLower.includes(searchLower) ||
              typeStr.includes(searchQuery) ||
              IdStr.includes(searchQuery)

            );
          });
          // if (filtered == []) {
          //   console.log('no data found')
          //   setFilteredData([{ description: 'no data match' }]);
          // } else {
          setFilteredData(filtered);
          setModalVisible(true);
          setisLoading(false)

          // }
        }
      }
      catch (error) {
        setisLoading(false)
        console.log(error)
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFilteredData([]);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
        maxLength={20}
     
      /> */}
      <TextInputWithLable
        // label="Search"
        placeholder="set query"
        // onChangeText={(type) => updateState({ type })}
        onChangeText={(text) => {
          // if (text.trim().length === 0) {
          //   console.log('no data');
          // } else {
          setSearchQuery(text)
          // }
        }
        }
      // keyboardType="numeric"
      // maxLength={20}
      // minLength={1}
      ></TextInputWithLable>




      <ButtonWithLoader
        isLoading={isLoading}
        text="Search"
        onPress={handleSearch}
        title="Search"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>

          <TouchableOpacity onPress={handleCloseModal}>

          </TouchableOpacity>


          <Text style={[styles.txt]}>Search transactions</Text>
          {filteredData.map((item) => (
            <View style={styles.item}>
              <Image
                style={[styles.img]}
                source={{ uri: item.image }}
              />
              <View style={[styles.right, styles.rw]}>
                <View style={styles.clm}>
                  <Text style={styles.id}>{item.id}</Text>
                  <Text style={styles.type_name}>{item.type_name}</Text>
                  <Text style={[styles.description]}>{item.description}</Text>
                </View>
                <View style={styles.clm}>
                  <Text style={[styles.amount]} >RS:{item.amount}</Text>
                  <View style={[styles.rw]}>
                    <Icon name='bank' size={30} style={[styles.icon]} />
                    <Text style={[styles.amount]} >...</Text>
                  </View>
                  <Text style={[styles.icon]} >{item.category_name}</Text>

                </View>
              </View>
            </View>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: 'red'

  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    borderBottomWidth: 1,
  },
  txt: {
    padding: 8,
    fontSize: 30,
    backgroundColor: "#FBFBFB",
    marginHorizontal: 10,
    color: 'black',
    borderBottomWidth: 1,

  },
  btn: {
    alignItems: 'center'
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
    color: 'black',
    // paddingEnd: '10%'
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 2,
    // marginLeft: 0
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

export default SearchBoxModal;
