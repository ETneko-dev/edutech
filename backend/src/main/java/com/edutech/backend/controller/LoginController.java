package com.edutech.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class LoginController {

    @GetMapping("/api/login")
    public ResponseEntity<Map<String, String>> loginData() {
        return ResponseEntity.ok(Map.of(
                "title", "Login",
                "message", "This will be the login page"
        ));
    }
}
