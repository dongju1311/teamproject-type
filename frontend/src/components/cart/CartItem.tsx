"use client"

import {RiDeleteBin6Line} from "react-icons/ri";
import {useRouter} from "next/navigation";
import useCartStore from "@/store/useCartStore";

export function CartItem(){
    const { cartList, totalPrice , removeCart, updateCart, checkItem} = useCartStore();
    const router = useRouter();

    const goToProduct = () => {
        router.push("/products/mountain");
    }

    return(
        <div className="w-full border-t-2 border-t-[#333] border-b border-b-[#ccc]">

            {cartList && cartList.length > 0 ? (
                <>
                    {cartList
                        .filter(item => item.price !== undefined)
                        .map((item)=> (
                            <div key={item.cid} className="flex items-center py-6 px-2 border-b border-[#f0f0f0] last:border-b-0">
                                <input
                                    type="checkbox"
                                    className="w-[20px] h-[20px] !mr-[20px] cursor-pointer accent-[#d9534f]"
                                    checked={item.checked || false}
                                    onChange={() => checkItem(item.cid)}
                                />
                                {item.image && (
                                    <img src={`${item.image}`} alt={item.name}
                                    className='w-[130px] h-[130px] !mr-[20px] object-contain '/>
                                )}

                                <span className="flex-1 text-[1.1rem] font-semibold pr-[1rem]">{item.name && item.name}</span>
                                <span className="w-[150px] font-semibold text-center !mr-[1.5rem]">
                                {item.price && item.price.toLocaleString() + '원'}
                                </span>
                                <div className='flex items-center'>
                                    <button type='button'
                                            onClick={()=>{item.qty > 1 && updateCart(item.cid, "-")}}
                                            className='w-[30px] h-[30px] border border[#ccc] bg-[#fff] cursor-pointer text-[1.2rem] justify-center flex hover:bg-gray-50 transition-colors'>-</button>
                                    <input type='text'
                                           value={item.qty} readOnly
                                            className='w-[40px] h-[30px] text-center border-t border-b border-[#ccc] outline-none'/>
                                    <button type='button'
                                            onClick={()=> updateCart(item.cid, "+")}
                                            className='w-[30px] h-[30px] border border[#ccc] bg-[#fff] cursor-pointer text-[1.2rem] justify-center flex hover:bg-gray-50 transition-colors'>+</button>
                                    <button className='w-[30px] h-[30px] ml-4 text-center text-xl text-gray-400 hover:text-red-500 transition-colors'
                                            onClick={()=>removeCart(item.cid)}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        ))}

                    <div className="flex justify-start items-baseline border-t border-[#ccc] -mt-[1px] py-[2.5rem] px-[0.5rem]">
                        <span className="text-[1.5rem] font-semibold font-[#333] !mr-[20px]">총 금액 :</span>
                        <span className="text-[1.5rem] font-semibold font-[#333]">{totalPrice.toLocaleString()}원</span>
                    </div>
                </>
            ) : (
                <div className="text-center !py-[4rem] !px-[1rem] !-mt-[-1px] border-t-[#ccc]">
                    <p className='text-[1.2rem] font-extrabold text-[#888] !mb-6'
                    >장바구니에 상품이 없습니다.</p>
                    <button className='font-semibold text-[1.1rem] text-[white] !py-[1rem] !px-[2.5rem] rounded-md  bg-[#d9534f] cursor-pointer hover:bg-[#c9302c]'
                        onClick={goToProduct}>자전거 구매</button>
                </div>
            )}
        </div>
    );
}