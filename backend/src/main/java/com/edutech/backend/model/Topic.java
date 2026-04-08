package com.edutech.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Topic {
    @Id
    private int id;

    private String name;

    //no args constructor required by JPA:
    protected Topic() {
    }

    //constructor:
    public Topic(int id, String name){
        this.id = id;
        this.name = name;
    }

    //getters:
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}