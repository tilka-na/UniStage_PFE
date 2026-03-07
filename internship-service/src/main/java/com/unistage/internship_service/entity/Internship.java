package com.unistage.internship_service.entity;

import com.unistage.internship_service.enums.StageStatus;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Internship {

    public static Object builder() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Enumerated(EnumType.STRING)
    private StageStatus status; // EN_COURS, TERMINE, ANNULE

    private Long studentId;
    private Long tutorId;       // Encadrant Entreprise
    private Long professorId;   // Encadrant Ecole

    @OneToOne
    @JoinColumn(name = "application_id")
    private Application applicationSource;

    //  Ga3 l-marahil (Milestones) dyal had l-stage
    @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Milestone> milestones;

    @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Evaluation> evaluations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public StageStatus getStatus() {
        return status;
    }

    public void setStatus(StageStatus status) {
        this.status = status;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    public Application getApplicationSource() {
        return applicationSource;
    }

    public void setApplicationSource(Application applicationSource) {
        this.applicationSource = applicationSource;
    }

    public List<Milestone> getMilestones() {
        return milestones;
    }

    public void setMilestones(List<Milestone> milestones) {
        this.milestones = milestones;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }
    
}