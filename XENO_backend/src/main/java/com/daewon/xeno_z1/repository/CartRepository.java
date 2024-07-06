package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(Users user);

    void deleteByUserAndProductsColorSize(Users user, ProductsColorSize productsColorSize);
}
