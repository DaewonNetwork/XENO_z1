package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Orders;
import com.daewon.xeno_z1.domain.ProductsColorSize;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.auth.GetOneDTO;
import com.daewon.xeno_z1.dto.order.OrdersDTO;
import com.daewon.xeno_z1.dto.order.OrdersListDTO;
import com.daewon.xeno_z1.exception.UserNotFoundException;
import com.daewon.xeno_z1.repository.OrdersRepository;
import com.daewon.xeno_z1.repository.ProductsColorSizeRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.Hibernate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class OrdersServiceImpl implements OrdersService {

    private final UserRepository userRepository;
    private final OrdersRepository ordersRepository;
    private final ProductsColorSizeRepository productsColorSizeRepository;

    @Override
    public List<OrdersListDTO> getAllOrders(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        log.info("user: " + userId);
        List<Orders> orders = ordersRepository.findByUserId(user);
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public Orders createOrders(OrdersDTO ordersDTO, String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info(authentication);
        String currentUserName = authentication.getName();

        log.info(currentUserName);

        Users users = userRepository.findByEmail(currentUserName)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

        Orders orders = Orders.builder()
                .orderPayId(generateOrderPayId(ordersDTO.getOrderPayId()))
                .orderNumber(generateOrderNumber())
                .productsColorSize(findProductColorSize(ordersDTO.getProductColorSizeId()))
                .userId(users)
                .status("결제완료")
                .req(ordersDTO.getReq())
                .quantity(ordersDTO.getQuantity())
                .amount(ordersDTO.getAmount())
                .build();

        Hibernate.initialize(orders.getProductsColorSize().getProductsColor().getProducts());

        return ordersRepository.save(orders);
    }

    @Override
    @Transactional
    // 데이터 일관성 보장(address, phoneNumber 둘 다 맞는 값이어야지 저장이 돼야 함)
    // 예외 처리(처리 중 예외가 발생하면 DB를 rollBack 시키기 위해)
    // Transactinal을 사용함
    public void updateUserDeliveryInfo(String email, String address, String phoneNumber) {
        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        users.setAddress(address);
        users.setPhoneNumber(phoneNumber);

        userRepository.save(users);
    }

    @Override
    public OrdersListDTO convertToDTO(Orders orders) {
        OrdersListDTO ordersListDTO = new OrdersListDTO();

        ordersListDTO.setReq(orders.getReq());
        ordersListDTO.setProductColorSizeId(orders.getProductsColorSize().getProductColorSizeId());
        ordersListDTO.setOrderNumber(orders.getOrderNumber());
        ordersListDTO.setOrderDate(orders.getCreateAt());
        ordersListDTO.setBrandName(orders.getProductsColorSize().getProductsColor().getProducts().getBrandName());
        ordersListDTO.setStatus(orders.getStatus());
        ordersListDTO.setAmount(orders.getAmount());
        ordersListDTO.setQuantity(orders.getQuantity());

        // GetOneDTO 리스트 생성 및 설정
        List<GetOneDTO> getOneList = new ArrayList<>();
        getOneList.add(createGetOneDTO(orders.getUserId()));
        ordersListDTO.setGetOne(getOneList);

        return ordersListDTO;
    }

    private GetOneDTO createGetOneDTO(Users users) {
        return new GetOneDTO(users.getPhoneNumber(), users.getAddress());
    }

    // 주문번호 orderNumber 랜덤생성
    private Long generateOrderNumber() {
        long timestamp = System.currentTimeMillis();
        long random = new Random().nextInt(1000000); // 6자리 랜덤 숫자

        // timestamp를 왼쪽으로 20비트 시프트하고 랜덤 값을 더함
        return (timestamp << 20) | random;
    }

    // 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열 이어야함.
    // 위 조건에 해당하는 랜덤 orderPayId값 생성
    private String generateOrderPayId(String ord) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
        String specialChars = "-_=";
        StringBuilder stringBuilder = new StringBuilder(specialChars);
        Random random = new Random();
        int length = random.nextInt(59) + 6; // 6 to 64 characters

        for (int i = specialChars.length(); i < length; i++) {
            stringBuilder.append(chars.charAt(random.nextInt(chars.length())));
        }

        List<Character> charList = new ArrayList<>();
        for (char c : stringBuilder.toString().toCharArray()) {
            charList.add(c);
        }
        Collections.shuffle(charList);

        StringBuilder orderPayId = new StringBuilder();
        for (char c : charList) {
            orderPayId.append(c);
        }
        return orderPayId.toString();
    }

    private ProductsColorSize findProductColorSize(Long productColorSizeId) {
        return productsColorSizeRepository.findById(productColorSizeId)
                .orElseThrow(() -> new EntityNotFoundException("ProductsColorSize not found with id: " + productColorSizeId));
    }
}
