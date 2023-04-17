
// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";

// class ShowHide extends Component {

//     constructor(props, { navigation }) {
//         super(props);
//         this.state = {
//             data: props.data,
//             expanded: false,
//         }

//         if (Platform.OS === 'android') {
//             UIManager.setLayoutAnimationEnabledExperimental(true);
//         }
//     }

//     render() {

//         return (
//             <View>
//                 <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
//                     <Icon name={this.state.expanded ? 'minus' : 'plus'} style={[styles.icon]} />
//                     <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
//                 </TouchableOpacity>
//                 <View style={styles.parentHr} />
//                 {
//                     this.state.expanded &&
//                     <View style={styles.child}>
//                         <Text>{this.props.data}</Text>
//                     </View>
//                 }

//             </View>
//         )
//     }

//     toggleExpand = () => {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         this.setState({ expanded: !this.state.expanded })
//     }

// }
// export default ShowHide
// const styles = StyleSheet.create({
//     title: {
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: 'blue'
//     },
//     row: {
//         flexDirection: 'row',
//         // justifyContent: 'space-between',
//         height: 56,
//         paddingLeft: 25,
//         paddingRight: 18,
//         // alignItems: 'center',
//         Color: 'blue'
//     },
//     parentHr: {
//         height: 1,
//         color: 'white',
//         width: '100%'
//     },
//     child: {
//         // backgroundColor: 'white',
//     },
//     icon: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'blue',

//     }

// });




import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ShowHide = ({ title, data }) => {
    const [expanded, setExpanded] = useState(false);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    }

    return (
        <View>
            <TouchableOpacity style={styles.row} onPress={toggleExpand}>
                <Icon name={expanded ? 'minus' : 'plus'} style={[styles.icon]} />
                <Text style={[styles.title, styles.font]}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.parentHr} />
            {expanded && (
                <View style={styles.child}>
                    <Text>{data}</Text>
                </View>
            )}
        </View>
    )
}

export default ShowHide;

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue'
    },
    row: {
        flexDirection: 'row',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        Color: 'blue'
    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    child: {
        // backgroundColor: 'white',
    },
    icon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    }
});
