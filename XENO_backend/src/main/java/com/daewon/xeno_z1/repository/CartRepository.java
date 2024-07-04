package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

//    Optional<Cart> findByProductsColorSize_ProductsAndUser(Products product, Users user);

    List<Cart> findByUserAndProductsColorSize_ProductColorId(Users user, Long productColorId);

//    Optional<Cart> findByProductsAndProductsImage(Products product, ProductsImage productsImage);

}
