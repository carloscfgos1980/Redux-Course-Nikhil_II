import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // To check if the item is already available
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.price += newItem.price;
            } else {
                state.itemsList.push({
                    name: newItem.name,
                    id: newItem.id,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
        },
        removeFromCart(state, action) { },
        setShowCart(state) {
            state.showCart = true;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;