package com.unistage.profile.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unistage.profile.model.StudentProfile;
import com.unistage.profile.repository.StudentProfileRepository;
import com.unistage.profile.service.StudentProfileService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")

public class StudentProfileController {

    private final StudentProfileService studentService;
    private final StudentProfileRepository studentRepo;
    private final ObjectMapper objectMapper;

    public StudentProfileController(StudentProfileService studentService, StudentProfileRepository studentRepo, ObjectMapper objectMapper) {
        this.studentService = studentService;
        this.studentRepo = studentRepo;
        this.objectMapper = objectMapper;
    }

    // READ (Get)
    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public StudentProfile getMyStudentProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return studentRepo.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile shell = new StudentProfile();
                    shell.setUserId(userId);
                    return shell;
                });
    }

    // CREATE & UPDATE (Put)
    @PutMapping(value = "/me", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('STUDENT')")
    public StudentProfile updateMyStudentProfile(
            @RequestPart("profile") String profileJson,
            @RequestPart(value = "cv", required = false) MultipartFile cvFile,
            @RequestPart(value = "coverLetter", required = false) MultipartFile coverLetterFile,
            Authentication authentication
    ) throws JsonProcessingException {
        Long userId = (Long) authentication.getPrincipal();
        StudentProfile profileData = objectMapper.readValue(profileJson, StudentProfile.class);
        profileData.setUserId(userId);
        return studentService.updateProfileWithFiles(profileData, cvFile, coverLetterFile);
    }

    // DELETE
    @DeleteMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    @Transactional
    public ResponseEntity<?> deleteMyStudentProfile(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        studentRepo.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}