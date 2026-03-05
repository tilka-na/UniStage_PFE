package com.unistage.auth_service.controller;

import com.unistage.auth_service.dto.AuthResponse;
import com.unistage.auth_service.dto.LoginRequest;
import com.unistage.auth_service.dto.RegisterRequest;
import com.unistage.auth_service.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(request);

            LoginRequest autoLoginRequest = new LoginRequest();
            autoLoginRequest.setEmail(request.getEmail());
            autoLoginRequest.setPassword(request.getPassword()); // Assumes RegisterRequest has getPassword()

            AuthResponse response = authService.login(autoLoginRequest);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = "/forgot-password", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            authService.forgotPassword(email);
            return ResponseEntity.ok(Collections.singletonMap("message", "Si l'adresse existe, un email a été envoyé."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Erreur lors de l'envoi de l'email"));
        }
    }

    @PostMapping(value = "/reset-password", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            authService.resetPassword(token, newPassword);

            return ResponseEntity.ok(Collections.singletonMap("message", "Mot de passe modifié avec succès"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }
}