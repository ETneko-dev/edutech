package com.edutech.backend.JPA_Repository;

import com.edutech.backend.model.Question;
import com.edutech.backend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
//service will get topic by id, then get all questions where topic_id = that id

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    //Methods that exist in JpaRepository include findAll(), findById(), save(), delete(), etc.
    //Our custom methods:

    //This method is declared without a body, Spring will generate implementation
    //based on method name
    public List<Question> findQuestionsByTopicId(Integer topicId);

}
