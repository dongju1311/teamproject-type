import React from 'react';
import '../../styles/daumPost.css';
import {useDaumPostcodePopup} from "react-daum-postcode";

interface AddressData {
    postcode:string;
    address:string;
}

interface DaumPostProps {
    onComplete:(data:AddressData)=>void;
}

export default function DaumPost({onComplete}:DaumPostProps){
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        onComplete({
            postcode: data.zonecode,
            address: fullAddress
        });
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return <button
        className="find_address_button"
        type="button"
        onClick={handleClick}
    >
        주소검색
    </button>;
};
