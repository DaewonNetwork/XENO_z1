package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.dto.order.*;
import com.daewon.xeno_z1.dto.page.PageInfinityResponseDTO;
import com.daewon.xeno_z1.dto.page.PageRequestDTO;

import java.util.List;

public interface OrdersService {

    List<OrdersListDTO> getAllOrders(Long userId);

    List<OrdersDTO> createOrders(List<OrdersDTO> ordersDTO, String email);

    void updateUserDeliveryInfo(String email, String address, String phoneNumber);

//    OrdersConfirmDTO confirmOrder(Long orderId);

    OrdersListDTO convertToDTO(Orders orders);

    PageInfinityResponseDTO<OrdersCardListDTO> getOrderCardList(PageRequestDTO pageRequestDTO,String email);

    OrdersDetailInfoDTO getOrderDetailInfo(Long orderId, String email);


}
