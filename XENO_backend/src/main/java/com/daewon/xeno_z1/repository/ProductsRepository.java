package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Products;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ProductsRepository extends JpaRepository<Products, Long>{

    @Query("SELECT p FROM Products p JOIN ProductsStar ps ON p.productId = ps.productsColor.products.productId WHERE p.category = :category ORDER BY ps.starAvg DESC")
    List<Products> findTop10ProductsByCategory(@Param("category") String category);

//    @Query("SELECT p FROM Products p JOIN ProductsStar ps ON p.productId = ps.productsColor.products.productId WHERE p.category = :category ORDER BY ps.starAvg DESC")
//    List<Products> findTop50ProductsByCategory(@Param("category") String category);

    @Query("SELECT p FROM Products p LEFT JOIN ProductsStar ps ON p.productId = ps.productsColor.products.productId WHERE p.category = :category ORDER BY ps.starAvg DESC")
    Page<Products> findByCategoryOrderByStarAvgDesc(String category, Pageable pageable);

}