import React from 'react';
import Image from "next/image";

/**
 * ImageList 컴포넌트
 *
 * 역할:
 * - 전달받은 이미지 파일 이름 배열(imgList)을 기반으로
 *   <ul> 리스트 형태로 이미지를 렌더링한다.
 *
 * 특징:
 * - 이미지 경로는 /public/images/ 기준으로 접근함
 *   예: imgList = ["a.jpg"] → /images/a.jpg
 *
 * props:
 * - imgList: 이미지 파일명 배열 (예: ["img1.jpg", "img2.png"])
 * - className: <ul>에 적용할 CSS 클래스명
 */
interface ImageListProps {
    imgList: string | string[];
    className?: string;
}

export function ImageList({ imgList, className } : ImageListProps) {
    const images = Array.isArray(imgList) ? imgList : [imgList];

    return (
        <div className={className}>
            {images.map((imgSrc, index) => (
                <div key={index} className="thumbnails-item">
                    <Image
                        src={imgSrc}
                        alt={`thumbnail-${index}`}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            ))}
        </div>
    );
}
