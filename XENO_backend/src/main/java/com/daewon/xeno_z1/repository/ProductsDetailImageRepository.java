package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ProductsDetailImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductsDetailImageRepository extends JpaRepository<ProductsDetailImage, Long> {
    @Query("SELECT p FROM ProductsDetailImage p WHERE p.productsColor.productColorId = :productId")
    Page<ProductsDetailImage> findByProductId(Long productId, Pageable pageable);
}
