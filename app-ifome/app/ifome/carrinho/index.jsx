import React, { useContext } from "react";
import { FoodContext } from "../../../scripts/appContext";
import { Text, FlatList, View, StyleSheet, Pressable } from "react-native";
import NavBar from "../../../components/NavBar";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const ShoppingCart = () => {
    const { menu, quantidadeCarrinho, totalPedido, alterarQuantidade } = useContext(FoodContext);

    return (
        <>
            <NavBar
                icon={<Entypo name="chevron-left" size={24} color="white" />}
                href={'/FoodDelivery'}
                titulo={'Carrinho'}
                cor={'#FF6347'}
            />

            <View style={styles.container}>
                {quantidadeCarrinho === 0 ? (
                    <View style={styles.emptyContainer}>
                        <AntDesign name="shoppingcart" size={48} color="black" />
                        <Text style={styles.emptyText}>O Carrinho está vazio</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={menu.filter(item => item.quantidade > 0)}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.info}>
                                        <Text style={styles.title}>{item.nome}</Text>
                                        <Text style={styles.subtitle}>{item.fornecedor}</Text>
                                    </View>
                                    <View style={styles.details}>
                                        <Text style={styles.price}>R${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</Text>
                                        <View style={styles.quantityContainer}>
                                            <Pressable onPress={() => alterarQuantidade(item.id, 'decrementar')}>
                                                <Entypo name="minus" size={20} color="#FF4500" />
                                            </Pressable>
                                            <Text style={styles.quantityBox}>{item.quantidade}</Text>
                                            <Pressable onPress={() => alterarQuantidade(item.id, 'incrementar')}>
                                                <Entypo name="plus" size={20} color="#FF4500" />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total do Pedido</Text>
                            <Text style={styles.totalValue}>R${totalPedido.toFixed(2).replace('.', ',')}</Text>
                            <Pressable style={styles.checkoutButton}>
                                <Text style={styles.checkoutText}>Finalizar Compra</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 22,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    subtitle: {
        fontSize: 14,
        color: '#6D6D6D',
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF6347',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FF4500',
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        width: 90,
    },
    quantityBox: {
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 10,
        color: '#333333',
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
    totalText: {
        fontSize: 18,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginVertical: 8,
    },
    checkoutButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 12,
        paddingHorizontal: 64,
        borderRadius: 8,
    },
    checkoutText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    }
});

export default ShoppingCart;
