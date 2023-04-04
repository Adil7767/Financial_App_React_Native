import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const InviteFriend = () => {
  const navigation = useNavigation()
  let phoneNumber = +923077071426;

  const message = "Hey! Adil Mustafa would like to invite you to his app. Download it here:https://play.google.com/store/apps/details?id=com.finart";
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View>
      <Text>Invite a Friend via WhatsApp</Text>
      <TouchableOpacity onPress={handlePress} style={[styles.btn]}>
        <Text>Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InviteFriend;
const styles = StyleSheet.create({
  btn: {
    width: '20%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    // marginVertical: 10,
    borderWidth: 1,
    backgroundColor: '#AFE1AF',
    margin: 2,
  },
})