import React, { Component } from 'react';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert
} from 'react-native';
import LoginScreen from './LoginScreen';
import MainScreen from '../MainScreen/MainScreen';
export default class Splash extends Component {
    constructor({ navigation }) {
        super();
        this.state = {
            isVisible: true,
        }

    }
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 3000);
    }
    render() {
        let Splash_Screen = (
            <View style={styles.SplashScreen_RootView}>
                <View style={styles.SplashScreen_ChildView}>
                    <Image
                        style={[styles.img]}
                        source={require('../assets/welcome.png')}
                    />
                </View>
            </View>)
        return (
            <View style={{ flex: 1 }}>
                <LoginScreen />
                {
                    (this.state.isVisible === true) ? Splash_Screen : null
                }
            </View>

        );
    }
}
const styles = StyleSheet.create(
    {

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },

        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00BCD4',
            flex: 1,
        },
        img: {
            width: '100%',
            height: '100%',
        }
    });  