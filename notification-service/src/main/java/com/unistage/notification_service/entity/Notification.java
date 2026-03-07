package com.unistage.notification_service.entity;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String recipientEmail;
    private String subject;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;

    // 2. Constructor Khawi (No-Args)
    public Notification() {}

    // 3. Constructor b les arguments (All-Args) bach n-khdmou f Service bla builder
    public Notification(String recipientEmail, String subject, String message, LocalDateTime createdAt, boolean isRead) {
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isIsRead() { return isRead; }
    public void setIsRead(boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public void setRead(boolean read) {
        this.isRead = read;
    }
}