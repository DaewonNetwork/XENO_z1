package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.dto.order.OrdersDTO;
import com.daewon.xeno_z1.dto.order.OrdersListDTO;

import java.util.List;

public interface OrdersService {

    List<OrdersListDTO> getAllOrders(Long userId);

    Orders createOrders(OrdersDTO ordersDTO, String email);

    void updateUserDeliveryInfo(String email, String address, String phoneNumber);

    OrdersListDTO convertToDTO(Orders orders);
}
