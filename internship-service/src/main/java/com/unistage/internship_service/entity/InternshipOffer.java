package com.unistage.internship_service.entity;

import java.util.List;

import com.unistage.internship_service.enums.OfferStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class InternshipOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 5000) // Zedt hadi bach description thzz texte kbir
    private String description;
    
    private int duration; 
    
    private String location;    // Ville
    private String domain;      // Domaine
    
    private String skills;      
    
    private String companyName;
    private Long companyId;
    private Long recruiterId;

    @Enumerated(EnumType.STRING)
    private OfferStatus status;
    
@OneToMany(mappedBy = "internshipOffer", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Application> applications;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public Long getRecruiterId() { return recruiterId; }
    public void setRecruiterId(Long recruiterId) { this.recruiterId = recruiterId; }

    public OfferStatus getStatus() { return status; }
    public void setStatus(OfferStatus status) { this.status = status; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}