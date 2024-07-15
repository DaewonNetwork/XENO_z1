import ProductColorCreateBtn from '@/(FSD)/widgets/product/ui/ProductColorCreateBtn'
import ProductOrdersStatusListBtn from '@/(FSD)/widgets/product/ui/ProductOrdersStatusListBtn'
import React from 'react'

const Page = () => {

  return (
    <div>
      상품 등록하기
      <ProductColorCreateBtn/>
      
      <ProductOrdersStatusListBtn/>
    </div>
  )
}

export default Page
