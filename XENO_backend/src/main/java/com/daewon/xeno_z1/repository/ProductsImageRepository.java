package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ProductsImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductsImageRepository extends JpaRepository<ProductsImage, Long> {

    @Query("SELECT p FROM ProductsImage p WHERE p.products.productId = :productId")
    List<ProductsImage> findByProductId(@Param("productId") Long productId);
}