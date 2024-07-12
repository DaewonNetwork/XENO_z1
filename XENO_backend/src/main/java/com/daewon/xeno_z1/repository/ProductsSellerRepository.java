package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.ProductsSeller;
import com.daewon.xeno_z1.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductsSellerRepository extends JpaRepository<ProductsSeller, Long>{

    List<ProductsSeller> findByUsers(Users users);


}
