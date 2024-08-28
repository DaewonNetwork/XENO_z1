"use client"

import { useProductBySellerRead } from "@/(FSD)/entities/product/api/useProductBySellerRead";
import { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface UploadImageReadDTO {
    productNumber: string;
    url_1: string;
    url_2?: string;
    url_3?: string;
    url_4?: string;
    url_5?: string;
    url_6?: string;
    detail_url_1?: string;
    createdAt: string;
}

const OrderInfoListBtn = () => {

    const [images, setImages] = useState<UploadImageReadDTO[]>([]);

    const accessToken = localStorage.getItem("access_token");
    
    const router = useRouter();

    const get = async () => {
     
        try {
            const response = await fetch('http://localhost:8090/api/product/read/all-upload-images', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data: UploadImageReadDTO[] = await response.json();
            console.log(data)
            setImages(data);
        } catch (error) {
            console.error('Error fetching upload images:', error);
            throw error; // 필요에 따라 에러를 처리합니다.
        }
    };

    const download = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/product/download/excel', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Blob 객체로 응답을 처리
            const blob = await response.blob();
            
            // Blob을 URL로 변환
            const url = window.URL.createObjectURL(blob);
            
            // 다운로드 링크를 생성
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'products.xlsx'); // 파일 이름 설정
            
            // 링크를 클릭하여 다운로드 시작
            document.body.appendChild(link);
            link.click();
            
            // 링크를 DOM에서 제거
            document.body.removeChild(link);
    
        } catch (error) {
            console.error('Error fetching and downloading the Excel file:', error);
            throw error; // 필요에 따라 에러를 처리합니다.
        }
    };




    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={() =>   router.push(`/mypage/orders`)} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" >주문 내역 확인하기</Button>
            <Button onClick={() =>   get()} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" >가져오기</Button>
            <div style={{ marginTop: "10px" }}>
                {images.map((image, index) => (
                    <div key={index}>
                        {image.url_1 && <img src={image.url_1} alt={`Image ${index}_url_1`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.url_2 && <img src={image.url_2} alt={`Image ${index}_url_2`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.url_3 && <img src={image.url_3} alt={`Image ${index}_url_3`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.url_4 && <img src={image.url_4} alt={`Image ${index}_url_4`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.url_5 && <img src={image.url_5} alt={`Image ${index}_url_5`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.url_6 && <img src={image.url_6} alt={`Image ${index}_url_6`} style={{ maxWidth: '100px', margin: '5px' }} />}
                        {image.detail_url_1 && <img src={image.detail_url_1} alt={`Image ${index}_detail_url_1`} style={{ maxWidth: '100px', margin: '5px' }} />}
                    </div>
                ))}
            </div>
            <Button onClick={() =>   download()} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" >엑셀 다운로드</Button>
        
        </div>
    );
};

export default OrderInfoListBtn;
