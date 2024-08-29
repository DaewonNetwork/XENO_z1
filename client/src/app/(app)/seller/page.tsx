
import AppInner from '@/(FSD)/widgets/app/ui/AppInner'
import AppSection from '@/(FSD)/widgets/app/ui/AppSection'
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
