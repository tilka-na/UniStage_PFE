package com.unistage.profile.controller;

import com.unistage.profile.model.EncadrantProfile;
import com.unistage.profile.repository.EncadrantProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/encadrants")
public class EncadrantProfileController {

    private final EncadrantProfileRepository encadrantRepo;

    public EncadrantProfileController(EncadrantProfileRepository encadrantRepo) {
        this.encadrantRepo = encadrantRepo;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ENCADRANT')")
    public EncadrantProfile getMyEncadrantProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return encadrantRepo.findByUserId(userId).orElse(new EncadrantProfile());
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('ENCADRANT')")
    public EncadrantProfile updateMyEncadrantProfile(@RequestBody EncadrantProfile details, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return encadrantRepo.findByUserId(userId)
                .map(existing -> {
                    existing.setFirstName(details.getFirstName());
                    existing.setLastName(details.getLastName());
                    existing.setSpecialty(details.getSpecialty());
                    existing.setInstitution(details.getInstitution());
                    return encadrantRepo.save(existing);
                })
                .orElseGet(() -> {
                    details.setUserId(userId);
                    return encadrantRepo.save(details);
                });
    }

    @DeleteMapping("/me")
    @PreAuthorize("hasRole('ENCADRANT')")
    @Transactional
    public ResponseEntity<?> deleteMyProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        encadrantRepo.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}