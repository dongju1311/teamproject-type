export interface CartItem {
    //CartListResponseDto
    cid: number;
    image: string;
    price: number;
    color: string;
    qty: number;
    checked: boolean;
    totalPrice: number;
    description: [];
    product_id: number;
    category: string;
    name: string;
    subinfo: string;
    uid: string;
    uname: string;
    uphone: string;
    uemail: string;
    uaddress: string;
    postcode: string;
}

export interface CartRequest {
    //CartResquestDto
    cid?: number;
    product_id:number;
    qty: number;
    type?: string;
    checked?: boolean;
    uid: string;
    cdate?: string;
}