package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Users;

public interface AuthService {

    // 이메일 중복 검사 예외 Exception
    static class UserEmailExistException extends Exception {

        public UserEmailExistException() {}
        public UserEmailExistException(String msg) {
            super(msg);
        }
    }

    Users signin(final String email, final String password);
}
