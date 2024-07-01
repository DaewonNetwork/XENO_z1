package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.auth.AuthSignupDTO;

public interface AuthService {

    // 이메일 중복 검사 예외 Exception
    static class UserEmailExistException extends Exception {

        public UserEmailExistException() {}
        public UserEmailExistException(String msg) {
            super(msg);
        }
    }

    Users signup(AuthSignupDTO authSignupDTO) throws UserEmailExistException;

    Users signin(final String email, final String password);
}
