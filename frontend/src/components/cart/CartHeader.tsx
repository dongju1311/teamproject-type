export function CartHeader(){
    return(
        <div className="flex justify-between items-center pb-[1rem] mt-[50px] border-b[2px]">
            <h1 className='text-[2.5rem] font-bold m-[0]'>장바구니</h1>
            <ul className="flex list-none p-[0] m-[0] gap-[15px]">
                <li className='text-[0.9rem] after:content-[">"]'><span>Step 01 장바구니</span></li>
                <li className='text-[0.9rem] after:content-[">"] text-[#999] '><span>Step 02 주문결제</span></li>
                <li className="text-[0.9rem] text-[#999]"><span>Step 03 주문완료</span></li>
            </ul>
        </div>
    )
}