//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigations/Route';
import FlashMessage from "react-native-flash-message";
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import { getUserData } from './src/utils/utils';
import { saveUserData } from './src/redux/actions/auth';
import SplashScreen from "react-native-splash-screen";
const App = () => {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state)
  // var AA = data.user.token
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // useEffect(() => {
  //   (async () => {
  //     const userData = await getUserData();
  //     console.log("user data App.js", userData)
  //     if (!!userData) {
  //       saveUserData(userData)
  //     }
  //   })();
  // }, [])


  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        position="top"
      />
    </Provider>
  );
};

export default App;
