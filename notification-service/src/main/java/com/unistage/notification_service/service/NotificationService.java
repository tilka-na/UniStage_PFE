package com.unistage.notification_service.service;

import com.unistage.notification_service.entity.Notification;
import com.unistage.notification_service.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final EmailService emailService; 
    private final NotificationRepository notificationRepository;

    public NotificationService(EmailService emailService, NotificationRepository notificationRepository) {
        this.emailService = emailService;
        this.notificationRepository = notificationRepository;
    }

    public void processAndSaveNotification(String email, String subject, String message) {
        Notification notification = new Notification();
        notification.setRecipientEmail(email);
        notification.setSubject(subject);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        notificationRepository.save(notification);
        
        if (emailService != null) {
            emailService.sendEmail(email, subject, message);
        }
    }

    public List<Notification> getUserNotifications(String email) {
        return notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(email);
    }

    public void markAsRead(String id) {
        notificationRepository.findById(id).ifPresent(notif -> {
            notif.setRead(true); 
            notificationRepository.save(notif);
        });
    }

    public EmailService getEmailService() {
        return emailService;
    }
}