package com.unistage.auth_service.service;

import com.unistage.auth_service.dto.AuthResponse;
import com.unistage.auth_service.dto.LoginRequest;
import com.unistage.auth_service.dto.RegisterRequest;
import com.unistage.auth_service.model.Credential;
import com.unistage.auth_service.model.PasswordResetToken;
import com.unistage.auth_service.model.Role;
import com.unistage.auth_service.repository.PasswordResetTokenRepository;
import com.unistage.auth_service.repository.CredentialRepository;
import com.unistage.auth_service.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional; // Import this!

import java.util.UUID;
import java.util.Optional;

@Service
public class AuthService {

    private final CredentialRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;

    public AuthService(CredentialRepository repo, PasswordEncoder encoder, JwtUtil jwt, PasswordResetTokenRepository tokenRepository, JavaMailSender mailSender) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwt = jwt;
        this.tokenRepository = tokenRepository;
        this.mailSender = mailSender;
    }

    public void register(RegisterRequest r) {
        if (repo.findByEmail(r.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Credential u = new Credential();
        u.setEmail(r.getEmail());
        u.setPasswordHash(encoder.encode(r.getPassword()));
        u.setRole(Role.valueOf(r.getRole()));
        u.setEnabled(true);

        repo.save(u);
    }

    public AuthResponse login(LoginRequest r) {
        Credential u = repo.findByEmail(r.getEmail()).orElse(null);

        if (u == null || !encoder.matches(r.getPassword(), u.getPasswordHash())) {
            return null;
        }

        return new AuthResponse(
                jwt.generateToken(u),
                u.getId(),
                u.getRole().name()
        );
    }

    @Transactional // Required because we are deleting from DB (deleteByEmail)
    public void forgotPassword(String email) {
        Optional<Credential> userOpt = repo.findByEmail(email);
        if (userOpt.isEmpty()) {
            return;
        }

        String token = UUID.randomUUID().toString();

        tokenRepository.deleteByEmail(email);
        PasswordResetToken resetToken = new PasswordResetToken(token, email);
        tokenRepository.save(resetToken);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ton-email@gmail.com"); // Mettez votre email ici
        message.setTo(email);
        message.setSubject("UniStage - Réinitialisation du mot de passe");
        message.setText("Vous avez demandé la réinitialisation de votre mot de passe.\n\n" +
                "Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :\n" +
                "http://localhost:4200/reset-password?token=" + token + "\n\n" +
                "Ce lien expirera dans 15 minutes.");

        mailSender.send(message);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Lien invalide ou expiré"));

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            throw new RuntimeException("Ce lien a expiré");
        }

        Credential user = repo.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.setPasswordHash(encoder.encode(newPassword));
        repo.save(user);

        tokenRepository.delete(resetToken);
    }
}