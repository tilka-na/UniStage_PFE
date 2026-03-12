package com.unistage.profile.service;

import com.unistage.profile.model.StudentProfile;
import com.unistage.profile.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StudentProfileService {

    private final StudentProfileRepository studentRepo;
    private final String UPLOAD_DIR = "uploads/documents/";

    public StudentProfileService(StudentProfileRepository studentRepo) {
        this.studentRepo = studentRepo;
    }

    public StudentProfile updateProfileWithFiles(StudentProfile newProfile, MultipartFile cv, MultipartFile letter) {
        StudentProfile existing = studentRepo.findByUserId(newProfile.getUserId())
                .orElse(new StudentProfile());

        existing.setUserId(newProfile.getUserId());
        existing.setFirstName(newProfile.getFirstName());
        existing.setLastName(newProfile.getLastName());
        existing.setPhone(newProfile.getPhone());
        existing.setUniversity(newProfile.getUniversity());
        existing.setSkills(newProfile.getSkills());
        existing.setMajor(newProfile.getMajor());
        existing.setLevel(newProfile.getLevel());

        if (newProfile.getExperiences() != null) {
            newProfile.getExperiences().forEach(exp -> exp.setStudent(existing));

            if (existing.getExperiences() != null) {
                existing.getExperiences().clear();
                existing.getExperiences().addAll(newProfile.getExperiences());
            } else {
                existing.setExperiences(newProfile.getExperiences());
            }
        }

        try {
            if (cv != null && !cv.isEmpty()) {
                existing.setCvUrl(storeFile(cv, "cv"));
            }

            if (letter != null && !letter.isEmpty()) {
                existing.setCoverLetterUrl(storeFile(letter, "letter"));
            }
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement des fichiers : " + e.getMessage());
        }

        return studentRepo.save(existing);
    }

    private String storeFile(MultipartFile file, String type) throws IOException {
        String fileName = type + "_" + UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path targetPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize().resolve(fileName);

        Files.createDirectories(targetPath.getParent());

        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        return "/api/students/documents/" + fileName;
    }

    public StudentProfile findByUserId(Long userId) {
        return studentRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profil non trouvé"));
    }
}