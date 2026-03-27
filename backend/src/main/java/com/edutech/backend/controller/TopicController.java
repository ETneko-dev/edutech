package com.edutech.backend.controller;

import com.edutech.backend.model.Topic;
import com.edutech.backend.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable String id) {
        Topic topic = topicService.getTopicById(id);
        if (topic == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(topic);
    }
}
