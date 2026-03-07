package com.unistage.auth_service.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, this endpoint is public";
    }

    @GetMapping("/student-only")
    @PreAuthorize("hasRole('STUDENT')")
    public String studentOnly() {
        return "Hello STUDENT!";
    }

    @GetMapping("/recruiter-only")
    @PreAuthorize("hasRole('RECRUITER')")
    public String recruiterOnly() {
        return "Hello RECRUITER!";
    }
}
