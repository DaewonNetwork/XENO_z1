package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUserId(Users user);

}
