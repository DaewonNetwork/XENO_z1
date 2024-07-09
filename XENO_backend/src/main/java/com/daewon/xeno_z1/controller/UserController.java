package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.repository.RefreshTokenRepository;
import com.daewon.xeno_z1.utils.JWTUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JWTUtil jwtUtil;

    // 클라이언트가 accessToken을 서버에 보내면
    // 서버에서 해당 토큰을 검증하고 payload 전체를 JSON 형식으로 클라이언트에게 반환이 가능
    // 테스트할때 Authorization에 Bearer (accessToken Value) - 이렇게 보내면 됨
    @GetMapping()
    public ResponseEntity<?> readUser(@RequestHeader("Authorization") String token) {
        try {
            // Bearer 토큰에서 "Bearer " 부분 제거
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            // 토큰에서 payload 추출
            Map<String, Object> claims = jwtUtil.validateToken(token);

            log.info("payload값 서버 -> 클라이언트 : " + claims);
            // payload 반환
            return ResponseEntity.ok(claims);
        } catch (JwtException e) {
            // 토큰이 유효하지 않으면 401 상태 코드 반환
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        log.info("logout token(successToken) : " + token);
        // "Bearer " 부분 제거 - 토큰 값이 "Bearer ${accessToken}" 이 방식으로 들어가기 때문
        String refreshToken = token.substring(7);
        log.info("refreshToken : " + refreshToken);
        // Refresh Token 삭제
        refreshTokenRepository.deleteByToken(refreshToken);
        // SecurityContextHolder 초기화
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logout successful");
    }
}
