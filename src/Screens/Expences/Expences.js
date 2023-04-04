import { Text, View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native'
import React from 'react'

import { useSelector } from "react-redux";
import {
    MainScreenHeader,
    AllTransactions,
    PieChart1,
    Chart
} from '../../index';

const Expences = ({ navigation }) => {


    // const data = useSelector((state) => state)
    // var aa = data.user.DATA2
    // console.log('expences', aa)
    return (

        <ScrollView >

            <MainScreenHeader navigation={navigation} AdArt='Expences' />
            <View style={styles.container}>
                <View>
                    <PieChart1 />
                    <Chart navigation={navigation} />
                </View>
            </View>
            <Text style={[styles.txt]}>Latest Transactions</Text>
            <AllTransactions />
            <Button
                onPress={() => {
                    navigation.navigate('AddTransactions')
                }}
                title="Add Transaction"
                color="#841584"

            />
        </ScrollView>
    );
}
export default Expences;
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