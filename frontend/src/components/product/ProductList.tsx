import React from 'react';
// import '@/styles/product/productList.css';
import Link from 'next/link';
import {Product} from "@/types/Product";
import Image from "next/image";

interface ProductListProps {
    products?: Product[];
}

export function ProductList({products =[]}:ProductListProps) {

    const sortedProducts = products
        .slice()
        .sort((a, b) => parseInt(a.pid) - parseInt(b.pid));

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] p-5 mb-[150] w-full max-w-[1200px] mx-auto">
            {sortedProducts && sortedProducts.map((product) => (
                    <Link href={`/products/${product.category}/${product.pid}`} key={product.pid} className="block no-underline text-inherit h-full">
                        <div className="border border-[#eee] rounded-[8px] overflow-hidden bg-white h-full flex flex-col">
                            <div className="w-full h-[200px] flex items-center justify-center bg-[#f8f8f8] relative flex-shrink-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'contain', padding: '10px' }}
                                    priority
                                />
                            </div>
                            <div className="p-[15px] text-center flex-grow flex flex-col justify-center">
                                <h4 className="text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis" >{product.name}</h4>
                                <p className="font-bold text-[#E40046]">{product.price.toLocaleString()}원</p>
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    );
}