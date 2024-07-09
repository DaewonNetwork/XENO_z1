package com.daewon.xeno_z1.dto.order;

import com.daewon.xeno_z1.dto.auth.GetOneDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersListDTO {

    private String req;
    private Long ProductColorSizeId;
    private Long orderNumber;
    private LocalDateTime orderDate;
    private String brandName;
    private String status;
    private Long totalPrice;
    private int quantity;

    private List<GetOneDTO> getOne;
}
