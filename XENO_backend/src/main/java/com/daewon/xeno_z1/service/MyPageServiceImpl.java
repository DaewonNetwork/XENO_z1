package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.dto.order.OrdersStatusDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    @Override
    public List<OrdersStatusDTO> orderCount() {
        return List.of();
    }
}
