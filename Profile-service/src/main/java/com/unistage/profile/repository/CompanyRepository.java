package com.unistage.profile.repository;

import com.unistage.profile.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    // Custom query to find a company by its exact name (useful for Admins)
    Optional<Company> findByName(String name);

    // Custom query to search companies by sector
    // (useful for Students filtering companies)
    List<Company> findBySectorContainingIgnoreCase(String sector);
}