package com.unistage.internship_service.entity;

import com.unistage.internship_service.enums.AppStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Informations dyal l-candidature
    private String motivationLetter;
    private String cvUrl; 

    @Enumerated(EnumType.STRING)
    private AppStatus status;

    private Date date;

    private Long studentId; // ID dyal t-talib

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "offer_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private InternshipOffer internshipOffer;


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public InternshipOffer getInternshipOffer() { return internshipOffer; }
    public void setInternshipOffer(InternshipOffer internshipOffer) { 
        this.internshipOffer = internshipOffer; 
    }
    
    public AppStatus getStatus() { return status; }
    public void setStatus(AppStatus status) { this.status = status; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getMotivationLetter() {
        return motivationLetter;
    }

    public void setMotivationLetter(String motivationLetter) {
        this.motivationLetter = motivationLetter;
    }

    public String getCvUrl() {
        return cvUrl;
    }

    public void setCvUrl(String cvUrl) {
        this.cvUrl = cvUrl;
    }

   // 2. Bach t-ban Smiya d l-Offre (Angular: candidat.offerTitle)
    @JsonProperty("offerTitle")
    public String getOfferTitle() {
        return internshipOffer != null ? internshipOffer.getTitle() : "Offre Supprimée";
    }

    // 3. Bach t-ban Smiya d Sharika (Angular: candidat.companyName)
    @JsonProperty("companyName")
    public String getCompanyName() {
        return internshipOffer != null ? internshipOffer.getCompanyName() : "--";
    }
    // 1. Bach t-ban lik ID bla mochkil (Angular: candidat.internshipOfferId)
    public Long getInternshipOfferId() {
        return internshipOffer != null ? internshipOffer.getId() : null;
    }
    
    @JsonProperty("internshipOfferId")
    public void setInternshipOfferId(Long offerId) {
        if (offerId != null) {
            this.internshipOffer = new InternshipOffer();
            this.internshipOffer.setId(offerId);
        }
    }

    @JsonProperty("offerId")
    public void setOfferId(Long offerId) {
        if (offerId != null) {
            this.internshipOffer = new InternshipOffer();
            this.internshipOffer.setId(offerId);
        }
    }

    
}