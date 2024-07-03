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
public class Orders extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment와 같은
  private long orderId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productColorSizeId", referencedColumnName = "productColorSizeId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private ProductsColorSize productsColorSize;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productImageId", referencedColumnName = "productImageId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private ProductsImage productsImage;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", referencedColumnName = "userId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Users users;

  private long orderNumber;

  private String status;

  private String req;

  private long count;

}
