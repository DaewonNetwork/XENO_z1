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
public class OrdersCardListDTO {

    private Long orderId;
    private Long productColorId;
    private String orderDate;
    private String brandName;
    private String productName;
    private String size;
    private String color;
    private String status;
    private Long amount;
    private boolean isReview;
    private Long reviewId;
    private int quantity;
    private byte[] productImage;

}
