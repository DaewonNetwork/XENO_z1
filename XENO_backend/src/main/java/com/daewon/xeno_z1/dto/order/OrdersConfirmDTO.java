package com.daewon.xeno_z1.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersConfirmDTO {

    private Long orderId;
    private String orderNumber;
    private String name;
    private String address;
    private String amount;
}
