package com.edutech.backend.JPA_Repository;

import com.edutech.backend.model.Question;
import com.edutech.backend.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
//service will get topic by id, then get all questions where topic_id = that id

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    //Methods that exist in JpaRepository include findAll(), findById(), save(), delete(), etc.
    //Our custom methods:


}
