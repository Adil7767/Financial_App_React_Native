import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CreateBudget = () => {
    return (

        <View style={[styles.card2]}>

            <Text style={[styles.txt1]}>Are you overspending?</Text>
            <TouchableOpacity >
                <Text style={[styles.txt2]} >CREATE A BUDGET</Text>
            </TouchableOpacity>

        </View>
    )
}

export default CreateBudget


const styles = StyleSheet.create({
    card2: {
        backgroundColor: '#FBFBFB',
        marginHorizontal: 10,
        height: 140,
        flexDirection: 'column',
        marginTop: 15,
        fontFamily: 'Poppins',

    },
    txt1: {
        flex: 1,
        fontSize: 17,
        color: '#000000',
        marginHorizontal: 30,
        marginVertical: 10,

    },
    txt2: {
        // flex: 1,
        fontSize: 17,
        color: '#9747FF',
        textAlignVertical: 'bottom',
        paddingTop: 50,
        marginHorizontal: 30,
        marginVertical: 10,

    }
})