package com.unistage.auth_service.security;

import com.unistage.auth_service.model.Credential;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key SECRET_KEY =
            Keys.hmacShaKeyFor(
                    "unistage_secret_unistage_secret_123456".getBytes()
            );

    public String generateToken(Credential credential) {
        return Jwts.builder()
                .setSubject(credential.getEmail())
                .claim("userId", credential.getId())
                .claim("role", credential.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 86400000) // 24h
                )
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
