package com.unistage.profile.controller;

import com.unistage.profile.model.RecruiterProfile;
import com.unistage.profile.repository.RecruiterProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/recruiters")
public class RecruiterProfileController {

    private final RecruiterProfileRepository recruiterRepo;

    public RecruiterProfileController(RecruiterProfileRepository recruiterRepo) {
        this.recruiterRepo = recruiterRepo;
    }

    // CREATE & UPDATE
    @PutMapping("/me")
    @PreAuthorize("hasRole('RECRUITER')")
    public RecruiterProfile updateMyRecruiterProfile(@RequestBody RecruiterProfile details, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();

        return recruiterRepo.findByUserId(userId)
                .map(existing -> {
                    existing.setJobTitle(details.getJobTitle());
                    existing.setDepartment(details.getDepartment());
                    existing.setCompanyId(details.getCompanyId());
                    // Logic: If they update their profile, you might want to re-verify them
                    // existing.setValidated(false);
                    return recruiterRepo.save(existing);
                })
                .orElseGet(() -> {
                    details.setUserId(userId);
                    details.setValidated(false); // New profiles start unvalidated
                    return recruiterRepo.save(details);
                });
    }

    // READ (Private)
    @GetMapping("/me")
    @PreAuthorize("hasRole('RECRUITER')")
    public RecruiterProfile getMyRecruiterProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return recruiterRepo.findByUserId(userId)
                .orElseGet(() -> {
                    RecruiterProfile shell = new RecruiterProfile();
                    shell.setUserId(userId);
                    return shell;
                });
    }

    // READ (Public - for Students to see Recruiter info)
    @GetMapping("/{id}")
    public RecruiterProfile getPublicRecruiterProfile(@PathVariable Long id) {
        return recruiterRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
    }

    // DELETE
    @DeleteMapping("/me")
    @PreAuthorize("hasRole('RECRUITER')")
    @Transactional
    public ResponseEntity<?> deleteMyRecruiterProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        recruiterRepo.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}