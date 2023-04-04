import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { Colors } from './Colors';

export const Text = (props) => {
    const { text, plan,title,largeText,heading,location,color, children, style = {} } = props;

    return (
        <RNText
            style={[
                heading && styles.heading,
                title && styles.title,
                largeText && styles.largeText,
                plan && styles.plan,
                location && styles.location,
                color && { color: Colors[color] },
                style && style,
            ]}
        >
            {text ? text : children}
            {/* {text || children} */}
        </RNText>
    );
};

const styles = StyleSheet.create({
    largeText:{
        fontSize:92
    },
    heading: {
        fontSize: 30,
        color: Colors.tertiary,
    },
    title: {
        fontSize: 30,
        color:Colors.primary
    },
    plan:{
        fontSize:16,
        color:Colors.secondary
    },
    location:{
    justifyContent:'flex-start'
    },
   
});