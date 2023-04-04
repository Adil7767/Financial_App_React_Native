import { Text, View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from "react-redux";

const PieChart1 = ({ navigation }) => {
    const data = useSelector((state) => state)
    var aa = data.user.GraphData
    console.log('PieChart', aa)
    return (
        <ScrollView >
            <View style={styles.container}>
                <View>
                    <PieChart data={aa}
                        width={Dimensions.get('window').width - 16} height={220}
                        chartConfig={{
                            backgroundColor: '#194ad1',
                            backgroundGradientFrom: '#f74871',
                            backgroundGradientTo: '#ffbc47',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default PieChart1
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 8,
    },
    txt: {
        padding: 8,
        fontSize: 30,
        backgroundColor: "#FBFBFB",
        marginHorizontal: 10,
        color: 'black'

    },
});