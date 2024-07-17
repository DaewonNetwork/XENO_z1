
package com.daewon.xeno_z1.controller;

import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.auth.AuthSigninDTO;
import com.daewon.xeno_z1.dto.auth.AuthSignupDTO;
import com.daewon.xeno_z1.dto.auth.SellerInfoCardDTO;
import com.daewon.xeno_z1.security.UsersDetailsService;
import com.daewon.xeno_z1.service.AuthService;
import com.daewon.xeno_z1.utils.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@RequestMapping("/api/seller")
@RequiredArgsConstructor
@RestController
@EnableWebSecurity
public class SellerController {

    private final JWTUtil jwtUtil;
    private final AuthService authService;
    private final UsersDetailsService usersDetailsService;



    @GetMapping("/read")
    public ResponseEntity<?> readSellerInfo(@AuthenticationPrincipal UserDetails userDetails) {

        SellerInfoCardDTO dto = authService.readSellerInfo(userDetails);
        return ResponseEntity.ok(dto);


    }

}

