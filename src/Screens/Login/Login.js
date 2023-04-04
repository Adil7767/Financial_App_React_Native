// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
// // import ButtonWithLoader from '../../Components/ButtonWithLoader';
// // import TextInputWithLable from '../../Components/TextInputWithLabel';
// // import validator from '../../utils/validations';
// // import { showError, showSuccess } from '../../utils/helperFunction';
// // import actions from '../../redux/actions';
// // import { ScrollView } from 'react-native-gesture-handler';
// // import { useSelector, useDispatch } from "react-redux";
// // import { RESET_PASSWORD } from "../../redux/actions/User/UserAction";


// // // import { BackHandler } from 'react-native';
// // const Login = ({ navigation }) => {
// //     const dispatch = useDispatch();
// //     const data = useSelector((state) => state)
// //     var AA = data.user.token
// //     // console.log('token before 1st time login', AA)



// //     const [state, setState] = useState({
// //         isLoading: false,
// //         email: '',
// //         password: '',
// //         isSecure: true,
// //         access_token: '',
// //         // token: ''
// //     })
// //     const { isLoading, email, access_token, password, isSecure } = state
// //     const updateState = (data) => setState(() => ({ ...state, ...data }))


// //     const isValidData = () => {
// //         const error = validator({
// //             email,
// //             password
// //         })
// //         if (error) {
// //             showError(error)
// //             return false
// //         }
// //         return true
// //     }

// //     const onLogin = async () => {

// //         const checkValid = isValidData()
// //         if (checkValid) {
// //             updateState({ isLoading: true })
// //             try {
// //                 const res = await actions.login({
// //                     email,
// //                     password,
// //                     // token
// //                 })
// //                 console.log("res==>>>>>", res)
// //                 // if (!res.data.emailVerified) {
// //                 //     alert("Please verify your email")
// //                 // }
// //                 updateState(access_token = res.token.access)
// //                 dispatch(RESET_PASSWORD({
// //                     token: res.token.access
// //                 }))

// //                 updateState({ isLoading: false })

// //                 console.log('token', res.token.access)

// //             } catch (error) {
// //                 console.log('login error', error)
// //                 showError(error.errors.non_field_errors)
// //                 updateState({ isLoading: false })
// //             }

// //         }
// //     }

// //     return (
// //         <ScrollView style={styles.container}>
// //             <Text style={styles['logo']}>AdArt</Text>
// //             <TextInputWithLable
// //                 label="Email"
// //                 placheHolder="Enter your email"
// //                 onChangeText={(email) => updateState({ email })}
// //                 keyboardType="email-address"
// //             />
// //             <TextInputWithLable
// //                 label="Password"
// //                 placheHolder="Enter your password"
// //                 // isSecure={isSecure}
// //                 secureTextEntry={isSecure}
// //                 onChangeText={(password) => updateState({ password })}
// //                 keyboardType="password"
// //                 maxLength={20}
// //                 minLength={4}
// //             />
// //             <View>
// //                 <Text style={styles['right']}>
// //                     {/* Reset Password{' '} */}
// //                     <Text
// //                         style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
// //                         onPress={() => navigation.navigate('ForgetPasssword')}>
// //                         Forget Password
// //                     </Text>
// //                 </Text>
// //             </View>
// //             <ButtonWithLoader
// //                 text="Login"
// //                 onPress={onLogin}
// //                 isLoading={isLoading}
// //             />

// //             <View style={{ marginVertical: 8 }} />

// //             <ButtonWithLoader
// //                 text="Signup"
// //                 onPress={() => navigation.navigate('Signup')}
// //             />

// //             {/* <Pressable onPress={() => navigation.navigate('Signup')} ><Text>zz</Text></Pressable> */}
// //         </ScrollView>
// //     );
// // };


// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 24,
// //         paddingTop: 94,
// //         backgroundColor: 'white',

// //     },
// //     logo: {
// //         alignSelf: 'center',
// //         fontSize: 50,
// //         color: '#5E2CA5',
// //         fontWeight: '600',
// //     },
// //     right: {
// //         flex: 0,
// //         textAlign: 'right',
// //         // alignSelf: 'center',
// //         paddingVertical: 10,
// //         fontSize: 15,
// //     }
// // });


// // export default Login;









// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
// import ButtonWithLoader from '../../Components/ButtonWithLoader';
// import TextInputWithLable from '../../Components/TextInputWithLabel';
// import validator from '../../utils/validations';
// import { showError, showSuccess } from '../../utils/helperFunction';
// import actions from '../../redux/actions';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useSelector, useDispatch } from "react-redux";
// import { RESET_PASSWORD } from "../../redux/actions/User/UserAction";


// // import { BackHandler } from 'react-native';
// const Login = ({ navigation }) => {
//     const dispatch = useDispatch();
//     const userData = useSelector((state) => state.userData);

//     const [state, setState] = useState({
//         isLoading: false,
//         email: '',
//         password: '',
//         isSecure: true,
//     });

//     const { isLoading, email, password, isSecure } = state;

