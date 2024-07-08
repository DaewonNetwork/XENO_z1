package com.daewon.xeno_z1.domain;

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
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productColorSizeId", referencedColumnName = "productColorSizeId" ,nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductsColorSize productsColorSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductsImageId", referencedColumnName = "ProductImageId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductsImage productsImage;

    @Column(name = "quantity", nullable = false)
    private Long quantity;  // 수량

    @Column(name = "price", nullable = false)
    private Long price;

    public Cart(Users users, ProductsColorSize productsColorSize, Long quantity, Long price) {
        this.users = users;
        this.productsColorSize = productsColorSize;
        this.quantity = quantity;
        this.price = price;
    }

}