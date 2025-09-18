import {  useReducer } from "react";
import { CartContext } from "./CartContext";

import PRODUCTS from '../data/products.json';

const intialState = {
    menu: false,
    setOverlay: false,
    cart: false,
    items: [],
    currentIndex: 0,
    products: PRODUCTS,
    quantity: 0
}

function cartReducer(state, action) {
    switch(action.type) {
        case 'SET_MENU_TOGGLER': {
            return{...state, menu: !state.menu}
        }

        case 'SET_CART_TOGGLER': {
            return{...state, cart: !state.cart}
        }

        case 'SET_OVERLAY_TOGGLER' : {
            return{...state, setOverlay: !state.setOverlay}
        }

        case 'ADD_TO_CART': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
            } else {
            updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case 'INCREASE_QUANTITY': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
            } else {
            updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case 'REMOVE_FROM_CART': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );

            if (existingCartItemIndex === -1) {
                return state;
            }
            
            const existingCartItem = state.items[existingCartItemIndex];

            const updatedItems = [...state.items];
            
            if (existingCartItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
        }

        case 'REMOVE_ITEM': {
            return { ...state,  items: state.items.filter((item) => item.id !== action.id)};
        }

        case 'NEXT_PROUDCT': {
            return{...state, currentIndex: (state.currentIndex + 1) % action.total};
        }

        case 'PREV_PRODUCT': {
            return{...state, currentIndex: (state.currentIndex - 1) % action.total};
        }

        case 'CURENT_PROD': {
            return{...state, currentIndex: action.id - 1}
        }
        
        default: {
            return state;
        }
    }
}

export const CartProvider = ({children}) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, intialState);

    function menuToggle() {
        dispatchCartAction({type:'SET_MENU_TOGGLER'});
    }

    function overlayToggler() {
        dispatchCartAction({type: 'SET_OVERLAY_TOGGLER'});
    }

    function cartToggler() {
        dispatchCartAction({type: 'SET_CART_TOGGLER'});
    }

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_TO_CART', item });
    }

    function increaseItem(item) {
        dispatchCartAction({type: 'INCREASE_QUANTITY', item });
    }

    function removeCartItem(id) {
        dispatchCartAction({ type: 'REMOVE_FROM_CART', id });
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id});
    }

    function nextProduct(total) {
        dispatchCartAction({ type: "NEXT_PROUDCT", total });
    }

    function prevProduct(total) {
        dispatchCartAction({ type: "PREV_PROUDCT", total });
    }

    function curentProduct(id) {
        dispatchCartAction({type: 'CURENT_PROD', id})
    }

    const cartCxt = {
        items: cart.items,
        products: cart.products,
        menuToggle,
        overlayToggler,
        cartToggler,
        addItem,
        increaseItem,
        removeItem,
        nextProduct,
        prevProduct,
        curentProduct,
        removeCartItem,
        currentIndex: cart.currentIndex,
        menu: cart.menu,
        setOverlay: cart.setOverlay,
        cart: cart.cart,
        quantity: cart.quantity
    }

    return <CartContext.Provider value={cartCxt}>
        {children}
    </CartContext.Provider>
}