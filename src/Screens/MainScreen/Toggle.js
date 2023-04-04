import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Modal, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { BackUpOffModal, BackUpModal } from '../../index';
import { useNavigation } from '@react-navigation/native';

const Toggle = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [modalContent, setModalContent] = useState(null);



    const toggleSwitch = () => {
        const CloseModal = () => {
            setModalVisible(false)
            setModalContent(null)
            navigation.navigate('Settings')


        }
        setIsEnabled(previousState => !previousState)
        // navigation.navigate('MyWidget')

        if (isEnabled == false) {
            // return (
            // setModalVisible(true);
            console.log('BackUp is ready')
            setModalContent(
                <View style={[styles.container]}>
                    <Modal
                        // visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.container}>
                            <BackUpModal navigation={navigation} />
                            < View style={styles.button}>

                                <Button title='Close Modal' onPress={() => CloseModal()}>
                                </Button>
                            </View>
                        </View>
                    </Modal >
                </View >
            );
        }
        else if (isEnabled != false) {

            // return (
            // setModalVisible(true);
            console.log('BackUp is Off')
            setModalContent(
                <View style={[styles.container]}>
                    <Modal
                        // visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.container}>
                            {/* <Text>This is a simple end modal</Text> */}
                            <BackUpOffModal navigation={navigation} />
                            <View style={styles.button}>

                                <Button title='Close Modal' onPress={() => CloseModal()}>
                                </Button>
                            </View>

                        </View>
                    </Modal >
                </View >
            );
        }
        // navigation.navigate('Settings')
    };

    return (
        <>
            <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                thumbColor={isEnabled ? 'white' : 'green'}
                ios_backgroundColor="#3e3e3e"
                size="large"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {modalContent}
        </>

    );
};

export default Toggle;

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        margin: 40,
        marginVertical: '60%',
        height: '50%',
        backgroundColor: 'white',

        // backgroundColor: 'red'
        borderWidth: 1
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 36
    },



})







// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Switch, Modal, StyleSheet } from 'react-native';
// const Toggle = ({ navigation }) => {
//     const [isEnabled, setIsEnabled] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalContent, setModalContent] = useState(null);

//     const toggleSwitch = () => {
//         setIsEnabled((previousState) => !previousState);

//         if (isEnabled === false) {
//             console.log("BackUp is ready");
//             setModalVisible(true);
//             setModalContent(
//                 <View style={[styles.container]}>
//                     <Modal
//                         visible={modalVisible}
//                         animationType="slide"
//                         transparent={true}
//                         onRequestClose={() => setModalVisible(false)}
//                     >
//                         <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
//                             <Text>This is a simple modal</Text>
//                             <TouchableOpacity onPress={() => setModalVisible(false)}>
//                                 <Text>Close Modal</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </Modal>
//                 </View>
//             );
//         } else {
//             setModalVisible(false);
//             setModalContent(null);
//         }
//     };

//     return (
//         <>
//             <Switch
//                 trackColor={{ false: "#767577", true: "green" }}
//                 thumbColor={isEnabled ? "white" : "green"}
//                 ios_backgroundColor="#3e3e3e"
//                 size="large"
//                 onValueChange={toggleSwitch}
//                 value={isEnabled}
//             />
//             {/* {modalContent} */}
//         </>
//     );
// };

// export default Toggle;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         margin: 40,
//         marginVertical: '60%',
//         height: '100%',
//         backgroundColor: '#FAFAFA',


//     },
// })
