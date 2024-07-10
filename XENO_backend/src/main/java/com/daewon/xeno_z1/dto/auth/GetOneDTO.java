package com.daewon.xeno_z1.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetOneDTO {

    private String phoneNumber;
    private String address;
}
