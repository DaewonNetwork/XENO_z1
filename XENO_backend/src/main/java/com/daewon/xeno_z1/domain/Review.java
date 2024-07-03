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
  @JoinColumn(name = "productId", referencedColumnName = "productId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Products products;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", referencedColumnName = "userId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Users users;

  private String text;

  private double star;

  private Long productImage;
  
  private Long size;

  public void setReview(String text,double star) {
    this.text = text;
    this.star = star;
  }

  // pharmacy 값 설정 -> phId를 받아서 생성
  public void setProducts(Long productId) {
    this.products = Products.builder().productId(productId).build();
  }

  public void setUsers(Long userId) {
    this.users = Users.builder().userId(userId).build();
  }

  public void setProductImage(Long productImage) {
    this.productImage = productImage;
  } 

  public void setSize(Long size) {
      this.size = size;
  }

}
