import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Poly = () => {
  return (
    <ImageBackground style={styles.octagon}>
      <View style={[styles.octagonUp, styles.octagonBar]} >

      </View>
      <View style={[styles.octagonFlat, styles.octagonBar]} >

        <Text>h</Text>
      </View>
      <View style={[styles.octagonLeft, styles.octagonBar]} />
      <View style={[styles.octagonRight, styles.octagonBar]} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  octagon: {
    left: 50,
    top: 5
  },
  octagonBar: {
    width: 42,
    height: 100,
    backgroundColor: "red",
  },
  octagonUp: {},
  octagonFlat: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "90deg" }],
  },
  octagonLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "-45deg" }],
  },
  octagonRight: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "45deg" }],
  },
});
export default Poly