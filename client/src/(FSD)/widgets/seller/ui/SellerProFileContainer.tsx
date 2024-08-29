"use client"

import UserInfoCard from '@/(FSD)/entities/seller/ui/UserInfoCard'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import React, { useState } from 'react'
import QuestionBtn from './QuestionBtn'
import ProductCreateBtn from '../../product/ui/ProductCreateBtn'
import DarkModeSelectBtn from './DarkModeSelectBtn'
import { Button } from '@nextui-org/button'
import ProductImageCheckModal from '@/(FSD)/entities/product/ui/ProductImageCheckModal'

const SellerProFileContainer = () => {

    const [checkOpen, setCheckOpen] = useState<boolean>(false);
    return (
        <>

            {checkOpen && (
                <ProductImageCheckModal
                    setCheckOpen={setCheckOpen}
        
                />
            )}


            <UserInfoCard />
            <ProductCreateBtn />
            <ProductListBtn />
            <ProductOrdersStatusListBtn />
            <QuestionBtn />
            <Button
                // isDisabled={(!isValid)}
                fullWidth size={"lg"}
                type={"button"} color={"primary"}
                onClick={() => setCheckOpen(true)} // 모든 폼 블록을 한 번에 제출
            >
                이미지 조회하기
            </Button>
            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default SellerProFileContainer
