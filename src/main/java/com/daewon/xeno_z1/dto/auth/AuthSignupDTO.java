package com.daewon.xeno_z1.dto.auth;

import lombok.Data;

import java.util.Date;

@Data
public class AuthSignupDTO {
    private String password;
    private String name;
    private String email;

    private Date createAt;
}
