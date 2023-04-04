import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

export default function TransactionAddButton() {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity style={styles.TrnsitionBtn}
                onPress={() => {
                    navigation.navigate('AddTransactions')
                }}>
                <Icon
                    name="plus"
                    style={[styles.icon]}
                >
                </Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    TrnsitionBtn: {
        backgroundColor: '#F419C9',
        height: 50,
        bottom: 4,
        // right: -200,
        left: '80%',

        // position: 'absolute',
        width: 50,
        borderRadius: 50
    },
    icon: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        color: '#fff'
    },
})