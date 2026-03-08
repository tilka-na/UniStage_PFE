package com.unistage.document.service;

import com.unistage.document.model.DocumentMetadata;
import com.unistage.document.model.DocType;
import com.unistage.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository repository;

    // DocumentService.java
    public DocumentMetadata saveDocument(Long userId, DocType type, String storageUrl, Long internshipId) {
        DocumentMetadata doc = new DocumentMetadata();
        // No need to set ID manually if you want Mongo to generate it
        doc.setUserId(userId);
        doc.setType(type);
        doc.setUploadDate(LocalDateTime.now());
        doc.setStorageUrl(storageUrl);
        doc.setInternshipId(internshipId);

        return repository.save(doc);
    }

    public void deleteDocument(String id) {
        repository.deleteById(id);
    }
}
