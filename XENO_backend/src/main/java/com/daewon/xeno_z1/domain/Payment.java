package com.daewon.xeno_z1.domain;


//method: "CARD",
//amount: {
//currency: "KRW",
//value: product.price
//            },
//orderId: "q6bxUBH3NTaBGL99FGPpq",
//orderName: product.productName,
//customerEmail: "customer123@gmail.com",
//customerName: "김토스",
//customerMobilePhone: "01012341234",

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private PaymentMethod method;

    private String amount;

    // 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열 이어야함.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId", referencedColumnName = "orderId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Orders orderId;

    private String orderName;

    private String customerEmail;

    private String customerName;

    private String customerMobilePhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private Users user;

    @PrePersist
    @PreUpdate
    private void populateCustomerInfo() {
        if (user != null) {
            this.customerEmail = user.getEmail();
            this.customerName = user.getName();
            this.customerMobilePhone = user.getPhoneNumber();
        }
    }
}
