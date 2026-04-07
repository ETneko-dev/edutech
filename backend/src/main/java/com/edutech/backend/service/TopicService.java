package com.edutech.backend.service;

import com.edutech.backend.JPA_Repository.TopicRepository;
import com.edutech.backend.model.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Service layer is where we combine business logic and data access
//Right now its just simple data pass-through with findAll and findById
@Service
public class TopicService {

    public final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Topic getTopicById(int id) {
        return topicRepository.findById(id).orElse(null);
    }
}