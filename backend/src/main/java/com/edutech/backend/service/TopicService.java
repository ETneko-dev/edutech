package com.edutech.backend.service;

import com.edutech.backend.model.Topic;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    private final List<Topic> topics = List.of(
            new Topic("topic1", "Topic 1"),
            new Topic("topic2", "Topic 2"),
            new Topic("topic3", "Topic 3"),
            new Topic("topic4", "Topic 4"),
            new Topic("topic5", "Topic 5")
    );

    public List<Topic> getAllTopics() {
        return topics;
    }

    public Topic getTopicById(String id) {
        for (Topic topic : topics) {
            if (topic.getId().equals(id)) {
                return topic;
            }
        }
        return null;
    }
}