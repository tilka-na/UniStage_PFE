package com.unistage.profile.controller;

import com.unistage.profile.model.TutorProfile;
import com.unistage.profile.repository.TutorProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tutors")
public class TutorProfileController {

    private final TutorProfileRepository tutorRepo;

    public TutorProfileController(TutorProfileRepository tutorRepo) {
        this.tutorRepo = tutorRepo;
    }

    // CREATE & UPDATE
    @PutMapping("/me")
    @PreAuthorize("hasRole('TUTOR')")
    public TutorProfile updateMyTutorProfile(@RequestBody TutorProfile details, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();

        return tutorRepo.findByUserId(userId)
                .map(existing -> {
                    existing.setFirstName(details.getFirstName());
                    existing.setLastName(details.getLastName());
                    existing.setJobTitle(details.getJobTitle());
                    existing.setDepartment(details.getDepartment());
                    existing.setCompanyId(details.getCompanyId());
                    return tutorRepo.save(existing);
                })
                .orElseGet(() -> {
                    details.setUserId(userId);
                    return tutorRepo.save(details);
                });
    }

    // READ (Private)
    @GetMapping("/me")
    @PreAuthorize("hasRole('TUTOR')")
    public TutorProfile getMyTutorProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return tutorRepo.findByUserId(userId)
                .orElseGet(() -> {
                    TutorProfile shell = new TutorProfile();
                    shell.setUserId(userId);
                    return shell;
                });
    }

    // READ (By ID - used by Students/Admin)
    @GetMapping("/{id}")
    public TutorProfile getTutorById(@PathVariable Long id) {
        return tutorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor not found"));
    }

    // DELETE
    @DeleteMapping("/me")
    @PreAuthorize("hasRole('TUTOR')")
    @Transactional
    public ResponseEntity<?> deleteMyTutorProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        tutorRepo.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}