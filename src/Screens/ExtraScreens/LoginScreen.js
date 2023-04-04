// // import React, { useState } from 'react';
// // import {
// //     StyleSheet,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     View,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/FontAwesome5';
// // import { RSAKeychain } from 'react-native-rsa-native';
// // import ReactNativeBiometrics, { Biometrics } from 'react-native-biometrics';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { showSuccess2 } from '../../utils/HelpMSGS';
// // import TextInputWithLable from '../Components/Login/TextInputWithLabel';

// // function LoginScreen({ navigation }) {
// //     const [userData, setUserData] = useState({});
// //     const [publicKey, setPublicKey] = useState();
// //     const dispatch = useDispatch();

// //     const onSubmit = async () => {
// //         const rnBiometrics = new ReactNativeBiometrics();
// //         const { available } = await rnBiometrics.isSensorAvailable();
// //         const payload = 'AdArt';
// //         if (!available) {
// //             dispatch({ type: 'REGISTER_USER', payload: userData });
// //         } else {
// //             try {
// //                 const { keysExist } = await rnBiometrics.biometricKeysExist();
// //                 if (!keysExist) {
// //                     const { publicKey } = await rnBiometrics.createKeys();
// //                     setPublicKey(publicKey);
// //                 }

// //                 const { success, signature } = await rnBiometrics.createSignature({
// //                     promptMessage: 'Confirm Your Identity',
// //                     cancelButtonText: 'Cancel',
// //                     payload: 'AdArt',
// //                 });
// //                 if (success) {
// //                     console.log(valueOf);
// //                     dispatch({
// //                         type: 'REGISTER_USER',
// //                         payload: { ...userData, fingerPrint: signature },
// //                     });
// //                     console.log(publicKey);
// //                     showSuccess2();
// //                     navigation.navigate('MainScreen');
// //                 }
// //             } catch (error) {
// //                 console.log('===============Error=====================');
// //                 console.log(error);
// //                 console.log('====================================');
// //             }
// //         }
// //     };

// //     const handleInput = (name, text) => {
// //         const clone = { ...userData };
// //         clone[name] = text;
// //         setUserData(clone);
// //     };

// //     return (
// //         <View style={styles['container']}>
// //             {/* Logo */}
// //             <View style={styles['logoContainer']}>
// //                 <Text style={styles['logo']}>AdArt</Text>
// //             </View>

// //             {/* Input Fields */}

// //             {/* <TextInput
// //                 placeholder="Email"
// //                 style={styles['input']}
// //                 onChangeText={text => handleInput('email', text)}
// //                 keyboardType="email-address"
// //             /> */}
// //             <TextInputWithLable placheHolder='Email'
// //                 // label='Email'
// //                 // value='123'
// //                 // isSecure={true}
// //                 onChangeText={text => handleInput('email', text)}
// //                 keyboardType="email-address"
// //             // visiblePassword={true}
// //             />
// //             <TextInputWithLable placheHolder='Password'
// //                 // label='Password's
// //                 // value='123'
// //                 isSecure={true}
// //                 onChangeText={text => handleInput('password', text)}
// //                 secureTextEntry
// //                 maxLength={8}
// //             />
// //             <View>
// //                 <Text style={styles['right']}>
// //                     Reset Password{' '}
// //                     <Text
// //                         style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
// //                         onPress={() => navigation.navigate('ForgetPasssword')}>
// //                         Forget Password
// //                     </Text>
// //                 </Text>
// //             </View>
// //             {/* Button */}
// //             <View style={styles['btnContainer']}>
// //                 <TouchableOpacity style={styles['button2']} onPress={onSubmit}>
// //                     <Icon
// //                         name="fingerprint"
// //                         style={[styles.icon]}
// //                     ></Icon>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={styles['button']} onPress={onSubmit}>
// //                     <Text style={styles['text']}>Login</Text>
// //                 </TouchableOpacity>

// //             </View>
// //             <View>
// //                 <Text style={styles['login']}>
// //                     Don't have an Account{' '}
// //                     <Text
// //                         style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
// //                         onPress={() => navigation.navigate('Register')}>
// //                         Register
// //                     </Text>
// //                 </Text>
// //             </View>

// //             {/* <View style={styles['btnContainer']}>
// //                 <TouchableOpacity style={styles['button']} onPress={onSubmit}>
// //                     <Text style={styles['text']}>Login</Text>
// //                 </TouchableOpacity>
// //             </View> */}
// //         </View>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 15,
// //     },

