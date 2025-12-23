import React from "react";
import { axiosGet} from "@/utils/dataFetch.ts";

export const getMarkerList = async (number) => {
    const url = "/map/all";
    const jsonData = await axiosGet(url);

    return jsonData;
}

