package com.edutech.backend.controller;

import com.edutech.backend.model.Question;
import com.edutech.backend.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<List<Question>> getQuestionsByTopic(@PathVariable Integer topicId) {
        List<Question> questions = questionService.findQuestionsByTopicId(topicId);
        return ResponseEntity.ok(questions);
    }

}
