"use client"

// import '@/styles/product/productdetail.css';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useCompareStore from "@/store/useCompareStore";
import Image from "next/image";
import {Product} from "@/types/Product";

interface ProductDetailProps {
    product?: Product;
}

export function ProductDetail({product} :ProductDetailProps) {
    const router= useRouter();
    const {addCart} = useCartStore();
    const {addCompareItem} = useCompareStore();
    const imgList = product.image;

    if (!product) {
        return <div className="text-center py-20">상품 정보를 불러오는 중입니다...</div>;
    }

    const handleFindStore = () => {
        router.push("/location");
    }
    const goToCart = async () => {
        const userInfo = localStorage.getItem('loginInfo');
        if (!userInfo) {
            await Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            router.push("/login");
            return;
        }
        await addCart(product.product_id);
    }

    const goToPurchase = () => {
        const userInfo = localStorage.getItem('loginInfo');
        if (!userInfo) {
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            router.push("/login");
            return;
        }
            router.push("/cart");
    }

    const goToCompare =() => {
        addCompareItem(product);
        Swal.fire({
            icon: "success",
            title: "",
            text: "비교함에 상품이 담겼습니다.",
        });
    }

    return (
        <div className="w-full max-w-[1440px] mx-auto p-[2rem] pt-[65px]">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[40px]'>
                <div className='flex flex-col gap-[10px]'>
                    <div className='relative w-full aspect-[16/9] md:aspect-auto md:min-h-[600px] rounded-[8px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                </div>

                {/* 1-2. 오른쪽 정보 패널 */}
                <ul className='list-none p-0 m-0 flex flex-col gap-[1rem]'>
                    <li className='text-[1.8rem] font-bold text-[#555]'>{product.name}</li>
                    <li className='pb-[1rem] text-[1.5rem] font-medium'>
                        {product.price && `KRW ${product.price.toLocaleString()}`}
                    </li>
                    <li className='text-[1rem] text-[#555] border-b border-[#eee]'>
                        {product.subinfo}
                    </li>

                    {/* 컬러 선택기 */}
                    <li className='flex items-center gap-[10px] border border-[#e0e0e0] rounded-[4px]'>
                            <span className='text-[18px] !ml-4'>{product.color}</span>
                    </li>

                    {/* 비교하기 버튼 */}
                    <li className='flex gap-[20px] mt-[20px] h-[40px]'>
                        <button type="button"
                                className="flex-1 p-[20px_20px] text-[16px] font-bold bg-[#f0f0f0] text-[#333] border border-[#ccc] rounded-[5px] hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                                onClick={goToCompare}>
                            + 비교하기
                        </button>
                        <button type="button"
                                className="flex-1 p-[20px_20px] text-[16px] font-bold bg-[#f0f0f0] text-[#333] border border-[#ccc] rounded-[5px] hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 cursor-pointer"
                                onClick={goToCart}
                                disabled={!product.product_id}>
                            장바구니
                        </button>
                        <button type="button"
                                className="flex-1 p-[20px_20px] text-[16px] font-bold bg-[#007bff] text-white rounded-[5px] hover:bg-[#0056b3] transition-colors cursor-pointer"
                                onClick={goToPurchase}>
                            구매
                        </button>
                    </li>

                    {/* 메인스펙 (dropdown) */}
                    <li className='border-b border-t border-[#eee] !pt-[30px]'>
                        <details className='group' open>
                            <summary className='p-[1rem_0] text-[1rem] font-semibold cursor-pointer list-none flex justify-between after:content-["v"] after:font-light transition-transform group-open:after:rotate-180' >
                                메인스펙
                            </summary>
                            <div className='p-[1rem] bg-[#f9f9f9] text-[0.9rem] leading-[1.6] !ml-4'>
                                {
                                    product.description && product.description.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))
                                }
                            </div>
                        </details>
                    </li>
                        <button type="button" className="w-full p-[1rem] text-[16px] h-[40px] bg-[#f5f5f5] border border-[#e0e0e0] rounded-[4px] text-[1rem] font-semibold text-[#333] hover:bg-[#0056b3] transition-colors cursor-pointer"
                                onClick={handleFindStore}>대리점 찾기
                        </button>
                </ul>
            </div>

            <div className="py-[4rem] bg-white flex justify-center !pt-[30px]">
                <div className="w-full max-w-[1000px] text-center">
                    <h3 className='text-[1.5rem] font-extrabold text-[#222] tracking-[0.2rem] uppercase relative mb-[3rem] after:content[""] after:block after:w-[40px] after:h-[3px] after:bg-[#007bff] after:mx-auto after:mt-[15px] after:rounded-[2px]'>DETAIL</h3>
                    <div className='relative w-full min-h-[600px] rounded-[8px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}