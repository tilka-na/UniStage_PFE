package com.unistage.auth_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final Key SECRET_KEY =Keys.hmacShaKeyFor("unistage_secret_unistage_secret_123456".getBytes());
    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //Skip auth endpoints
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        //Read Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authHeader.substring(7);
        try {
            //Parse JWT
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String email = claims.getSubject();
            Long userId = claims.get("userId", Long.class);
            String role = claims.get("role", String.class);
            //Create authentication
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userId, null, List.of(new SimpleGrantedAuthority("ROLE_" + role)));
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Save in security context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        } catch (Exception e) {
            // Invalid token
        }
        filterChain.doFilter(request, response);
    }
}

