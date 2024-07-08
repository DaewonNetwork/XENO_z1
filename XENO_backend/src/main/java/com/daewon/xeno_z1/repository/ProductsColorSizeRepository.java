package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.domain.ProductsDetailImage;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsColorSizeRepository extends JpaRepository<ProductsColorSize, Long> {

    Optional<ProductsColorSize> findByProductsColor(ProductsColor productsColor);
}
