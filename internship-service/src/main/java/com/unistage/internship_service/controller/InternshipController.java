package com.unistage.internship_service.controller;

import com.unistage.internship_service.entity.Evaluation;
import com.unistage.internship_service.entity.Internship;
import com.unistage.internship_service.entity.InternshipOffer;
import com.unistage.internship_service.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }
    
    // 1. Jib ga3 l-offres
    @GetMapping("/offers")
    public List<InternshipOffer> getAllOffers() {
        return service.getAllOffers();
    }

    // 2. Cree offer jdida
    @PostMapping("/offers")
    public InternshipOffer createOffer(@RequestBody InternshipOffer offer) {
        return service.createOffer(offer);
    }

    // 3. Jib offer b l-ID
    @GetMapping("/offers/{id}")
    public ResponseEntity<InternshipOffer> getOfferById(@PathVariable Long id) {
        return service.getOfferById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. M-s-7 offer
    @DeleteMapping("/offers/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        service.deleteOffer(id);
        return ResponseEntity.ok().build();
    }

    // 5. Modifier offer
    @PutMapping("/offers/{id}")
    public ResponseEntity<InternshipOffer> updateOffer(@PathVariable Long id, @RequestBody InternshipOffer offer) {
        InternshipOffer updatedOffer = service.updateOffer(id, offer);
        return ResponseEntity.ok(updatedOffer);
    }
 // 1. Jib details dyal stage (Milestones + Evaluations)
    @GetMapping("/{id}")
    public ResponseEntity<Internship> getDetails(@PathVariable Long id) {
        return service.getInternshipDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 2. Valider milestone
    @PutMapping("/milestones/{id}/validate")
    public ResponseEntity<Void> validateMilestone(@PathVariable Long id) {
        service.validateMilestone(id);
        return ResponseEntity.ok().build();
    }

    // 3. Ajouter une évaluation
    @PostMapping("/{id}/evaluations")
    public ResponseEntity<Evaluation> addEvaluation(@PathVariable Long id, @RequestBody Evaluation evaluation) {
        return ResponseEntity.ok(service.addEvaluation(id, evaluation));
    }
    
    // I removed the duplicate @GetMapping("/{id}") that was here!
}