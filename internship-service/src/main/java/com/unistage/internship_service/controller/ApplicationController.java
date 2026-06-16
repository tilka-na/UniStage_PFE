package com.unistage.internship_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.unistage.internship_service.entity.Application;
import com.unistage.internship_service.service.InternshipService;

import java.util.List;
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final InternshipService service;

    public ApplicationController(InternshipService service) { this.service = service; }

    @PostMapping("/postuler/{offerId}")
    public ResponseEntity<Application> postuler(@PathVariable Long offerId, @RequestBody Application application) {
    Application savedApp = service.postuler(offerId, application);
    return ResponseEntity.ok(savedApp);
}

    @GetMapping
    public List<Application> getAll() { return service.getAllApplications(); }

    @GetMapping("/student/{studentId}")
    public List<Application> getByStudent(@PathVariable Long studentId) {
        return service.getApplicationsByStudent(studentId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id, @RequestParam String newStatus) {
        Application updatedApp = service.updateApplicationStatus(id, newStatus);
        return ResponseEntity.ok(updatedApp);
    }
}
