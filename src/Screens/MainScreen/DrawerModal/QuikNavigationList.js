import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const QuikNavigationList = ({ navigation }) => {
    return (
        <View>

            <View>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('AllTransactions')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/Vector.png')} />
                    <Text style={[styles.txt]}>All Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('CashTransactions')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/banknotes.png')} />
                    <Text style={[styles.txt]}>Cash Transactions </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rw, styles.icon]}
                    onPress={() => {
                        navigation.navigate('Bills')
                    }}>
                    <Image
                        style={[styles.img]}
                        source={require('../../../assets/invoice.png')} />
                    <Text style={[styles.txt]}>Bills</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuikNavigationList

const styles = StyleSheet.create({

    icon: {
        color: "#483d8b",
        fontSize: 30,
        padding: 10,


    },
    rw: {
        flexDirection: 'row',
    },
    txt: {
        color: '#000000',
        paddingLeft: 20,
        fontSize: 16,
    },
    img: {
        width: 28,
        height: 28,
        marginLeft: 10
    },
});
