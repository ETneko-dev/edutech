package com.edutech.backend.model;

import jakarta.persistence.*;

@Entity
public class Score {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "mathTotalScore")
    private int mathTotalScore;

    @Column(name = "scienceTotalScore")
    private int scienceTotalScore;

    @Column(name = "historyTotalScore")
    private int historyTotalScore;

    @Column(name = "musicTotalScore")
    private int musicTotalScore;

    @Column(name = "sportsTotalScore")
    private int sportsTotalScore;

    //no args constructor required by JPA:
    protected Score(){

    }

    //Constructor:
    public Score(int id, User user, int mathTotalScore, int scienceTotalScore, int historyTotalScore, int musicTotalScore, int sportsTotalScore) {
        this.id = id;
        this.user = user;
        this.mathTotalScore = mathTotalScore;
        this.scienceTotalScore = scienceTotalScore;
        this.historyTotalScore = historyTotalScore;
        this.musicTotalScore = musicTotalScore;
        this.sportsTotalScore = sportsTotalScore;
    }

    //getters & setters:

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getMathTotalScore() {
        return mathTotalScore;
    }

    public void setMathTotalScore(int mathTotalScore) {
        this.mathTotalScore = mathTotalScore;
    }

    public int getScienceTotalScore() {
        return scienceTotalScore;
    }

    public void setScienceTotalScore(int scienceTotalScore) {
        this.scienceTotalScore = scienceTotalScore;
    }

    public int getHistoryTotalScore() {
        return historyTotalScore;
    }

    public void setHistoryTotalScore(int historyTotalScore) {
        this.historyTotalScore = historyTotalScore;
    }

    public int getMusicTotalScore() {
        return musicTotalScore;
    }

    public void setMusicTotalScore(int musicTotalScore) {
        this.musicTotalScore = musicTotalScore;
    }

    public int getSportsTotalScore() {
        return sportsTotalScore;
    }

    public void setSportsTotalScore(int sportsTotalScore) {
        this.sportsTotalScore = sportsTotalScore;
    }

    //toString:

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", user=" + user +
                ", mathTotalScore=" + mathTotalScore +
                ", scienceTotalScore=" + scienceTotalScore +
                ", historyTotalScore=" + historyTotalScore +
                ", musicTotalScore=" + musicTotalScore +
                ", sportsTotalScore=" + sportsTotalScore +
                '}';
    }
}
