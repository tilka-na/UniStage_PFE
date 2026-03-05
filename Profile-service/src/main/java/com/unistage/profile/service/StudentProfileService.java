package com.unistage.profile.service;

import com.unistage.profile.model.StudentProfile;
import com.unistage.profile.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentRepo;
    private final String UPLOAD_DIR = "uploads/";

    // --- ADDED STANDARD CONSTRUCTOR ---
    public StudentProfileService(StudentProfileRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    public StudentProfile findByUserId(Long userId) {
        return studentRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }
    // Update this method in StudentProfileService.java
    public StudentProfile updateProfileWithFiles(StudentProfile newProfile, MultipartFile cv, MultipartFile letter) {
        // BUG FIX: Fetch existing by userId first
        StudentProfile existing = studentRepo.findByUserId(newProfile.getUserId())
                .orElse(new StudentProfile());

        // Map fields manually to ensure the ID stays the same
        existing.setUserId(newProfile.getUserId());
        existing.setFirstName(newProfile.getFirstName());
        existing.setLastName(newProfile.getLastName());
        existing.setPhone(newProfile.getPhone());
        existing.setUniversity(newProfile.getUniversity());
        existing.setSkills(newProfile.getSkills());
        existing.setMajor(newProfile.getMajor());
        existing.setLevel(newProfile.getLevel());

        // Handling experiences list (Clear and add to keep JPA relationship intact)
        if(newProfile.getExperiences() != null) {
            newProfile.getExperiences().forEach(exp -> exp.setStudent(existing));
            if(existing.getExperiences() != null) {
                existing.getExperiences().clear();
                existing.getExperiences().addAll(newProfile.getExperiences());
            } else {
                existing.setExperiences(newProfile.getExperiences());
            }
        }

        // ... (Keep your existing file upload logic here) ...
        try {
            if (cv != null && !cv.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + cv.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, cv.getBytes());
                existing.setCvUrl(path.toString()); // Save path to DB
            }

            if (letter != null && !letter.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + letter.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, letter.getBytes());
                existing.setCoverLetterUrl(path.toString());
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not save files", e);
        }


        return studentRepo.save(existing);
    }
}