package com.daewon.xeno_z1.repository;




import com.daewon.xeno_z1.domain.LikeProducts;
import com.daewon.xeno_z1.domain.ProductsColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface LikeRepository extends JpaRepository<LikeProducts, Long> {

    @Query("SELECT l FROM LikeProducts l WHERE l.productsLike.productsColor.productColorId = :productColorId and l.users.userId = :userId")
    LikeProducts findByProductColorIdAndUserId(@Param("productColorId") Long productColorId, Long userId);

    @Query("SELECT l FROM LikeProducts l WHERE l.users.userId = :userId")
    List<LikeProducts> findByUserId(Long userId);
}