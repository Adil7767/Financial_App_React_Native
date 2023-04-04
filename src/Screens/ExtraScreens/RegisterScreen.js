// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     StyleSheet,
//     TouchableOpacity,
//     Text,
//     TextInput,
// } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useDispatch, useSelector } from 'react-redux';
// import TextInputWithLable from '../Components/Login/TextInputWithLabel';

// function RegisterScreen({ navigation }) {
//     const [userData, setUserData] = useState({});
//     const state = useSelector(state => state);
//     const dispatch = useDispatch();

//     const handleSubmit = async () => {
//         if (Object.keys(userData).length < 3) {
//             alert('Please Fill Require Data')
//         } else {
//             dispatch({ type: 'REGISTER_USER', payload: userData });
//             navigation.navigate('Login')
//             { showSuccess() }
//         }
//     };

//     const handleInput = (name, text) => {
//         const clone = { ...userData };
//         clone[name] = text;
//         setUserData(clone);
//     };

//     return (
//         <ScrollView style={styles['container']}>
//             <View style={styles['logoContainer']}>
//                 <Text style={styles['logo']}>AdArt</Text>
//             </View>

//             <TextInputWithLable placheHolder='First Name'
//                 // label='Email'
//                 // value='123'
//                 isSecure='123456'
//                 onChangeText={text => handleInput('First_Name', text)}
//             // keyboardType="email-address"
//             />
//             <TextInputWithLable placheHolder='Last Name'
//                 // label='Email'
//                 // value='123'
//                 isSecure='123456'
//                 onChangeText={text => handleInput('Last_Name', text)}
//             // keyboardType="text"
//             />
//             <TextInputWithLable placheHolder='Email'
//                 // label='Email'
//                 // value='123'
//                 isSecure='123456'
//                 onChangeText={text => handleInput('email', text)}
//                 keyboardType="email-address"
//             />
//             {/* <TextInputWithLable placheHolder='User Name'
//                 // label='Email'
//                 // value='123'
//                 isSecure='123456'
//                 onChangeText={text => handleInput('username', text)}
//                 keyboardType="email-address"
//             /> */}
//             <TextInputWithLable placheHolder='Password'
//                 // label='Email'
//                 // value='123'
//                 isSecure={true}
//                 onChangeText={text => handleInput('password', text)}
//                 secureTextEntry
//                 maxLength={8}
//             />
//             {/* <TextInput
//                 onChangeText={text => handleInput('password', text)}
//                 placeholder="Password"
//                 style={styles['input']}
//                 secureTextEntry
//             /> */}

//             <TouchableOpacity style={styles['button']} onPress={handleSubmit}>
//                 <Text style={styles['text']}>Register</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 15,
//     },