// //     button: {
// //         width: '80%',
// //         backgroundColor: '#5E2CA5',
// //         alignItems: 'center',
// //         padding: 15,
// //         borderRadius: 25,
// //         flex: 1,
// //         marginVertical: 10,
// //     },
// //     button2: {
// //         width: '20%',
// //         alignItems: 'center',
// //         padding: 10,
// //         borderRadius: 25,
// //         // marginVertical: 10,
// //         borderWidth: 1,
// //         backgroundColor: '#AFE1AF',
// //         margin: 2,
// //     },
// //     btnContainer: {
// //         flexDirection: 'row',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     fingerIcon: {
// //         width: '20%',
// //         alignItems: 'center',
// //     },
// //     text: {
// //         color: '#fff',
// //         fontSize: 18,
// //         textTransform: 'uppercase',
// //     },
// //     logoContainer: {
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         paddingTop: 50,
// //         paddingBottom: 30,
// //     },
// //     logo: {
// //         fontSize: 50,
// //         color: '#5E2CA5',
// //         fontWeight: '600',
// //     },
// //     input: {
// //         width: '100%',
// //         height: 70,
// //         borderRadius: 25,
// //         backgroundColor: '#eee',
// //         marginVertical: 10,
// //         padding: 10,
// //         fontSize: 18,
// //     },
// //     login: {
// //         alignSelf: 'center',
// //         paddingVertical: 10,
// //         fontSize: 18,
// //     },
// //     icon: {
// //         color: "#483d8b",
// //         fontSize: 30
// //     },
// //     right: {
// //         flex: 0,
// //         textAlign: 'right',
// //         // alignSelf: 'center',
// //         paddingVertical: 10,
// //         fontSize: 15,
// //     }
// // });

// // export default LoginScreen;


// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useDispatch } from 'react-redux';
// import userServices from '../api/userServices';
// import ErrorMessage from '../Components/ErrorMessage';

// function LoginScreen({ navigation }) {
//     const [userData, setUserData] = useState({ email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const dispatch = useDispatch();

//     const handleInput = (name, text) => {
//         const clone = { ...userData };
//         clone[name] = text;
//         setUserData(clone);
//     };

//     const handleSubmit = () => {
//         const error = validateForm();
//         setErrors(error || {});
//         if (error) {
//             return null;
//         } else {
//             onSubmit();
//         }
//     };
//     const onSubmit = async () => {
//         try {
//             const data = await userServices.loginUser(userData);
//             console.log(data.token.access);
//             dispatch({ type: 'SET_TOKEN', payload: data.token.access });
//             navigation.navigate('MainScreen');
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//     const validateForm = () => {
//         const errors = {};

//         const { email, password } = userData;
//         if (!emailRegex.test(email)) {
//             errors.email = 'Please Enter A Valid Email';
//         }
//         if (password.length < 6) {
//             errors.password = 'Password must be at least 6 characters';
//         }
//         return Object.keys(errors).length !== 0 ? errors : null;
//     };

//     return (
//         <ScrollView style={styles['container']}>
//             {/* Logo */}
//             <View style={styles['logoContainer']}>
//                 <Text style={styles['logo']}>AdArt</Text>
//             </View>

//             {/* Input Fields */}

//             <TextInput
//                 placeholder="Email"
//                 style={styles['input']}
//                 onChangeText={text => handleInput('email', text)}
//                 keyboardType="email-address"
//             />
//             <ErrorMessage error={errors.email} />

//             <TextInput
//                 onChangeText={text => handleInput('password', text)}
//                 placeholder="Password"
//                 style={styles['input']}
//                 secureTextEntry
//                 maxLength={8}
//                 minLength={8}
//             />
//             <ErrorMessage error={errors.password} />



//             <View>
//                 <Text style={styles['right']}>

//                     <Text
//                         style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
//                         onPress={() => navigation.navigate('ForgetPasssword')}>
//                         Forget Password
//                     </Text>
//                 </Text>
//             </View>
//             {/* Button */}
//             <View style={styles['btnContainer']}>
//                 <TouchableOpacity style={styles['button2']}>
//                     <Icon name="fingerprint" style={[styles.icon]}></Icon>
//                 </TouchableOpacity>


//                 <TouchableOpacity style={styles['button']} onPress={handleSubmit}>
//                     <Text style={styles['text']}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text style={styles['login']}>
//                 Don't have an Account{' '}
//                 <Text
//                     style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
//                     onPress={() => navigation.navigate('Register')}>
//                     Register
//                 </Text>
//             </Text>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 15,
//     },

//     button: {
//         width: '80%',
//         backgroundColor: '#5E2CA5',
//         alignItems: 'center',
//         padding: 15,
//         borderRadius: 25,
//         flex: 1,
//         marginVertical: 10,
//     },
//     button2: {
//         width: '20%',
//         alignItems: 'center',
//         padding: 10,
//         borderRadius: 25,
//         marginVertical: 10,
//         borderWidth: 1,
//         backgroundColor: '#AFE1AF',
//         margin: 2,
//     },
//     btnContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     fingerIcon: {
//         width: '20%',
//         alignItems: 'center',
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
//     icon: {
//         color: '#483d8b',
//         fontSize: 30,
//     },
//     right: {
//         flex: 0,
//         textAlign: 'right',
//         // alignSelf: 'center',
//         paddingVertical: 10,
//         fontSize: 15,
//     }
// });

// export default LoginScreen;