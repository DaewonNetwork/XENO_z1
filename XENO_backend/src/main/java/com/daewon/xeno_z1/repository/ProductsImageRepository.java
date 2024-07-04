package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ProductsImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductsImageRepository extends JpaRepository<ProductsImage, Long> {

    @Query("SELECT p FROM ProductsImage p WHERE p.productsColor.productColorId = :productId")
    List<ProductsImage> findByProductId(@Param("productId") Long productId);

    @Query("SELECT p FROM ProductsImage p " +
            "WHERE p.productsColor.productColorId = :productId " +
            "ORDER BY p.productImageId ASC") // ProductsImage의 id를 오름차순으로 정렬
    Optional<ProductsImage> findFirstByProductColorId(@Param("productId") Long productId);

}
