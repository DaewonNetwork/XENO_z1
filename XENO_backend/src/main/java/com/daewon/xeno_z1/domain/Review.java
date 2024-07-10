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
public class Review extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment와 같은
  private long reviewId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", referencedColumnName = "userId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Users users;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productId", referencedColumnName = "productId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Products products;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productColorSizeId", referencedColumnName = "productColorSizeId")
  private ProductsColorSize productsColorSize;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productColorId", referencedColumnName = "productColorId")
  private ProductsColor productsColor;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productImageId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private ProductsImage productsImage;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "orderId", referencedColumnName = "orderId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Orders order;

  private String text;

  private double star;

  private String size;

  private int replyIndex;

  public void setUsers(Long userId) {
    this.users = Users.builder().userId(userId).build();
  }

  public void setSize(String size) {
      this.size = size;
  }

  public void setProductsColorSize(ProductsColorSize productsColorSize) {
      this.productsColorSize = productsColorSize;
  }

      // Products 정보를 얻기 위한 메서드
  public Products getProducts() {
      return this.productsColorSize.getProductsColor().getProducts();
  }

    // ProductsColor 정보를 얻기 위한 메서드
  public ProductsColor getProductsColor() {
      return this.productsColorSize.getProductsColor();
  }

  public int getReplyIndex() {
    return replyIndex;
  }

  public void setReplyIndex(int replyIndex) {
      this.replyIndex = replyIndex;
  }

}
