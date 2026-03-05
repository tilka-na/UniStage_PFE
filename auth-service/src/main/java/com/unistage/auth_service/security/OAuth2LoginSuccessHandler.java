package com.unistage.auth_service.security;

import com.unistage.auth_service.model.Credential;
import com.unistage.auth_service.repository.CredentialRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final CredentialRepository credentialRepository; // Database connection enabled!

    public OAuth2LoginSuccessHandler(JwtUtil jwtUtil, CredentialRepository credentialRepository) {
        this.jwtUtil = jwtUtil;
        this.credentialRepository = credentialRepository;
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        System.out.println("Google Login Success! Email: " + email);

        Optional<Credential> optionalCredential = credentialRepository.findByEmail(email);
        Credential credential;

        if (optionalCredential.isPresent()) {
            credential = optionalCredential.get();
        } else {
            credential = new Credential();
            credential.setEmail(email);
            credential.setPasswordHash("OAUTH2_USER_" + System.currentTimeMillis());
            credential.setRole(com.unistage.auth_service.model.Role.STUDENT);
            credential.setEnabled(true);
            credential = credentialRepository.save(credential);
        }

        String token = jwtUtil.generateToken(credential);

        String frontendUrl = "http://localhost:4200/login/success?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, frontendUrl);
    }
}