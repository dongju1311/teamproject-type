import {ProductDetail} from "@/components/product/ProductDetail";
import {axiosGet} from "@/utils/dataFetch";
import {Product} from "@/types/Product";



const getProductDetail = async(category:string,pid:string) => {
    const url = `/products/${category}/${pid}`;
    const data = await axiosGet<Product>(url);
    return data;
}

interface PageProps {
    params: Promise<{category:string, pid:string}>
}

export default async function ProductDetailPage({ params } : PageProps) {
    const { category, pid } = await params;

    const productData = await getProductDetail(category,pid);

    return (
        <div className='w-full flex flex-col items-center !pt-[64px] gap-[35px]'>
            <ProductDetail product={productData}/>
        </div>
    );
}