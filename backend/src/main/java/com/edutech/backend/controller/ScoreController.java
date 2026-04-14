package com.edutech.backend.controller;

import com.edutech.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/score")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class ScoreController {

    private final UserService userService;

    public ScoreController(UserService userService) {
        this.userService = userService;
    }

    // POST /api/score/update  { "email": "...", "topicId": 1, "score": 80 }
    @PostMapping("/update")
    public ResponseEntity<Map<String, String>> updateScore(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        Integer topicId = (Integer) body.get("topicId");
        Integer scoreValue = (Integer) body.get("score");

        if (email == null || topicId == null || scoreValue == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "email, topicId, and score are required"));
        }

        try {
            userService.addScore(email, topicId, scoreValue);
            return ResponseEntity.ok(Map.of("message", "Score updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // GET /api/score?email=...
    @GetMapping
    public ResponseEntity<?> getScore(@RequestParam String email) {
        try {
            Map<String, Integer> scores = userService.getScores(email);
            return ResponseEntity.ok(scores);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
