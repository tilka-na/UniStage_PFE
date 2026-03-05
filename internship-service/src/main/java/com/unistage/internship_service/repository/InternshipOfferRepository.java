package com.unistage.internship_service.repository;

import com.unistage.internship_service.entity.InternshipOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InternshipOfferRepository extends JpaRepository<InternshipOffer, Long> {
    // Custom query: Jib liya ghir les offres li OPEN
    // List<InternshipOffer> findByStatus(OfferStatus status);
}
