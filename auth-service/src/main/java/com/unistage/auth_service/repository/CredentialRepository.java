package com.unistage.auth_service.repository;

import com.unistage.auth_service.model.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CredentialRepository extends JpaRepository<Credential, Long> {
    Optional<Credential> findByEmail(String email);
}

