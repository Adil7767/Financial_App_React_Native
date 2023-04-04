import { StyleSheet, Text, View, Linking, Pressable } from 'react-native'
import React from 'react'

const Subcription = () => {
  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/qr/F32M6LYLEUHLD1');
  }
  return (
    <View>
      <Pressable onPress={() => openWhatsApp()}>

        <Text style={[styles.txt]}>How Subcription manager works?</Text>
      </Pressable>

    </View>
  )
}

export default Subcription

const styles = StyleSheet.create({
  txt: {
    textDecorationLine: 'underline',
    textAlign: 'center'

  }
})