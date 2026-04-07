package com.edutech.backend.model;

import jakarta.persistence.*;

@Entity
public class Question {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name="topic_id")
    private Topic topic;

    @Column(name="question")
    private String question_text;

    @Column(name="A")
    private String option_A;

    @Column(name="B")
    private String option_B;

    @Column(name="C")
    private String option_C;

    @Column(name="D")
    private String option_D;

    @Column
    private String answer;

    //constructor:
    public Question(int id, Topic topic, String question_text, String option_A, String option_B, String option_C, String option_D, String answer) {
        this.id = id;
        this.topic = topic;
        this.question_text = question_text;
        this.option_A = option_A;
        this.option_B = option_B;
        this.option_C = option_C;
        this.option_D = option_D;
        this.answer = answer;
    }

    //getters & setters:
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public String getQuestion_text() {
        return question_text;
    }

    public void setQuestion_text(String question_text) {
        this.question_text = question_text;
    }

    public String getOption_A() {
        return option_A;
    }

    public void setOption_A(String option_A) {
        this.option_A = option_A;
    }

    public String getOption_B() {
        return option_B;
    }

    public void setOption_B(String option_B) {
        this.option_B = option_B;
    }

    public String getOption_C() {
        return option_C;
    }

    public void setOption_C(String option_C) {
        this.option_C = option_C;
    }

    public String getOption_D() {
        return option_D;
    }

    public void setOption_D(String option_D) {
        this.option_D = option_D;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    //to string
    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", topic=" + topic +
                ", question_text='" + question_text + '\'' +
                ", option_A='" + option_A + '\'' +
                ", option_B='" + option_B + '\'' +
                ", option_C='" + option_C + '\'' +
                ", option_D='" + option_D + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}
