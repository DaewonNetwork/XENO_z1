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
public class Reply extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment와 같은
  private long replyId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", referencedColumnName = "userId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Users users;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reviewId", referencedColumnName = "reviewId")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Review review;

  private String text;




}
