package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsDetailImage;
import com.daewon.xeno_z1.domain.ProductsImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsColorRepository extends JpaRepository<ProductsColor, Long> {
    @Query("SELECT p FROM ProductsColor p WHERE p.products.productId = :productId")
    List<ProductsColor> findByProductId(@Param("productId") Long productId);




}
