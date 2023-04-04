
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

class QuikNavigation extends Component {

    constructor(props, { navigation }) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'minus' : 'plus'} size={30} />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <Text>{this.props.data}</Text>
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}
export default QuikNavigation
const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'blue'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        Color: 'blue'
    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    child: {
        backgroundColor: 'white',
    }

});
