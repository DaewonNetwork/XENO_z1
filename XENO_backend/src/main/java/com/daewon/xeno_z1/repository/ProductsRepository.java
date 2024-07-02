package com.daewon.xeno_z1.repository;


import com.daewon.xeno_z1.domain.Products;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductsRepository extends JpaRepository<Products, Long>{}