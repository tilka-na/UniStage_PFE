package com.unistage.notification_service.controller;

import com.unistage.notification_service.entity.Notification;
import com.unistage.notification_service.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/{email}")
    public List<Notification> getNotificationsByEmail(@PathVariable String email) {
        return notificationService.getUserNotifications(email);
    }

    @PutMapping("/{id}/read")
    public void markNotificationAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
    }
}