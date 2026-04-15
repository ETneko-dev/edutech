package com.edutech.backend.service;

import com.edutech.backend.JPA_Repository.UserRepository;
import com.edutech.backend.model.Score;
import com.edutech.backend.model.User;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //Called by spring security during login
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(login)
                .or(() -> userRepository.findByUserName(login))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + login));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList() //no roles for now
        );
    }

    public User findByLoginIdentifier(String login) {
        return userRepository.findByEmail(login)
                .or(() -> userRepository.findByUserName(login))
                .orElseThrow(() -> new RuntimeException("User not found: " + login));
    }

    //Called by our signup endpoint
    public User registerUser(String email, String userName, String rawPassword, Score score) {
        User user = new User(email, userName, passwordEncoder.encode(rawPassword), score);
        if (score != null) {
            score.setUser(user);
        }
        return userRepository.save(user);
    }

    private Score getOrCreateScore(User user) {
        Score score = user.getScore();
        if (score == null) {
            score = new Score();
            score.setUser(user);
            user.setScore(score);
            userRepository.save(user);
        }
        return score;
    }

    //Add quiz score to user's existing score for a topic
    public void addScore(String email, int topicId, int points) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Score score = getOrCreateScore(user);

        switch (topicId) {
            case 1 -> score.setMathTotalScore(score.getMathTotalScore() + points);
            case 2 -> score.setScienceTotalScore(score.getScienceTotalScore() + points);
            case 3 -> score.setHistoryTotalScore(score.getHistoryTotalScore() + points);
            case 4 -> score.setMusicTotalScore(score.getMusicTotalScore() + points);
            case 5 -> score.setSportsTotalScore(score.getSportsTotalScore() + points);
            default -> throw new RuntimeException("Invalid topicId: " + topicId);
        }

        userRepository.save(user);
    }

    //Get all scores for a user
    public Map<String, Integer> getScores(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        Score score = getOrCreateScore(user);

        Map<String, Integer> scores = new HashMap<>();
        scores.put("mathTotalScore", score.getMathTotalScore());
        scores.put("scienceTotalScore", score.getScienceTotalScore());
        scores.put("historyTotalScore", score.getHistoryTotalScore());
        scores.put("musicTotalScore", score.getMusicTotalScore());
        scores.put("sportsTotalScore", score.getSportsTotalScore());
        return scores;
    }

    public List<Map<String, Object>> getLeaderboard(int limit) {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> rows = new ArrayList<>();

        for (User user : users) {
            Score score = getOrCreateScore(user);
            int totalScore = score.getMathTotalScore()
                    + score.getScienceTotalScore()
                    + score.getHistoryTotalScore()
                    + score.getMusicTotalScore()
                    + score.getSportsTotalScore();

            Map<String, Object> row = new HashMap<>();
            row.put("userName", user.getUserName());
            row.put("totalScore", totalScore);
            rows.add(row);
        }

        rows.sort(Comparator.comparingInt(r -> -((Integer) r.get("totalScore"))));

        if (rows.size() > limit) {
            return rows.subList(0, limit);
        }
        return rows;
    }
}
