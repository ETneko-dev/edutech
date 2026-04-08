package com.edutech.backend.service;

import com.edutech.backend.JPA_Repository.QuestionRepository;
import com.edutech.backend.model.Question;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository){
        this.questionRepository = questionRepository;
    }

    //This method returns 10 random questions from a specific topic
    public List<Question> findQuestionsByTopicId(Integer topicId){
        List<Question> questions = questionRepository.findQuestionsByTopicId(topicId);
        //check if question List has less than 10 members
        if (questions.size() < 10){
            throw new IllegalArgumentException("Topic has less than 10 questions");
        }

        //Create new list copied from questions and shuffle it to return 10 random questions
        List<Question> shuffled = new ArrayList<>(questions);
        Collections.shuffle(shuffled);
        return shuffled.subList(0, 10);
    }
}
