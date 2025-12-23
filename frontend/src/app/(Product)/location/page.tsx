
import {axiosGet} from "@/utils/dataFetch";
import {StoreLocation} from "@/components/location/StoreLocation";
import {Store} from "@/types/Store";

const getStore = async () => {
    const url = '/location';
    const data = await axiosGet<Store[]>(url);
    return data
}

export default async function LocationPage(){
    const storeData = await getStore();
    return(
        <StoreLocation data={storeData}/>
    )
}