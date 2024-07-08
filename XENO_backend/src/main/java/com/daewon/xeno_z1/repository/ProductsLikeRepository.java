package com.daewon.xeno_z1.repository;



import com.daewon.xeno_z1.domain.ProductsLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface ProductsLikeRepository extends JpaRepository<ProductsLike, Long> {

    @Query("select p from ProductsLike p where p.productsColor.productColorId=:productColorId")
    Optional<ProductsLike> findByProductColorId(Long productColorId);
}