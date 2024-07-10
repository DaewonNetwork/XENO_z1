import React from 'react';
import { useRecoilState } from 'recoil';

import { orderInfoState } from '@/(FSD)/shareds/stores/ProductAtom';

const ProductOrderUserInfo = () => {
  const [orderInfo, setOrderInfo] = useRecoilState(orderInfoState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <input
        name="address"
        placeholder="배송지"
        value={orderInfo.address}
        onChange={handleChange}
      />
      <input
        name="phoneNumber"
        placeholder="전화번호"
        value={orderInfo.phoneNumber}
        onChange={handleChange}
      />
      <input
        name="req"
        placeholder="배송 요청사항"
        value={orderInfo.req}
        onChange={handleChange}
      />
    </>
  );
};

export default ProductOrderUserInfo;
