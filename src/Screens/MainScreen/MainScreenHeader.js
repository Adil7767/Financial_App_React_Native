import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";
import { DrawerModal } from '../../index'

const MainScreenHeader = ({ navigation, AdArt }) => {
  const [showModal, setShowModal] = useState(false);
  window.onclick = () => {
    if (showModal = true) {
      setShowModal(!showModal)
    }
  }

  return (
    <View>
      <Modal
        animationType={'fade'}
        transparent={true}
        // visible={modalVisible}
        // onModalShow={() => console.log('I am Modal')}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal)
        }}>
        {/* <ScrollView> */}
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(!showModal)
          }}
        >
          <DrawerModal navigation={navigation} />
        </TouchableWithoutFeedback>
        {/* </ScrollView> */}

        {/* <TouchableOpacity style={[styles.btn]}
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Text>Click To Close Modal</Text>

        </TouchableOpacity> */}



      </Modal>

      <View style={{ flexDirection: 'column' }}>
        <View style={[styles.header]}>
          <TouchableOpacity style={styles.view}
            onPress={() => {
              setShowModal(!showModal);
            }}

          >
            <Icon
              name="bars"
              style={[styles.icon]}
            >
            </Icon>
          </TouchableOpacity>

          <View style={[styles.view, styles.font]}>
            <Text style={[styles.font]}>{AdArt}</Text>
          </View>
          <TouchableOpacity style={styles.view}
            onPress={() => {
              navigation.navigate('Bills')
            }}

          >
            <Icon
              name="clock"
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
                name="search"
                style={[styles.icon]}
              ></Icon>
            </TouchableOpacity>
          </View>

        </View >
        <View style={[styles.personal]}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile')
          }} style={[styles.personal]} >
            <Icon
              name="user-alt"
              style={[styles.icon2]}

            ></Icon>
            <Text style={[styles.txt]}>personal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 90,
    elivation: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  view: {
    margin: 20,
    justifyContent: 'space-between'

  },
  font: {
    fontSize: 30,
    fontStyle: 'bold',
    fontWeight: '500',
    color: "#483d8b",
  },
  icon: {
    color: "#483d8b",
    fontSize: 30
  },
  icon2: {
    flex: 0,
    color: 'skyblue',
    fontSize: 15,

  },
  personal: {
    flexDirection: 'row',
    color: 'blue',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  txt: {
    marginHorizontal: 10,
    marginBottom: 10,

  },
  btn: {
    width: '80%',
    height: 16,
    backgroundColor: 'red',
  }
})
export default MainScreenHeader;