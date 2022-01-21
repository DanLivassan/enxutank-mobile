import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../context/auth.context';
import Icon from 'react-native-vector-icons/FontAwesome5'

const CustomDrawer = (props) => {
    const { performLogout } = useAuth()
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.contentView}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View styles={styles.bottomMenu}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { performLogout() }}>
                    <Icon size={16} name="sign-out-alt" style={{ color: "#db4a39", alignSelf: "center" }} />
                    <Text style={{ color: "#db4a39", margin: 8, alignSelf: "center" }}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomMenu: {
        flex: 2
    },
    contentView: {
        flex: 5,
        backgroundColor: "#db4a39",
        tintColor: "white",
        color: "white"
    },
    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 12,
        color: "#db4a39",
        fontSize: 16,
    }
})

export default CustomDrawer;
