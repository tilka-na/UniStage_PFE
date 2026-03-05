package com.unistage.profile.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recruiters")

public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    private String jobTitle;
    private String department;

    private Long companyId;

    private boolean validated;
    public RecruiterProfile(){}
    public RecruiterProfile(Long id, Long userId, String jobTitle, String department, Long companyId, boolean validated) {
        this.id = id;
        this.userId = userId;
        this.jobTitle = jobTitle;
        this.department = department;
        this.companyId = companyId;
        this.validated = validated;
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

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public boolean isValidated() {
        return validated;
    }

    public void setValidated(boolean validated) {
        this.validated = validated;
    }
}


