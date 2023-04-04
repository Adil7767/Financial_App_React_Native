import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Linking } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Rescan_SMS = () => {
    const navigation = useNavigation();

    const handlePress1 = async () => {
        const url = 'https://www.finart.app/Terms.html';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(`Don't know how to open URI: ${url}`);
        }
    };
    const handlePress2 = async () => {
        const url = 'https://www.finart.app/Privacy.html';
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(`Don't know how to open URI: ${url}`);
        }
    };

    return (
        <ScrollView style={styles.Container}>
            <Icon
                name="android-messages"
                style={[styles.icon]}
            >
            </Icon>
            <Text style={styles.SmsText}>SMS Permission</Text>
            <Text style={styles.SmsText1}>FinArt is a SMS based expense, budget and bill management app. It collects SMS information to process your transactional SMS automatically into your expenses, budgets and bill reminders even when app is closed.</Text>
            <Text style={styles.SmsText1}>This helps you to manage your finances without spending time on manual tracking and helps you to avoid bill payment defaults. No personal SMS are processed. This information is never shared to any third party.</Text>
            <View style={styles.TextView}>
                <Text style={styles.ContinuingText}>By continuing,you agree to our</Text>
                <Pressable onPress={() => handlePress1()}><Text style={styles.ServicesText}>Terms of Services </Text></Pressable>
            </View>
            <View style={styles.TextView2}>
                <Text style={styles.ContinuingText}>&</Text>
                <Pressable onPress={() => handlePress2()}><Text style={styles.Privacy}> Privacy Poliocy
                </Text></Pressable>
            </View>
            <TouchableOpacity style={styles.Btn} onPress={() => alert('Permission granted')}>
                <Text style={styles.AgreeText}>Agree,Grant Permission</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('MainScreen')}
                style={styles.SkipText}>Skip</Text>
        </ScrollView>
    )
}

export default Rescan_SMS

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#5B39CB'
    },
    icon: {
        alignSelf: 'center',
        fontSize: 40,
        color: '#fff',
        marginTop: 20
    },
    SmsText: {
        color: '#fff',
        textAlign:
            'center',
        fontSize: 25,
        fontWeight: '400',

    },
    SmsText1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20

    },
    TextView: {
        flexDirection: 'row',
        marginHorizontal: '2%',
        // marginRight: 20,
        marginTop: '15%'
    },
    TextView2: {
        flexDirection: 'row',
        marginHorizontal: '20%',
        // marginRight: 20,

    },
    ServicesText: {
        color: '#17cf97',
        fontSize: 16,
        fontWeight: '500',
        marginRight: 4,
        textDecorationLine: 'underline',
    },
    ContinuingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'

    },
    Privacy: {
        color: '#17cf97',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20,
        // marginRight: 60,
        textDecorationLine: 'underline',
    },

    Btn: {
        height: 45,
        backgroundColor: '#fff',
        marginHorizontal: 30,
        marginTop: 10,
        borderRadius: 12,
    },
    AgreeText: {
        color: '#5B39CB',
        textAlign: 'center',
        marginTop: 8,
        fontSize: 20,
        fontWeight: '500'
    },
    SkipText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: '500',
    }

})