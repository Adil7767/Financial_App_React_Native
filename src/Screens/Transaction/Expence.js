import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image } from 'react-native';
import { useSelector } from "react-redux";
import actions from "../../redux/actions/index";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
const Expence = () => {
    useEffect(() => {
        onTransactionList()
    }, []);
    const txt = useSelector((state) => state)
    var token = txt?.user?.token
    const accessToken = token?.token?.access;
    const DATA = useSelector((state) => state.user);
    const Data = DATA.userData;
    const [filteredData, setFilteredData] = useState([]);
    var searchQuery = 'EXPENSE'
    const onTransactionList = async () => {
        try {
            const res = await actions.transactionget({

            },
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            )
            console.log("res of search==>>>>>", res.results)
            const filtered = await res.results.filter((item) => {
                const searchLower = searchQuery.toLowerCase();
                const type_nameLower = typeof item.type_name === 'string' ? item.type_name.toLowerCase() : '';
                return (
                    type_nameLower.includes(searchLower)

                );
            });

            setFilteredData(filtered);
        }
        catch (error) {
            console.log('Transaction search error==========>', error)
        }
    }
    return (
        <ScrollView>
            {filteredData.map((item) => (
                <View style={styles.item}>
                    <Image
                        style={[styles.img]}
                        source={{ uri: item.image }}
                    />
                    <View style={[styles.right, styles.rw]}>
                        <View style={styles.clm}>
                            <Text style={styles.id}>{item.id}</Text>
                            <Text style={styles.type_name}>{item.type_name}</Text>
                            <Text style={[styles.description]}>{item.description}</Text>
                        </View>
                        <View style={styles.clm}>
                            <Text style={[styles.amount]} >RS:{item.amount}</Text>
                            <View style={[styles.rw]}>
                                <Icon name='bank' size={30} style={[styles.icon]} />
                                <Text style={[styles.amount]} >...</Text>
                            </View>
                            <Text style={[styles.icon]} >{item.category_name}</Text>

                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        borderBottomWidth: 1,
    },
    txt: {
        padding: 8,
        fontSize: 30,
        backgroundColor: "#FBFBFB",
        marginHorizontal: 10,
        color: 'black',
        borderBottomWidth: 1,

    },
    btn: {
        alignItems: 'center'
    },

    item: {
        padding: 8,
        // marginVertical: 8,

        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: "white",
        alignItems: 'center',


    },
    id: {
        color: 'red'
    },
    title: {
        maxWidth: "100%",
        // fontSize: 20,
        color: 'black'
    },
    amount: {
        fontSize: 15,
        textAlign: 'right',
        color: 'black',
        // paddingEnd: '10%'
    },

    img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 2,
        // marginLeft: 0
    },
    icon: {
        flex: 0,
        paddingRight: 5,
        color: 'green',
    },
    right: {
        flex: 1,
        justifyContent: "space-between",

    },
    date: {
        textAlignVertical: 'bottom',
        color: 'black'
    },
    clm: {
        flexDirection: 'column',


    },
    rw: {
        flexDirection: 'row',
    },
    category_name: {
        color: 'red'
    },
    frequency: {
        color: 'green'
    },
    payment_method: {
        color: 'aqua'
    }, payment_method_name: {
        color: 'yellow'
    },
    type: {
        color: 'pink'
    },
    category_name: {
        color: 'blue'
    },
    type_name: {
        color: 'purple'
    },
    description: {
        color: 'orange',
        maxWidth: '90%'
    },
});
export default Expence;
