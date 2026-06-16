package com.unistage.notification_service.service;

import com.unistage.notification_service.entity.Notification;
import com.unistage.notification_service.repository.NotificationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final EmailService emailService;
    private final NotificationRepository notificationRepository;
    private final ObjectMapper objectMapper; // 💡 Injected to read JSON payload strings safely

    public NotificationService(EmailService emailService,
                               NotificationRepository notificationRepository,
                               ObjectMapper objectMapper) {
        this.emailService = emailService;
        this.notificationRepository = notificationRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * 📻 Kafka Listener built directly into your service.
     * Tunes into the 'notification-topic' channel and handles inbound status event streams.
     */
    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void consumeNotificationEvent(String rawJson) {
        try {
            System.out.println("📩 [Notification Service] Received event payload from stream: " + rawJson);

            // Extract the core structural keys sent over the wire by the internship service
            JsonNode jsonNode = objectMapper.readTree(rawJson);
            Long userId = jsonNode.has("userId") ? jsonNode.get("userId").asLong() : null;
            String title = jsonNode.has("title") ? jsonNode.get("title").asText() : "Notification";
            String message = jsonNode.has("message") ? jsonNode.get("message").asText() : "";

            // 💡 MICROSERVICE DATA GAP CHALLENGE:
            // Because this is a separate container, it doesn't share a database with the student profiles.
            // For your local testing environment to succeed immediately, we'll route it straight
            // to your email ("nadia.arrahime@gmail.com") so your inbox lights up right now!
            String targetEmail = "nadia.arrahime@gmail.com";

            System.out.println("🚀 Routing notification message to email: " + targetEmail + " for User ID: " + userId);

            // Forward directly into your existing storage and transactional mail pipelines
            processAndSaveNotification(targetEmail, title, message);

        } catch (Exception e) {
            System.err.println("❌ Failed to process inbound Kafka notification text string: " + e.getMessage());
            e.printStackTrace();
        }
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