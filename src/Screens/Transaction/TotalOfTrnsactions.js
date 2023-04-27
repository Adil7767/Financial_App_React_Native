// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import TextInputWithLable from '../../Components/TextInputWithLabel';

// import validator from '../../utils/validations';
// import { showError, showSuccess } from '../../utils/helperFunction';
// import actions from '../../redux/actions';
// import { showMessage } from 'react-native-flash-message';
// import { ScrollView } from 'react-native-gesture-handler';

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigation } from '@react-navigation/native';


// const TotalOfTransactions = ({ type }) => {

//     useEffect(() => {
//         onTotalOfTransactions(type)
//     }, []

//     )
//     const [result, setresult] = useState()
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const txt = useSelector((state) => state)
//     var token = txt?.user?.token
//     const accessToken = token?.token?.access;
//     const DATA = useSelector((state) => state.user);
//     const Data = DATA.userData;
//     var trans_type = type;
//     // console.log('token', token.token.access)
//     // if (type == type) {
//     //     const trans_type = type;

//     //     return trans_type = type
//     // }

//     console.log(trans_type)

//     const onTotalOfTransactions = async () => {
//         // updateState({ trans_type: type })

//         console.log('trans_type', type)
//         try {
//             const res = await actions.total_transaction({
//                 trans_type,
//             },
//                 {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Content-Type': 'multipart/form-data',
//                 }
//             )

//             console.log("res of TotalOfTransactions==>>>>>", res)
//             // showMessage("password Change successfully...!!!! Please ReLogin")
//             sum = res.data.amount__sum
//             console.log('sum', sum)
//             setresult(sum)
//             // showSuccess(res)
//             // navigation.navigate('MainScreen')
//         }
//         catch (error) {
//             console.log('TotalOfTransactions error', error)
//             // let err = error.errors.trans_type;
//             // showError(err)


//             // navigation.goBack()
//         }

//     }



//     return (
//         <ScrollView style={styles.container}>
//             <View >

//                 <Text>{result}</Text>

//                 {/* <TextInputWithLable
//                     label="trans_type"
//                     placheHolder="Enter your trans_type"
//                     onChangeText={(trans_type) => updateState({ trans_type })}
//                     keyboardType="numeric"
//                 />


//                 <View style={[styles.btn]}>

//                     <ButtonWithLoader
//                         text="Save"
//                         onPress={onTotalOfTransactions}
//                         isLoading={isLoading}
//                     />
//                 </View> */}
//             </View>
//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: 'white',

//     },
//     btn: {
//         alignItems: 'center'
//     }

// });


// export default TotalOfTransactions;





import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';


const TotalOfTransactions = ({ type }) => {

    const [result, setresult] = useState()
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const txt = useSelector((state) => state)
    var token = txt?.user?.token
    const accessToken = token?.token?.access;
    const DATA = useSelector((state) => state.user);
    const Data = DATA.userData;
    var trans_type = type;

    useEffect(() => {
        onTotalOfTransactions(trans_type)
    }, [trans_type]);

    const onTotalOfTransactions = async (trans_type) => {
        console.log('trans_type', trans_type)
        try {
            const res = await actions.total_transaction({
                trans_type,
            },
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            )

            console.log("res of TotalOfTransactions==>>>>>", res)
            // showMessage("password Change successfully...!!!! Please ReLogin")
            var sum2 = res.data.amount__sum;
            var sum1 = res.type;
            const sum = sum1 + "  " + sum2;
            console.log('sum', sum1 + "  " + sum2)
            setresult(sum)
            // showSuccess(res)
            // navigation.navigate('MainScreen')
        }
        catch (error) {
            console.log('TotalOfTransactions error', error)
            // let err = error.errors.trans_type;
            showError(error.msg)


            // navigation.goBack()
        }

    }



    return (

        <View >
            <Text style={[styles.txt]}>{result}</Text>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',

    },
    btn: {
        alignItems: 'center'
    },
    txt: {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: 'aqua'
    }

});


export default TotalOfTransactions;
