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





import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';

const SearchBoxModal = ({ aa }) => {
  const data = useSelector((state) => state)
  var aa = data.user.DATA2
  console.log('Seach Box Modal', aa)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    const filtered = aa.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      const titleLower = typeof item.title === 'string' ? item.title.toLowerCase() : '';
      const descriptionLower = typeof item.description === 'string' ? item.description.toLowerCase() : '';
      const amountStr = typeof item.amount === 'number' ? item.amount.toString() : '';
      return (
        titleLower.includes(searchLower) ||
        descriptionLower.includes(searchLower) ||
        amountStr.includes(searchQuery)
      );
    });
    setFilteredData(filtered);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFilteredData([]);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
      />
      <Button
        title="Search"
        onPress={handleSearch} />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          {/* <Button title="Close" onPress={handleCloseModal} /> */}
          <Text style={[styles.txt]}>Search transactions</Text>


          {filteredData.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.title}>Id:{item.id}</Text>
              <Text style={styles.title}>Name:{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>Rs:{item.amount}</Text>
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

  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
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
});

export default SearchBoxModal;
