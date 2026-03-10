package com.edutech.backend.controller;

import com.edutech.backend.model.Topic;
import com.edutech.backend.service.TopicService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class PageController {

    private final TopicService topicService;

    public PageController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("topics", topicService.getAllTopics());
        return "index";
    }

    @GetMapping("/topics/{id}")
    public String topicPage(@PathVariable String id, Model model) {
        Topic topic = topicService.getTopicById(id);

        if (topic == null) {
            return "404";
        }

        model.addAttribute("topic", topic);
        return "topic";
    }
}
