package com.unistage.internship_service.repository;

import com.unistage.internship_service.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    List<Application> findByStudentId(Long studentId);
}