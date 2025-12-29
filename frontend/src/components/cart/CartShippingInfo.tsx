"use client"

import React, {useEffect, useRef} from 'react';
// import '@/styles/cart/cartshipping.css'
import DaumPost from "@/components/commons/DaumPost";
import Swal from "sweetalert2";
// import '@/styles/cart/cart.css';
import {useRouter} from 'next/navigation';
import useCartStore from "@/store/useCartStore";

export default function CartShippingInfo() {
    const router = useRouter();
    const isInitialized = useRef(false);
    const {cartList,totalPrice,orderInfo,receiverInfo,toggleSameOrderer,
        setOrderInfo, setReceiverInfo
        } = useCartStore();
    useEffect(() => {
        if (cartList && cartList.length > 0 && !isInitialized.current) {
            if (!receiverInfo.isSame) {
                toggleSameOrderer(true);
            }
            isInitialized.current = true;
        }
    }, [cartList, receiverInfo.isSame, toggleSameOrderer]);

    const handleOrderChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setOrderInfo(name as "name" | "mobile" | "email", value);
    };

    const handleReceiverChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setReceiverInfo(name as "name" | "mobile" | "postcode" | "address", value);
    }

    const handleSameCheck = (isSame) => {
        toggleSameOrderer(isSame);
    }
    const handleAddressComplete = (data:{postcode:string, address:string}) => {
        setReceiverInfo('postcode',data.postcode);
        setReceiverInfo('address', data.address);
    }
    const goToCheckout = () => {
        if(totalPrice <= 0){
            Swal.fire({
                icon: "warning",
                text: "주문 상품이 없습니다!",
            });
            return;
        }
        const validateForm = () => {
            if (!orderInfo.name || !orderInfo.mobile || !orderInfo.email) {
                return "주문자 정보를 모두 입력해주세요.";
            }
            if (!receiverInfo.name || !receiverInfo.mobile || !receiverInfo.postcode || !receiverInfo.address) {
                return "배송지(수령인) 정보를 모두 입력해주세요.";
            }

            return null;
        };

        const errorMessage = validateForm();

        if (errorMessage) {
            Swal.fire({
                icon: "warning",
                title: "필수정보누락",
                text: errorMessage,
            });
            return;
        }
        router.push("/checkout");
    }
    const labelStyle = 'w-[120px] text-[15px] font-bold shrink-0 pl-2.5';
    const inputWrapperStyle = "flex items-center grow border border-[#ccc] bg-white focus-within:border-[#333] transition-colors";
    const inputStyle = "grow border-none py-3 px-2.5 text-[15px] outline-none bg-transparent placeholder:text-[#aaa] min-h-[30px] !pl-[10px]";
    const requiredStyle = "text-[#d00] ml-1";
    const rowContainerStyle = 'flex items-center border-b border-[#eee] py-[10px] min-h-[80px]';

        return (
            <div className="w-full font-sans my-[40px] text-[#333]">
                <div className="mb-[30px]">
                    <h2 className="text-[20px] font-bold pb-[10px] mb-[0] border-b-2 border-[#333]">주문자 정보</h2>
                    <div className="grid grid-cols-2 gap-x-[25px] border-t border-[#eee]">
                        <div className={rowContainerStyle}>
                            <label htmlFor="orderer-name" className={labelStyle}>주문자명 <span className={requiredStyle}>*</span></label>
                            <div className={inputWrapperStyle}>
                                <input
                                    type="text"
                                    id="orderer-name"
                                    name="name"
                                    value={orderInfo.name}
                                    onChange={handleOrderChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="orderer-mobile" className={labelStyle}>휴대폰번호 <span
                                className={requiredStyle}>*</span></label>
                            <div className={inputWrapperStyle}>
                                <input
                                    type="text"
                                    id="orderer-mobile"
                                    name="mobile"
                                    value={orderInfo.mobile}
                                    onChange={handleOrderChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="orderer-email" className={labelStyle}>이메일 <span className={requiredStyle}>*</span></label>
                            <div className={inputWrapperStyle}>
                                <input
                                    type="email"
                                    id="orderer-email"
                                    name="email"
                                    value={orderInfo.email}
                                    onChange={handleOrderChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. 수령인 정보 섹션 */}
                <div className="!pt-[30px] w-full">
                    <div className="flex justify-between items-center border-b border-b-[#333] pb-[10px]">
                        <h2 className="font-bold text-[20px]">수령인 정보</h2>
                        <div className="flex items-center gap-[15px]">
                            <div className="flex items-center gap-[5px]">
                                <input
                                    type="radio"
                                    id="same-as-orderer"
                                    name="recipient-type"
                                    checked={receiverInfo.isSame}
                                    onChange={() => handleSameCheck(true)}
                                    className="w-4 h-4 accent-[#d00]"
                                />
                                <label htmlFor="same-as-orderer" className='text-[14px]'>주문자와 동일</label>
                                <input
                                    type="radio"
                                    id="new-address"
                                    name="recipient-type"
                                    checked={!receiverInfo.isSame}
                                    onChange={() => handleSameCheck(false)}
                                    className="w-4 h-4 accent-[#d00]"
                                />
                                <label htmlFor="new-address" className='text-[14px]'>새로운주소</label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-[25px] border-t border-t-[#eee]">
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="recipient-name" className={labelStyle}>수령자명 <span className={requiredStyle}>*</span></label>
                            <div className={inputWrapperStyle}>
                                <input
                                    type="text"
                                    id="recipient-name"
                                    name="name"
                                    value={receiverInfo.name}
                                    onChange={handleReceiverChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                        </div>
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="recipient-contact" className={labelStyle}>연락처</label>
                            <div className={inputWrapperStyle}>
                                <input type="text" id="recipient-contact" placeholder="-없이 숫자만 입력" className={inputStyle}/>
                            </div>
                        </div>
                        <div className="flex items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="recipient-mobile" className={labelStyle}>휴대폰번호 <span
                                className={requiredStyle}>*</span></label>
                            <div className={inputWrapperStyle}>
                                <input
                                    type="text"
                                    id="recipient-mobile"
                                    name="mobile"
                                    value={receiverInfo.mobile}
                                    onChange={handleReceiverChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                        <div className="flex col-span-2 items-center border-b border-b-[#eee] py-[10px] min-h-[80px]">
                            <label htmlFor="recipient-zipcode" className={`${labelStyle} pt-2`}>주소 <span className={requiredStyle}>*</span></label>
                            <div className="flex flex-col gap-[8px] grow">
                                <div className='flex gap-2'>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={receiverInfo.postcode}
                                        placeholder="우편번호"
                                        readOnly
                                        className='w-[100px] mr-[10px]'
                                    />
                                    <DaumPost onComplete={handleAddressComplete}/>
                                </div>
                                <input
                                    type="text"
                                    id="recipient-address1"
                                    name="address"
                                    value={receiverInfo.address}
                                    onChange={handleReceiverChange}
                                    className="w-full border border-[#ccc] p-3 text-[14px]"
                                    placeholder="기본 주소 검색 후 상세 주소를 입력해주세요"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-[1rem] !mt-[3rem] pt-[1rem] ">
                        <button className="font-semibold text-[1.1rem] text-[white] !py-[1rem] !px-[2.5rem] rounded-md  bg-[#d9534f] cursor-pointer hover:bg-[#c9302c]"
                                onClick={goToCheckout}>제품 주문하기</button>
                    </div>
                </div>
            </div>
        );
    }
