package com.codefox.blog.data;

import java.util.List;

import com.codefox.blog.api.Answer;
import com.codefox.blog.api.Question;
import com.codefox.blog.api.User;

public class BlogDAO {

    private static BlogDAO dao = null;

    private static final Object LOCK = new Object();

    private BlogDAO() {
    }

    public static BlogDAO getInstance() {
        synchronized (LOCK) {
            if (dao == null) {
                dao = new BlogDAO();
            }
        }
        return dao;
    }

    public void addUser(User user) {
        
    }
    
    public User getUser(int userId) {
        return null;
    }

    public User getUser(String email) {
        return null;
    }

    public List<User> listUsers() {
        return null;
    }

    public void addQuestion(Question question) {
    }

    public List<Question> listQuestions() {
        return null;
    }

    public List<Question> findQuestions(String searchPattern) {
        return null;
    }
    
    public Question getQuestion(int questionId) {
        return null;
    }

    public List<Question> findQuestions(int userId) {
        return null;
    }

    public void addAnswer(Answer answer) {
    }

    public List<Answer> findAnswers(int questionId) {
        return null;
    }
}
