package com.unistage.profile.controller;
import com.unistage.profile.model.Company;
import com.unistage.profile.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/companies")
public class CompanyProfileController {

    private final CompanyRepository companyRepo; // Assuming you have a Company entity/repo

    public CompanyProfileController(CompanyRepository companyRepo) {
        this.companyRepo = companyRepo;
    }

    // READ ALL (Public - for students to browse)
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepo.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    // CREATE (Admin Only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Company createCompany(@RequestBody Company company) {
        return companyRepo.save(company);
    }

    // UPDATE (Admin or Recruiter from that company)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company details) {
        Company existing = companyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        existing.setName(details.getName());
        existing.setAddress(details.getAddress());
        existing.setWebsite(details.getWebsite());
        existing.setSector(details.getSector());

        return companyRepo.save(existing);
    }

    // DELETE (Admin Only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        companyRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}