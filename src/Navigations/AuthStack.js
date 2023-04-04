import React from 'react';

import { ForgetPasssword, Login, Signup, ResetPassword, NavList, MainScreen } from '../'

export default function (Stack) {
    return (
        <>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgetPasssword"
                component={ForgetPasssword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
            // options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ headerShown: false }}
            /> */}

        </>
    )
}