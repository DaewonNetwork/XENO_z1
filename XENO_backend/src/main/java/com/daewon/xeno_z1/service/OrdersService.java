package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.dto.order.OrdersConfirmDTO;
import com.daewon.xeno_z1.dto.order.OrdersDTO;
import com.daewon.xeno_z1.dto.order.OrdersListDTO;

import java.util.List;

public interface OrdersService {

    List<OrdersListDTO> getAllOrders(Long userId);

    List<OrdersDTO> createOrders(List<OrdersDTO> ordersDTO, String email);

    void updateUserDeliveryInfo(String email, String address, String phoneNumber);

    OrdersConfirmDTO confirmOrder(Long orderId, String email);

    OrdersListDTO convertToDTO(Orders orders);
}
