package com.unistage.document.controller;

import com.unistage.document.model.DocType;
import com.unistage.document.model.DocumentMetadata;
import com.unistage.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping(consumes = {"multipart/form-data"})
    public DocumentMetadata uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam DocType type,
            @RequestParam(required = false) Long internshipId,
            @RequestHeader("X-User-Id") Long userId
    ) throws IOException {

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get("C:/unistage_uploads/" + fileName);
        Files.createDirectories(path.getParent());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("DEBUG: Saving file to -> " + path.toAbsolutePath());
        String storageUrl = "/api/documents/view/" + fileName;

        return documentService.saveDocument(userId, type, storageUrl, internshipId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        documentService.deleteDocument(id);
    }
}
