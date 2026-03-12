package com.unistage.profile.controller;

import com.unistage.profile.model.RecruiterProfile;
import com.unistage.profile.repository.RecruiterProfileRepository;
import com.unistage.profile.repository.TutorProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProfileController {

    private final RecruiterProfileRepository recruiterRepo;
    private final TutorProfileRepository tutorRepo;

    public AdminProfileController(RecruiterProfileRepository recruiterRepo, TutorProfileRepository tutorRepo) {
        this.recruiterRepo = recruiterRepo;
        this.tutorRepo = tutorRepo;
    }

    // READ ALL
    @GetMapping("/recruiters")
    public List<RecruiterProfile> getAllRecruiters() {
        return recruiterRepo.findAll();
    }

    // UPDATE (Action based)
    @PutMapping("/recruiters/{id}/validate")
    public RecruiterProfile validateRecruiter(@PathVariable Long id) {
        RecruiterProfile recruiter = recruiterRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setValidated(true);
        return recruiterRepo.save(recruiter);
    }

    // DELETE (Reject/Remove)
    @DeleteMapping("/recruiters/{id}")
    public ResponseEntity<?> deleteRecruiter(@PathVariable Long id) {
        recruiterRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/tutors/{id}")
    public ResponseEntity<?> deleteTutor(@PathVariable Long id) {
        tutorRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}