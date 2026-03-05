package com.unistage.internship_service.service;

import com.unistage.internship_service.entity.*;
import com.unistage.internship_service.enums.*;
import com.unistage.internship_service.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

record NotificationEvent(Long userId, String title, String message) {}

@Service
@Transactional 
public class InternshipService {

    private final InternshipOfferRepository offerRepository;
    private final ApplicationRepository appRepository;
    private final InternshipRepository internshipRepository;
    private final MilestoneRepository milestoneRepository;
    private final EvaluationRepository evaluationRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public InternshipService(InternshipOfferRepository offerRepository, 
                             ApplicationRepository appRepository,
                             InternshipRepository internshipRepository,
                             MilestoneRepository milestoneRepository,
                             EvaluationRepository evaluationRepository,
                             KafkaTemplate<String, Object> kafkaTemplate) {
        this.offerRepository = offerRepository;
        this.appRepository = appRepository;
        this.internshipRepository = internshipRepository;
        this.milestoneRepository = milestoneRepository;
        this.evaluationRepository = evaluationRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    // --- LOGIC OFFRES ---
    public List<InternshipOffer> getAllOffers() { return offerRepository.findAll(); }

    public InternshipOffer createOffer(InternshipOffer offer) {
        if (offer.getStatus() == null) offer.setStatus(OfferStatus.OPEN);
        return offerRepository.save(offer);
    }

    public Optional<InternshipOffer> getOfferById(Long id) { return offerRepository.findById(id); }

    public void deleteOffer(Long id) { offerRepository.deleteById(id); }
   
@Transactional // Mouhim bzaf bach l-base de données t-thiyyeq l-isla7
public InternshipOffer updateOffer(Long id, InternshipOffer updatedOffer) {
    InternshipOffer existing = offerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Offre introuvable"));
    
    existing.setTitle(updatedOffer.getTitle());
    existing.setDescription(updatedOffer.getDescription());
    existing.setDomain(updatedOffer.getDomain());
    existing.setCompanyName(updatedOffer.getCompanyName());
    existing.setLocation(updatedOffer.getLocation());
    existing.setDuration(updatedOffer.getDuration());
    existing.setSkills(updatedOffer.getSkills());
    
    if (updatedOffer.getStatus() != null) {
        existing.setStatus(updatedOffer.getStatus());
    }
    
    return offerRepository.save(existing);
}
    public List<Application> getAllApplications() { return appRepository.findAll(); }

    public List<Application> getApplicationsByStudent(Long studentId) { 
        return appRepository.findByStudentId(studentId); 
    }

    public Application postuler(Long offerId, Application app) {
        InternshipOffer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offre introuvable"));
        app.setInternshipOffer(offer);
        app.setStatus(AppStatus.PENDING);
        app.setDate(new Date());
        return appRepository.save(app);
    }

    public Application updateApplicationStatus(Long id, String newStatusStr) {
        Application app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature introuvable"));
        
        AppStatus status = AppStatus.valueOf(newStatusStr.toUpperCase());
        app.setStatus(status);
        
        if (status == AppStatus.ACCEPTED) { 
            createInternship(app); 
        }
        
        sendNotification(app.getStudentId(), "Candidature", "Nouveau statut : " + status);
        return appRepository.save(app);
    }

   private void createInternship(Application app) {
        Internship internship = new Internship();
        internship.setApplicationSource(app);
        internship.setStudentId(app.getStudentId());
        internship.setStartDate(new Date());
        internship.setStatus(StageStatus.ONGOING);
        
        Internship saved = internshipRepository.save(internship);
        
        Milestone m1 = new Milestone();
        m1.setTitle("Plan de travail");
        m1.setDate(new Date());
        m1.setStatus("PENDING");
        m1.setInternship(saved);
        milestoneRepository.save(m1);
    }

    public Optional<Internship> getInternshipDetails(Long id) {
        return internshipRepository.findById(id);
    }

    public Evaluation addEvaluation(Long internshipId, Evaluation evaluation) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Stage introuvable"));
        
        evaluation.setInternship(internship);
        return evaluationRepository.save(evaluation);
    }

    public void validateMilestone(Long id) {
        Milestone m = milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone introuvable"));
        m.setStatus("COMPLETED");
        milestoneRepository.save(m);
    }

    private Date addDays(Date date, int days) {
        Calendar cal = Calendar.getInstance(); 
        cal.setTime(date); 
        cal.add(Calendar.DATE, days); 
        return cal.getTime();
    }

    private void sendNotification(Long userId, String title, String message) {
        try {
            kafkaTemplate.send("notification-topic", new NotificationEvent(userId, title, message));
        } catch (Exception e) {
            System.err.println("Kafka error: " + e.getMessage());
        }
    }
}