package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUserId(Users user);

    Optional<Orders> findByOrderId(Long orderId);

}
