package com.daewon.xeno_z1.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

//    @ManyToOne
//    @JoinColumn(name = "product_id", nullable = false)
//    private Products product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_color_size", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductsColorSize productsColorSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_image_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductsImage productsImage;

    @Column(name = "quantity", nullable = false)
    private Long quantity;  // 수량

    @Column(name = "price", nullable = false)
    private Long price;

    public Cart(Users user, ProductsColorSize productsColorSize, ProductsImage productsImage, Long quantity, Long price) {
        this.user = user;
        this.productsColorSize = productsColorSize;
        this.productsImage = productsImage;
        this.quantity = quantity;
        this.price = price;
    }

    public Cart() {

    }
}