import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

const NavBar = ({ titulo, href, icon, cor }) => {
    return (
        <View style={[styles.bar, { backgroundColor: cor }]}>
            <Link href={href}>
                <View>
                    {icon}
                </View>
            </Link>
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titulo: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    },
    icon: {
        color: 'white',
        fontSize: 24,
    },
});

export default NavBar;
