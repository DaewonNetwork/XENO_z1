package com.daewon.xeno_z1.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersStatusDTO {
    private String status;
    private Long count;
}
