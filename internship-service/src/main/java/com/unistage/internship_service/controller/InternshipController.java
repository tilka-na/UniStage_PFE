package com.unistage.internship_service.controller;

import com.unistage.internship_service.entity.Evaluation;
import com.unistage.internship_service.entity.Internship;
import com.unistage.internship_service.entity.InternshipOffer;
import com.unistage.internship_service.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

  private final InternshipService service;

  public InternshipController(InternshipService service) {
    this.service = service;
  }

  @GetMapping("/offers")
  public List<InternshipOffer> getAllOffers() {
    return service.getAllOffers();
  }

  @PostMapping("/offers")
  public InternshipOffer createOffer(@RequestBody InternshipOffer offer) {
    return service.createOffer(offer);
  }

  @GetMapping("/offers/{id}")
  public ResponseEntity<InternshipOffer> getOfferById(@PathVariable Long id) {
    return service.getOfferById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/offers/{id}")
  public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
    service.deleteOffer(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/offers/{id}")
  public ResponseEntity<InternshipOffer> updateOffer(@PathVariable Long id, @RequestBody InternshipOffer offer) {
    InternshipOffer updatedOffer = service.updateOffer(id, offer);
    return ResponseEntity.ok(updatedOffer);
  }

  // Keep this one
  @GetMapping("/{id}")
  public ResponseEntity<Internship> getInternshipDetails(@PathVariable Long id) {
    return service.getInternshipDetails(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/milestones/{id}/validate")
  public ResponseEntity<Void> validateMilestone(@PathVariable Long id) {
    service.validateMilestone(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/{id}/evaluations")
  public ResponseEntity<Evaluation> addEvaluation(@PathVariable Long id, @RequestBody Evaluation evaluation) {
    return ResponseEntity.ok(service.addEvaluation(id, evaluation));
  }

  // REMOVED THE DUPLICATE BLOCK THAT WAS HERE
}
