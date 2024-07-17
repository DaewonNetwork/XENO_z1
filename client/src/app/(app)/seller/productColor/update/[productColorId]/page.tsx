import ProductColorCreateForm from '@/(FSD)/features/product/ui/ProductColorCreateForm';
import ProductColorUpdateForm from '@/(FSD)/features/product/ui/ProductColorUpdateForm';
import ProductUpdateForm from '@/(FSD)/features/product/ui/ProductUpdateForm';
import AppInner from '@/(FSD)/widgets/app/ui/AppInner';
import AppSection from '@/(FSD)/widgets/app/ui/AppSection';
import React from 'react'

const Page = () => {
 


    return (
        <AppSection>
            <AppInner>
                <ProductColorUpdateForm/>
            </AppInner>
        </AppSection>
    )
}

export default Page
