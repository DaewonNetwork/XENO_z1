package com.daewon.xeno_z1.dto.review;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewUpdateDTO {

    private String text;

    private int star;

    private LocalDateTime updateAt;
}
