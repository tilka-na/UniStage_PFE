package com.unistage.profile.repository;

import com.unistage.profile.model.RecruiterProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    Optional<RecruiterProfile> findByUserId(Long userId);
    List<RecruiterProfile> findByValidatedFalse();

    void deleteByUserId(Long userId);
}
