package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.dto.cart.CartDTO;
import com.daewon.xeno_z1.dto.order.DeliveryOrdersDTO;
import com.daewon.xeno_z1.dto.order.OrdersDTO;
import com.daewon.xeno_z1.dto.order.OrdersListDTO;
import com.daewon.xeno_z1.dto.order.OrdersResponseDTO;
import com.daewon.xeno_z1.exception.ProductNotFoundException;
import com.daewon.xeno_z1.service.OrdersService;
import com.daewon.xeno_z1.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrdersController {

    private final OrdersService ordersService;
    private final JWTUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getCartItems(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            Map<String, Object> claims = jwtUtil.validateToken(token);
            Long userId = Long.parseLong(claims.get("userId").toString());

            log.info("유저 ID: " + userId);

            List<OrdersListDTO> ordersList = ordersService.getAllOrders(userId);

            log.info("주문 목록: " + ordersList);

            return ResponseEntity.ok(ordersList);
        } catch (JwtException e) {
            return ResponseEntity.status(401).body("토큰이 유효하지 않습니다.");
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrdersDTO ordersDTO,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String userEmail = userDetails.getUsername();
            log.info("orderUserEmail : " + userEmail);
            Orders createdOrder = ordersService.createOrders(ordersDTO, userEmail);

            return ResponseEntity.ok(new OrdersResponseDTO(createdOrder));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("해당하는 상품 또는 재고가 없습니다.");
        }
    }

    //  프론트에서 address, phoneNumber 값을 보내주면 해당하는 user의 address, phoneNumber 추가됨.
    @PostMapping("/delivery")
    public ResponseEntity<String> updateDeliveryInfo(@RequestBody DeliveryOrdersDTO deliveryOrdersDTO,
                                                     @AuthenticationPrincipal UserDetails userDetails) {
        try {
            ordersService.updateUserDeliveryInfo(
                    userDetails.getUsername(),
                    deliveryOrdersDTO.getAddress(),
                    deliveryOrdersDTO.getPhoneNumber()
            );

            return ResponseEntity.ok("Delivery information updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("알맞은 주소와 휴대폰 번호를 입력해주세요");
        }
    }
}

/*
    1. updateDeliveryInfo
    http://localhost:8090/api/orders/delivery (POST)
    {
        "address" : "user address"
        "phoneNumber" : "user phoneNumber"
    }
 */


