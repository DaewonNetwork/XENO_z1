
import UserInfoCard from '@/(FSD)/entities/seller/ui/UserInfoCard'

import ProductColorListBtn from '@/(FSD)/widgets/product/ui/ProductColorListBtn'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import React from 'react'
import QuestionBtn from './QuestionBtn'
import ProductCreateBtn from '../../product/ui/ProductCreateBtn'
import DarkModeSelectBtn from './DarkModeSelectBtn'

const SellerProFileContainer = () => {

    return (
        <>
            <UserInfoCard/>
            <ProductCreateBtn/>
            <ProductListBtn />
            <ProductColorListBtn />
            <ProductOrdersStatusListBtn />
            <QuestionBtn/>
            {/* <DarkModeSelectBtn/> */}
        </>
    )
}

export default SellerProFileContainer
