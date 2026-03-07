package com.unistage.internship_service.repository;

import com.unistage.internship_service.entity.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByInternshipId(Long internshipId);
}
