package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.domain.ProductsStar;
import com.daewon.xeno_z1.domain.ProductsStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductsStockRepository extends JpaRepository<ProductsStock, Long> {

    @Query("select p from ProductsStock p where p.productsColorSize.productColorSizeId = :productColorSizeId")
    ProductsStock findByProductColorSizeId(@Param("productColorSizeId") Long productColorSizeId);

    Optional<ProductsStock> findByProductsColorSize(ProductsColorSize productsColorSize);
}