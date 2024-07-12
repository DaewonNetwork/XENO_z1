package com.daewon.xeno_z1.repository;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.domain.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByUserId(Users user);

    Page<Orders> findPagingOrdersByUserId(Pageable pageable, Users user);

    Optional<Orders> findByOrderId(Long orderId);


    @Query("SELECT COUNT(o) FROM Orders o WHERE o.status = :status")
    long countByStatus(String status); // 리뷰 작성한 수


}
