package com.codefox.blog.data;

import java.util.List;

import com.codefox.blog.api.Answer;
import com.codefox.blog.api.Question;
import com.codefox.blog.api.User;

public interface DAO {

    void addUser(User user);
    
    User getUser(String email);

    List<User> listUsers();

    void addQuestion(Question question);

    List<Question> listQuestions();

    List<Question> findQuestions(String searchPattern);
    
    Question getQuestion(int questionId);

    List<Question> findQuestions(int userId);

    void addAnswer(Answer answer);

    List<Answer> findAnswers(int questionId);
    
}
