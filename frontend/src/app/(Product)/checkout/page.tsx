import {CheckoutHeader} from "@/components/checkout/CheckoutHeader";
import {CheckoutForm} from "@/components/checkout/CheckoutForm";
import {CheckoutOrder} from "@/components/checkout/CheckoutOrder";
import {CheckoutPayment} from "@/components/checkout/CheckoutPayment";
import '@/styles/product/checkout.css';
import {axiosDataPost} from "@/utils/dataFetch";
import {cookies} from "next/headers";
import {CartItem} from "@/types/Cart";

const getCheckoutList = async () => {
    const url = '/cart/list';

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const data = await axiosDataPost<CartItem[]>(url, {}, { "Cookie": allCookies });
    return data;
}

export default async function CheckoutPage(){

    const checkoutData = await getCheckoutList();

    const cartList = Array.isArray(checkoutData) ? checkoutData : [];

    const totalPrice = cartList.length > 0 ? cartList[0].totalPrice : 0;

    return(
        <div className="checkout-page-container">
            <CheckoutHeader/>
            <CheckoutForm cartList={cartList}/>
            <CheckoutOrder cartList={cartList}
                           totalPrice={totalPrice}/>
            <CheckoutPayment totalPrice={totalPrice}
                             cartList={cartList}/>
        </div>
    );
}