//     const updateState = (data) => setState((prevState) => ({ ...prevState, ...data }));

//     const isValidData = () => {
//         const error = validator({
//             email,
//             password,
//         });

//         if (error) {
//             showError(error);
//             return false;
//         }

//         return true;
//     };

//     const onLogin = async () => {
//         const checkValid = isValidData();

//         if (checkValid) {
//             updateState({ isLoading: true });

//             try {
//                 const res = await actions.login({
//                     email,
//                     password,
//                 });

//                 console.log("res==>>>>>", res);

//                 updateState({ isLoading: false });

//                 console.log('token', res.token.access);

//                 dispatch(RESET_PASSWORD({
//                     token: res.token.access,
//                 }));

//                 dispatch({
//                     type: 'SET_USER_DATA',
//                     payload: {
//                         email: res.email,
//                         token: res.token.access,
//                     },
//                 });

//                 showSuccess('Logged in successfully');

//             } catch (error) {
//                 console.log('login error', error);
//                 showError(error.errors.non_field_errors);
//                 updateState({ isLoading: false });
//             }
//         }
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles['logo']}>AdArt</Text>

//             <TextInputWithLable
//                 label="Email"
//                 placheHolder="Enter your email"
//                 onChangeText={(email) => updateState({ email })}
//                 keyboardType="email-address"
//             />

//             <TextInputWithLable
//                 label="Password"
//                 placheHolder="Enter your password"
//                 secureTextEntry={isSecure}
//                 onChangeText={(password) => updateState({ password })}
//                 keyboardType="password"
//                 maxLength={20}
//                 minLength={4}
//             />

//             <View>
//                 <Text style={styles['right']}>
//                     <Text
//                         style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
//                         onPress={() => navigation.navigate('ForgetPasssword')}
//                     >
//                         Forget Password
//                     </Text>
//                 </Text>
//             </View>

//             <ButtonWithLoader
//                 text="Login"
//                 onPress={onLogin}
//                 isLoading={isLoading}
//             />

//             <View style={{ marginVertical: 8 }} />

//             <ButtonWithLoader
//                 text="Signup"
//                 onPress={() => navigation.navigate('Signup')}
//             />

//             {/* <Pressable onPress={() => navigation.navigate('Signup')} ><Text>zz</Text></Pressable> */}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         paddingTop: 94,
//         backgroundColor: 'white',

//     },
//     logo: {
//         alignSelf: 'center',
//         fontSize: 50,
//         color: '#5E2CA5',
//         fontWeight: '600',
//     },
//     right: {
//         flex: 0,
//         textAlign: 'right',
//         // alignSelf: 'center',
//         paddingVertical: 10,
//         fontSize: 15,
//     }
// });
// export default Login;



import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import validator from '../../utils/validations';
import { showError, showSuccess } from '../../utils/helperFunction';
import actions from '../../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux";
import { RESET_PASSWORD } from "../../redux/actions/User/UserAction";


const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state);
    // userData.access
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        isSecure: true,
    });

    const { isLoading, email, password, isSecure } = state;

    const updateState = (data) => setState({ ...state, ...data });

    const isValidData = () => {
        const error = validator({
            email,
            password,
        });
        if (error) {
            showError(error);
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        const checkValid = isValidData();
        if (checkValid) {
            updateState({ isLoading: true });
            try {
                const res = await actions.login({
                    email,
                    password,
                });
                console.log("res==>>>>>", res);
                updateState({ isLoading: false });

                // if (!res.emailVerified) {
                //     alert("Please verify your email");
                // } else {
                const token = res.token;
                dispatch(RESET_PASSWORD({ token }));
                console.log('token', token);
                // }

            } catch (error) {
                console.log('login error', error);
                showError(error.msg);
                let err = error.errors.non_field_errors;
                showError(err)

                updateState({ isLoading: false });
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.logo}>AdArt</Text>
            <TextInputWithLabel
                label="Email"
                placheHolder="Enter your email"
                onChangeText={(email) => updateState({ email })}
                keyboardType="email-address"
            />
            <TextInputWithLabel
                label="Password"
                placheHolder="Enter your password"
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
                maxLength={20}
                minLength={4}
            />
            <View>
                <Text style={styles.right}>
                    <Text
                        style={{ color: '#5E2CA5', fontWeight: 'bold', fontSize: 20 }}
                        onPress={() => navigation.navigate('ForgetPasssword')}
                    >
                        Forget Password
                    </Text>
                </Text>
            </View>
            <ButtonWithLoader
                text="Login"
                onPress={onLogin}
                isLoading={isLoading}
            />
            <View style={{ marginVertical: 8 }} />
            <ButtonWithLoader
                text="Signup"
                onPress={() => navigation.navigate('Signup')}
            />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 94,
        backgroundColor: 'white',
    },
    logo: {
        alignSelf: 'center',
        fontSize: 50,
        color: '#5E2CA5',
        fontWeight: '600',
    },

    right: {
        flex: 0,
        textAlign: 'right',
        // alignSelf: 'center',
        paddingVertical: 10,
        fontSize: 15,
    }
});
export default Login;
