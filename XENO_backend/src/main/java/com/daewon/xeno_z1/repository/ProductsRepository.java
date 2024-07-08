package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductsRepository extends JpaRepository<Products, Long>{



    @Query("SELECT p FROM Products p WHERE p.category = :category")
    List<Products> findByCategory(String category);

    @Query("SELECT p FROM Products p WHERE p.category = :category and p.categorySub = :categorySub")
    List<Products> findByCategorySub(String category,String categorySub);
}