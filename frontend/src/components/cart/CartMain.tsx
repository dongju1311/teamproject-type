"use client"

import CartShippingInfo from "@/components/cart/CartShippingInfo";
import {CartHeader} from "@/components/cart/CartHeader";
import {CartItem as CartItemComponent} from "@/components/cart/CartItem";
import {useEffect, useRef} from "react";
import useCartStore from "@/store/useCartStore";
import {CartItem} from "@/types/Cart";

interface CartMainProps {
    initialCartList: CartItem[];
}

export default function CartMain({initialCartList}:CartMainProps) {
    const {showCartItem, updateTotalPrice} = useCartStore();
    const isInitialized = useRef(false);

    //
    useEffect(() => {
        if (!isInitialized.current) {
            showCartItem(initialCartList);
            updateTotalPrice();
            isInitialized.current = true;
        }
    }, [initialCartList, showCartItem, updateTotalPrice]);

    return(
        <>
            <CartHeader />
            <CartItemComponent />
            <CartShippingInfo />
        </>
    );
}