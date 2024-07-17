
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
import ProductColorListBtn from '@/(FSD)/widgets/product/ui/ProductColorListBtn'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import SellerProFileContainer from '@/(FSD)/widgets/seller/ui/SellerProFileContainer'
import React from 'react'

const Page = () => {

    return (
        <AppSection>
            <AppInner>
                <SellerProFileContainer/>
            </AppInner>
        </AppSection>
    )
}

export default Page
