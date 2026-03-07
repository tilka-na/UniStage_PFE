package com.unistage.profile.controller;

import com.unistage.profile.model.RecruiterProfile;
import com.unistage.profile.model.StudentProfile;
import com.unistage.profile.repository.RecruiterProfileRepository;
import com.unistage.profile.repository.StudentProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/public")
public class PublicProfileController {

    private final StudentProfileRepository studentRepo;
    private final RecruiterProfileRepository recruiterRepo;

    public PublicProfileController(StudentProfileRepository studentRepo, RecruiterProfileRepository recruiterRepo) {
        this.studentRepo = studentRepo;
        this.recruiterRepo = recruiterRepo;
    }

    // Used by Internship Service to see who applied
    @GetMapping("/students/{userId}")
    public ResponseEntity<StudentProfile> getStudentPublic(@PathVariable Long userId) {
        return studentRepo.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Used by Students to see who posted the offer
    @GetMapping("/recruiters/{userId}")
    public ResponseEntity<RecruiterProfile> getRecruiterPublic(@PathVariable Long userId) {
        return recruiterRepo.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}