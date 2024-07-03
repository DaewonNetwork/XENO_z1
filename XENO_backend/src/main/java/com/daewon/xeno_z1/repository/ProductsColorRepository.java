package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsColor;
import com.daewon.xeno_z1.domain.ProductsDetailImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsColorRepository extends JpaRepository<ProductsColor, Long> {
}
