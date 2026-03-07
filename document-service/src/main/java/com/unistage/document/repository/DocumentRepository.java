package com.unistage.document.repository;

import com.unistage.document.model.DocumentMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DocumentRepository extends MongoRepository<DocumentMetadata, String> {
    List<DocumentMetadata> findByUserId(Long userId);
}
