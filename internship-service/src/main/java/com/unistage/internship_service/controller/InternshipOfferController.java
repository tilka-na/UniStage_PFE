package com.unistage.internship_service.controller;

import com.unistage.internship_service.entity.InternshipOffer;
import com.unistage.internship_service.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers") // Wadi7a: hadi dyal l-offres
public class InternshipOfferController {
    private final InternshipService service;

    public InternshipOfferController(InternshipService service) { this.service = service; }

    @GetMapping
    public List<InternshipOffer> getAll() { return service.getAllOffers(); }

    @PostMapping
    public InternshipOffer create(@RequestBody InternshipOffer offer) { return service.createOffer(offer); }

    @GetMapping("/{id}")
    public ResponseEntity<InternshipOffer> getById(@PathVariable Long id) {
        return service.getOfferById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteOffer(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InternshipOffer> update(@PathVariable Long id, @RequestBody InternshipOffer offer) {
        return ResponseEntity.ok(service.updateOffer(id, offer));
    }
}