//     button: {
//         width: '100%',
//         backgroundColor: '#5E2CA5',
//         alignItems: 'center',
//         padding: 15,
//         borderRadius: 25,
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     text: {
//         color: '#fff',
//         fontSize: 18,
//         textTransform: 'uppercase',
//     },
//     logoContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 50,
//         paddingBottom: 30,
//     },
//     logo: {
//         fontSize: 50,
//         color: '#5E2CA5',
//         fontWeight: '600',
//     },
//     input: {
//         width: '100%',
//         height: 70,
//         borderRadius: 25,
//         backgroundColor: '#eee',
//         marginVertical: 10,
//         padding: 10,
//         fontSize: 18,
//     },
//     login: {
//         alignSelf: 'center',
//         paddingVertical: 10,
//         fontSize: 18,
//     },
// });

// export default RegisterScreen;


import React, { useEffect, useState } from 'react';

import {

    View,

    StyleSheet,

    TouchableOpacity,

    Text,

    TextInput,

    ScrollView,

} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import userServices from '../api/userServices';

import ErrorMessage from '../Components/ErrorMessage';




function RegisterScreen({ navigation }) {

    const [userData, setUserData] = useState({

        gender: 'M',

        first_name: '',

        last_name: '',

        email: '',

        phone_number: '',

        password: '',

        confirm_password: '',

    });




    const [errors, setErrors] = useState({});




    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;




    const handleSubmit = () => {

        const error = validateForm();

        setErrors(error || {});

        if (error) return;

        else {

            onSubmit();

        }

    };




    const onSubmit = async () => {

        try {

            const data = await userServices.registerUser(userData);

            console.log(data);

            navigation.navigate('Login');

        } catch (error) {

            console.log(error);

        }

    };




    const validateForm = () => {

        const errors = {};




        const {

            first_name,

            last_name,

            email,

            password,

            confirm_password,

            phone_number,

        } = userData;

        if (!emailRegex.test(email)) {

            errors.email = 'Please Enter A Valid Email';

        }

        if (password.length < 6) {

            errors.password = 'Password must be at least 6 characters';

        }

        if (confirm_password !== password) {

            errors.confirm_password = "Password Doesn't Match";

        }

        if (first_name.length < 1) {

            errors.first_name = 'First Name Is Required';

        }

        if (last_name.length < 1) {

            errors.last_name = 'Last Name Is Required';

        }

        if (!phoneRegex.test(phone_number)) {

            errors.phone_number = "Phone Number Doesn't Match Required Pattern";

        }

        return Object.keys(errors).length !== 0 ? errors : null;

    };




    const handleInput = (name, text) => {

        const clone = { ...userData };

        clone[name] = text;

        setUserData(clone);

    };




    return (

        <ScrollView>

            <View style={styles['container']}>

                <View style={styles['logoContainer']}>

                    <Text style={styles['logo']}>AdArt</Text>

                </View>

                <TextInput

                    onChangeText={text => handleInput('first_name', text)}

                    placeholder="First Name"

                    style={styles['input']}

                />

                <ErrorMessage error={errors['first_name']} />

                <TextInput

                    onChangeText={text => handleInput('last_name', text)}

                    placeholder="Last Name"

                    style={styles['input']}

                />

                <ErrorMessage error={errors['last_name']} />




                <TextInput

                    placeholder="Email"

                    style={styles['input']}

                    onChangeText={text => handleInput('email', text)}

                    keyboardType="email-address"

                />

                <ErrorMessage error={errors['email']} />




                <TextInput

                    placeholder="Phone No"

                    style={styles['input']}

                    onChangeText={text => handleInput('phone_number', +text)}

                    keyboardType={'phone-pad'}

                />

                <ErrorMessage error={errors['phone_number']} />




                <TextInput

                    onChangeText={text => handleInput('password', text)}

                    placeholder="Password"

                    style={styles['input']}

                    secureTextEntry

                />

                <ErrorMessage error={errors['password']} />




                <TextInput

                    onChangeText={text => handleInput('confirm_password', text)}

                    placeholder="Confirm Password"

                    style={styles['input']}

                    secureTextEntry

                />

                <ErrorMessage error={errors['confirm_password']} />




                <TouchableOpacity style={styles['button']} onPress={handleSubmit}>

                    <Text style={styles['text']}>Register</Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

    );

}




const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding: 15,

    },




    button: {

        width: '100%',

        backgroundColor: '#5E2CA5',

        alignItems: 'center',

        padding: 15,

        borderRadius: 25,

        justifyContent: 'center',

        marginVertical: 10,

    },

    text: {

        color: '#fff',

        fontSize: 18,

        textTransform: 'uppercase',

    },

    logoContainer: {

        justifyContent: 'center',

        alignItems: 'center',

        paddingTop: 50,

        paddingBottom: 30,

    },

    logo: {

        fontSize: 50,

        color: '#5E2CA5',

        fontWeight: '600',

    },

    input: {

        width: '100%',

        height: 70,

        borderRadius: 25,

        backgroundColor: '#eee',

        marginVertical: 10,

        padding: 10,

        fontSize: 18,

    },

    login: {

        alignSelf: 'center',

        paddingVertical: 10,

        fontSize: 18,

    },

});




export default RegisterScreen;