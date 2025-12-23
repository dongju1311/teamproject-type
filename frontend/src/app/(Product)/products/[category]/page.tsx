import React from 'react';
import { ProductList } from '@/components/product/ProductList';
import {axiosGet} from "@/utils/dataFetch";
import {Product} from "@/types/Product";

const getProductList = async(category:string) => {
    const url = `/products/${category}`;
    const data = await axiosGet<Product[]>(url);
    return data;
}

interface PageProps {
    params: Promise<{category:string}>
}

export default async function ProductsPage({params}:PageProps) {
    const { category } = await params;

    const product = await getProductList(category);

    return (
        <div className='content' style={{paddingTop:'35px'}}>
            <div style={{marginTop:'20px'}}>
                <h2 className='all-products-title' style={{textAlign:'center', textTransform: 'uppercase'}}>{category || 'All Products'}</h2>
            </div>
            <ProductList products={product}/>
        </div>
    );
}
