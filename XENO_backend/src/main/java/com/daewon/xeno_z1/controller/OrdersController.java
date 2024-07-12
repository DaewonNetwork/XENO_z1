package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.dto.order.*;
import com.daewon.xeno_z1.dto.page.PageInfinityResponseDTO;
import com.daewon.xeno_z1.dto.page.PageRequestDTO;
import com.daewon.xeno_z1.dto.product.ProductHeaderDTO;
import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.dto.cart.CartDTO;

import com.daewon.xeno_z1.exception.ProductNotFoundException;
import com.daewon.xeno_z1.exception.UserNotFoundException;
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
    public ResponseEntity<?> getAllOrders(@RequestHeader("Authorization") String token) {
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

    @PostMapping(produces = "application/json")
    public ResponseEntity<String> createOrder(@RequestBody List<OrdersDTO> ordersDTO,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        log.info("ordersDTO Controller : " + ordersDTO);
        try {
            String userEmail = userDetails.getUsername();

            log.info("orderUserEmail : " + userEmail);
            List<OrdersDTO> createdOrder = ordersService.createOrders(ordersDTO, userEmail);
            log.info(createdOrder);
            return ResponseEntity.ok("주문이 완료되었습니다.");
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

            return ResponseEntity.ok("배송 정보를 업데이트 했습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("알맞은 주소와 휴대폰 번호를 입력해주세요");
        }
    }

    // ** 주의사항 ** 주문한 사람의 토큰값이 아니면 Exception에 걸림.
    @GetMapping("/confirm")
    public ResponseEntity<?> confirmOrders(@RequestParam Long orderId, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            OrdersConfirmDTO ordersConfirmDTO = ordersService.confirmOrder(orderId, userDetails.getUsername());

            return ResponseEntity.ok(ordersConfirmDTO);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(403).body("접근 권한이 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("주문내역을 찾을 수 없습니다.");
        }
    }


    @GetMapping("/list")
    public ResponseEntity<PageInfinityResponseDTO<OrdersCardListDTO>> getOrderCardList(@AuthenticationPrincipal UserDetails userDetails, PageRequestDTO pageRequestDTO) {
        try {
            String userEmail = userDetails.getUsername();

            log.info("orderUserEmail : " + userEmail);
            PageInfinityResponseDTO<OrdersCardListDTO> orderCardList = ordersService.getOrderCardList(pageRequestDTO,userEmail);
            log.info(orderCardList);
            return ResponseEntity.ok(orderCardList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }










}

/*
    1. createOrder
    http://localhost:8090/api/orders (POST)
    [
        {
            "productColorSizeId": 4,
            "req": "hello",
            "quantity": 2,
            "amount": 50000
        }
    ]

    2. updateDeliveryInfo
    http://localhost:8090/api/orders/delivery (POST)
    {
        "address" : "user address",
        "phoneNumber" : "user phoneNumber"
    }

    ** 주의사항 ** 주문한 사람의 토큰값이 아니면 Exception에 걸림.
    3. confirmOrders
    http://localhost:8090/api/orders/confirms?orderId=해당하는orderId값  (GET)

    Query Params에 key : value 형태로 orderId : 해당하는값, 넣어주면 됨
 */


