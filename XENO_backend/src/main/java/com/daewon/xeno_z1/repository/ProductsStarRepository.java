package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.ProductsStar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ProductsStarRepository extends JpaRepository<ProductsStar, Long> {

    @Query("select p from ProductsStar p where p.productsColor.productColorId=:productId")
    Optional<ProductsStar> findByProductId(Long productId);

    List<ProductsStar> findTop10ByOrderByStarAvgDesc();
}