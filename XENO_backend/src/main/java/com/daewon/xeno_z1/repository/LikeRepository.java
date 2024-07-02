package com.daewon.xeno_z1.repository;




import com.daewon.xeno_z1.domain.LikeProducts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface LikeRepository extends JpaRepository<LikeProducts, Long> {
    @Query(value = "SELECT * from like_products where product_id=:productId and user_id=:userId",nativeQuery = true)
    LikeProducts findByProductAndUsers(Long productId, Long userId); // phId, userId를 통해 EnjoyPh(약국 즐겨찾기) 내 검색
}