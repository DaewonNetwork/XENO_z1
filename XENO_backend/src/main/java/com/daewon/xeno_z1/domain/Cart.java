package com.daewon.xeno_z1.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;

    @Column(name = "quantity", nullable = false)
    private Long quantity;  // 수량

    @Column(name = "price", nullable = false)
    private Long price;

    public Cart(Users user, Products product, Long quantity, Long price) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    public Cart() {

    }
}
