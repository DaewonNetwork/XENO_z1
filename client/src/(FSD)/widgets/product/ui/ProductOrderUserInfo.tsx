"use client";

import React from "react";
import { useRecoilState } from "recoil";

import {reqState } from "@/(FSD)/shareds/stores/ProductAtom";

const ProductOrderUserInfo = () => {
  const [req, setReq] = useRecoilState(reqState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReq(value);
  };

  return (
    <>
      <input
        name="address"
        placeholder="배송지"
        onChange={handleChange}
      />
      <input
        name="phoneNumber"
        placeholder="전화번호"
        onChange={handleChange}
      />
      <input
        name="req"
        placeholder="배송 요청사항"
        value={req}
        onChange={handleChange}
      />
    </>
  );
};

export default ProductOrderUserInfo;
