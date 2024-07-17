import ProductColorCreateForm from "@/(FSD)/features/product/ui/ProductColorCreateForm";
import ProductCreateForm from "@/(FSD)/features/product/ui/ProductCreateForm";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import { useParams } from "next/navigation"
import React from "react"

const Page = () => {
 


    return (
        <AppSection>
            <AppInner>
                <ProductColorCreateForm/>
            </AppInner>
        </AppSection>
    )
}

export default Page
