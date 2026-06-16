package com.unistage.profile.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "students")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true)
    private String cne;

    private String phone;
    private String university;
    @Column(columnDefinition = "TEXT")
    private String skills;
    private String major;
    private String level;
    private String cvUrl;
    private String coverLetterUrl;
    private int profileViews = 0;


    public StudentProfile(){}
    public StudentProfile(Long id, Long userId, String firstName, String lastName, String cne, String phone, String university, String skills, String major, String level, String cvUrl, String coverLetterUrl, List<StudentExperience> experiences) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cne = cne;
        this.phone = phone;
        this.university = university;
        this.skills = skills;
        this.major = major;
        this.level = level;
        this.cvUrl = cvUrl;
        this.coverLetterUrl = coverLetterUrl;
        this.experiences = experiences;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCvUrl() {
        return cvUrl;
    }

    public void setCvUrl(String cvUrl) {
        this.cvUrl = cvUrl;
    }

    public String getCoverLetterUrl() {
        return coverLetterUrl;
    }

    public void setCoverLetterUrl(String coverLetterUrl) {
        this.coverLetterUrl = coverLetterUrl;
    }

    public List<StudentExperience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<StudentExperience> experiences) {
        this.experiences = experiences;
    }
    public int getProfileViews() {
        return this.profileViews;
    }

    public void setProfileViews(int profileViews) {
        profileViews = profileViews;
    }
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentExperience> experiences;
}
