package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

//    Optional<Cart> findByProductAndUser(Products product, Users user);

    @Query("SELECT c FROM Cart c WHERE c.productsColorSize.productColorSizeId= :productColorSizeId and c.users.userId = :userId")
    Optional<Cart> findByProductColorSizeIdAndUser(Long productColorSizeId, Long userId);


}