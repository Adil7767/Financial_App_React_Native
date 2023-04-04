import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BillsCard = () => {
    return (<View>
        <View style={[styles.card2]}>
            {/* <TouchableOpacity onPress={() => { alert('hello') }} > */}
            <Text style={[styles.txt1]}>Bills</Text>
            <Text style={[styles.txt2]}>All your upcoming bills will be tracked here.AdArt will
                also give timely reminders to pay due bills and avoid
                late fee
            </Text>
            <Text style={[styles.txt1]}>0  Bills</Text>
            {/* </TouchableOpacity> */}
        </View>


    </View>
    )
}

export default BillsCard

const styles = StyleSheet.create({
    card2: {
        backgroundColor: '#FBFBFB',
        marginHorizontal: 10,
        padding: 30,
        // height: 202,
        flexDirection: 'column',

    },
    txt1: {
        fontSize: 17,
        padding: 5,
        color: 'black'
    },
    txt2: {
        fontFamily: 'Poppins',
        fontSize: 13,
        paddingVertical: 20,
        padding: 5,
        color: 'black'

    }
})