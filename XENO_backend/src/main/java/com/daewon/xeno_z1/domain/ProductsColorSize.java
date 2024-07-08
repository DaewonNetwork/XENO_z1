
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
public class ProductsColorSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment와 같은
    private long productColorSizeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productColorId", referencedColumnName = "productColorId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductsColor productsColor;

    private long stock_s;

    private long stock_m;

    private long stock_l;

    private long stock_xl; 
}

