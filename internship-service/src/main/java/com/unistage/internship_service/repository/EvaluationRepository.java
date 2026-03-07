package com.unistage.internship_service.repository;

import com.unistage.internship_service.entity.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;  


public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    // Exemple: Jib evaluations dyal stage wa7ed
    List<Evaluation> findByInternshipId(Long internshipId);
}
