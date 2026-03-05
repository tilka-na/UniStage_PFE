package com.unistage.document.controller;

import com.unistage.document.model.DocType;
import com.unistage.document.model.DocumentMetadata;
import com.unistage.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping
    public DocumentMetadata uploadDocument(
            @RequestParam DocType type,
            @RequestParam(required = false) Long internshipId,
            @RequestHeader("X-User-Id") Long userId
    ) {
        // fake MinIO path for now
        String storageUrl = "minio://bucket/file.pdf";

        return documentService.saveDocument(
                userId,
                type,
                storageUrl,
                internshipId
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        documentService.deleteDocument(id);
    }
}
