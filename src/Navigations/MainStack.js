import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'
import {
    AddTransactions,
    Bills,
    DrawerModal,
    MainScreen,
    MainScreenHeader,
    Home,
    AllTransactions,
    SearchBoxModal,
    Expences,
    QuikNavigationList,
    Settings,
    Rescan_SMS,
    InviteFriend,
    ContactUs,
    Subcription,
    Help,
    CashTransactions,
    Profile,
    Accounts,
    ExpencesHeader,
    MyWidget,
    BackUpModal,
    BackUpOffModal,
    ChangePassword

} from '../index';
import TabRoutes from "./TabRoutes";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import { HeaderBackButton } from '@react-navigation/stack';


// function CustomHeader() {
//     const navigation = useNavigation();

//     return (
//         <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
//             <Text>Some Component</Text>
//         </TouchableOpacity>
//     );
// }
export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddTransactions"
                component={AddTransactions}
            />
            <Stack.Screen
                name="MainScreenHeader"
                component={MainScreenHeader}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bills"
                component={Bills}
                options={{ headerShown: false }}

            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
            // options={{ headerShown: false }}
            />


            <Stack.Screen
                name="SearchBoxModal"
                component={SearchBoxModal}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BackUpModal"
                component={BackUpModal}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BackUpOffModal"
                component={BackUpOffModal}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllTransactions"
                component={AllTransactions}
            // options={{ headerShown: false }}

            />
            <Stack.Screen
                name="Expences"
                component={Expences}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExpencesHeader"
                component={ExpencesHeader}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="QuikNavigationList"
                component={QuikNavigationList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Rescan_SMS"
                component={Rescan_SMS}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InviteFriends"
                component={InviteFriend}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ContactUs"
                component={ContactUs}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyWidget"
                component={MyWidget}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Subcription"
                component={Subcription}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CashTransactions"
                component={CashTransactions}
            // options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="Profile"
                component={Profile}
            // options={{ headerShown: false }}
            /> */}
            <Stack.Screen
                name="DrawerModal"
                component={DrawerModal}
                options={{ headerShown: false, }}
            />

            <Stack.Screen
                name="Accounts"
                component={TabRoutes}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ animation: 'slide_from_right' }}
            />

        </>
    )
}

const styles = StyleSheet.create({


    font: {
        fontSize: 35,
        fontStyle: 'bold',
        fontWeight: '500',
        color: "#483d8b",
    },
    icon: {
        color: "#483d8b",
        fontSize: 25,
        padding: 15
    },



})