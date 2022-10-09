import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "src/types/IGame";

interface CartState {
    cart: IGame[];
    cartTotalAmount: number;
    cartTotalQuantity: number;
}

const initialState: CartState = {
    cart: [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IGame>) => {
            const cartItem = state.cart.find((item) => item.id === action.payload.id);
            if (cartItem) {
                cartItem.amount++;
            } else {
                state.cart.push(action.payload)
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.id != action.payload)
        },
        decreaseStuffQuantity: (state, action: PayloadAction<IGame>) => {
            const cartItem = state.cart.find((item) => item.id === action.payload.id);
            cartItem && cartItem.amount--;
        },
        clearCart: (state) => {
            state.cart = [];
        },
        getTotals: (state) => {
            const { cost, quantity } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount;

                    cartTotal.cost += itemTotal;
                    cartTotal.quantity += amount;

                    return cartTotal;
                },
                { cost: 0, quantity: 0 }
            );

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = cost;
        },
    }
})

export const {
    addToCart,
    removeFromCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;