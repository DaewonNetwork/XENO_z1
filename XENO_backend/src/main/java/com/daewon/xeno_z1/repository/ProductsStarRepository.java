package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ProductsStar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface ProductsStarRepository extends JpaRepository<ProductsStar, Long>{

    @Query("select p from ProductsStar p where p.products.productId=:productId")
    Optional<ProductsStar> findByProductId(Long productId);
}