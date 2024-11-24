import { createContext, useState, useEffect } from "react";

export const FoodContext = createContext();

export const AppProvider = ({ children }) => {
    const [totalOrder, setTotalOrder] = useState(0);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [menu, setMenu] = useState([
        {
            id: '1',
            name: 'Vegan Burger',
            vendor: 'Veggie Burgers',
            price: 39.90,
            quantity: 0,
            image: 'https://s2.glbimg.com/jqfaCA6V4Yb2xgU1JzPD200Kaxk=/smart/e.glbimg.com/og/ed/f/original/2018/07/20/matilda_vegano_wellington_nemeth_1.jpg',
            description: 'Vegan burger with chickpeas and vegetables.'
        },
        {
            id: '2',
            name: 'Salmon Sushi',
            vendor: 'Sushi Place',
            price: 45.50,
            quantity: 0,
            image: 'https://img.lovepik.com/bg/20231228/sushi-with-salmon-on-leaves-with-black-background_2495650_wh860.png',
            description: 'Sushi with fresh salmon and seasoned rice.'
        },
        {
            id: '3',
            name: 'Chicken Taco',
            vendor: 'Taco House',
            price: 27.50,
            quantity: 0,
            image: 'https://receitason.com/wp-content/uploads/2023/06/Tacos-de-frango-com-queijo-e-salada.jpg',
            description: 'Taco filled with chicken, guacamole, and salsa.'
        },
        {
            id: '4',
            name: 'Brigadeiro',
            vendor: 'Doces da Maria',
            price: 3.50,
            quantity: 0,
            image: 'https://harald.com.br/wp-content/uploads/2020/04/briadeirogormet-melken-700x520-1.jpg',
            description: 'Classic brigadeiro, per unit.'
        },
        {
            id: '5',
            name: 'Açaí Bowl',
            vendor: 'Açaí Mania',
            price: 19.90,
            quantity: 0,
            image: 'https://i.pinimg.com/originals/b3/e0/a5/b3e0a5678eccd90997a85adb6bbcbbfc.jpg',
            description: 'Açaí with granola and fruits.'
        },
        {
            id: '6',
            name: 'Natural Juice',
            vendor: 'Bebidas Naturais',
            price: 12.00,
            quantity: 0,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHRPlbEVZUdjBgmSom4GO_js7lCyXHCaA9w&s',
            description: 'Fresh orange juice. 300ml.'
        },
        {
            id: '7',
            name: 'Mineral Water',
            vendor: 'Água Pura',
            price: 3.00,
            quantity: 0,
            image: 'https://www.plastico.com.br/wp-content/uploads/2023/07/agua-mineral-iStock-866929570.jpg',
            description: 'Bottle of mineral water. 500ml.'
        },
        {
            id: '8',
            name: 'Lemon Soda',
            vendor: 'Bebidas do Carlos',
            price: 4.50,
            quantity: 0,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQmIc_AwAqXjwSP_RcPcRGKvi7bP2pt71zSA&s',
            description: 'Can of lemon soda. 500ml.'
        },
    ]);

    const updateQuantity = (id, type) => {
        setMenu(prevMenu => {
            const updatedMenu = prevMenu.map(item => {
                if (item.id === id) {
                    const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity > 0 ? item.quantity - 1 : 0;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            const totalItems = updatedMenu.reduce((total, item) => total + item.quantity, 0);
            setCartQuantity(totalItems);
            return updatedMenu;
        });
    }

    useEffect(() => {
        const totalAmount = menu.reduce((total, item) => total + (item.price * item.quantity), 0);
        setTotalOrder(totalAmount);
    }, [menu]);

    return (
        <FoodContext.Provider value={{ menu, cartQuantity, updateQuantity, totalOrder }}>
            {children}
        </FoodContext.Provider>
    )
}