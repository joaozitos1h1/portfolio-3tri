import { Text, View, FlatList, Pressable, Image, StyleSheet } from "react-native";
import NavBar from "../../components/NavBar";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from "react";
import { Link } from "expo-router";
import { FoodContext } from "../../scripts/appContext";

const FoodDelivery = () => {
    const { menu, quantidadeCarrinho, alterarQuantidade } = useContext(FoodContext);

    return (
        <>
            <NavBar
                icon={<Entypo name="home" size={24} color="white" />}
                href={'/'}
                titulo={'Food Delivery'}
                cor={'#FF6347'}
            />
            <View style={styles.container}>
                <View style={styles.cartButtonContainer}>
                    <Link href={'/ifome/carrinho'} style={styles.cartButton}>
                        <AntDesign name="shoppingcart" size={24} color="#FF6347" />
                        <Text style={{ marginLeft: 4 }}>{quantidadeCarrinho} itens</Text>
                    </Link>
                </View>
                <FlatList
                    data={menu}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.imagem }}
                            />
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.title}>{item.nome}</Text>
                                    <Text style={styles.subtitle}>{item.fornecedor}</Text>
                                </View>
                                <Text style={styles.description}>{item.descricao}</Text>
                                <View style={styles.bottomInfo}>
                                    <Text style={styles.price}>R${item.preco.toFixed(2).replace('.', ',')} </Text>
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
                        </View>
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginVertical: 6,
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
    price: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FF6347',
    },
    description: {
        fontSize: 14,
        color: '#555555',
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
    cartButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    bottomInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});

export default FoodDelivery;