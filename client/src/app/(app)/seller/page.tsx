
import ProductColorListBtn from '@/(FSD)/widgets/product/ui/ProductColorListBtn'
import ProductListBtn from '@/(FSD)/widgets/product/ui/ProductListBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import React from 'react'

const Page = () => {

  return (
    <div>
      상품 등록하기
      <ProductListBtn/>
      <ProductColorListBtn/>
      
      <ProductOrdersStatusListBtn/>
    </div>
  )
}

export default Page
