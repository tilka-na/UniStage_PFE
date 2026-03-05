package com.unistage.profile.repository;

import com.unistage.profile.model.EncadrantProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EncadrantProfileRepository extends JpaRepository<EncadrantProfile, Long> {
    Optional<EncadrantProfile> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
