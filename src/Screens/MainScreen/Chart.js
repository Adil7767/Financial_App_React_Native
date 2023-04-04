import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-line-chart'
import { Expences } from "../../index";
import { Dimensions } from 'react-native';
import { useSelector } from "react-redux";
const Chart = ({ navigation }) => {
  const data = useSelector((state) => state)
  var DATA = data.user.LineChartData
  // console.log('LineChart', DATA)
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Expences')
      }}
    >
      <LineChart

        data={DATA}
        width={Dimensions.get("window").width - 50} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#483d8b",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
        }}
        // bezier
        // Catmull-Rom
        // stroke
        style={[styles.chart]}
      />
    </TouchableOpacity>
  )
}

export default Chart

const styles = StyleSheet.create({
  chart: {
    margin: 10,
  }
})