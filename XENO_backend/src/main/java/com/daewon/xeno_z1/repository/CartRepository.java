package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Cart;
import com.daewon.xeno_z1.domain.Products;
import com.daewon.xeno_z1.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

//    Optional<Cart> findByProductAndUser(Products product, Users user);
}
