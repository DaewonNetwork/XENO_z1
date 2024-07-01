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
public class Size {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment와 같은
  private long sizeId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "productId", referencedColumnName = "productId", unique = true)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Products products;

  private long S;

  private long M;

  private long L;

  private long xl;

}
