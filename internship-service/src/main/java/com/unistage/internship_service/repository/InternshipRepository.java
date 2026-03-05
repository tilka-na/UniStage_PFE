package com.unistage.internship_service.repository;

import com.unistage.internship_service.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
}
