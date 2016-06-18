package com.codefox.blog.data;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.codefox.blog.api.Answer;
import com.codefox.blog.api.Question;
import com.codefox.blog.api.User;

public class BlogDAOTest implements DAO {

    private static BlogDAOTest dao = null;

    private static final Object LOCK = new Object();
    
    private List<User> users = new ArrayList<>();
    private List<Question> questions = new ArrayList<>();

    private BlogDAOTest() {
    }

    public static BlogDAOTest getInstance() {
        synchronized (LOCK) {
            if (dao == null) {
                dao = new BlogDAOTest();
            }
        }
        return dao;
    }

    public void addUser(User user) {
        if (!users.contains(user)) {
            users.add(user);
        }
    }
    
    public User getUser(String email) {
        for (Iterator<User> iterator = users.iterator(); iterator.hasNext();) {
            User user = (User) iterator.next();
            if (user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    public List<User> listUsers() {
        return users;
    }

    public void addQuestion(Question question) {
        if (!questions.contains(question)) {
            questions.add(question);
        }
    }

    public List<Question> listQuestions() {
        return questions;
    }

    public List<Question> findQuestions(String searchPattern) {
        List<Question> result = new ArrayList<>();
        for (Iterator<Question> iterator = questions.iterator(); iterator.hasNext();) {
            Question question = (Question) iterator.next();
            String title = question.getTitle();
            String description = question.getDescription();
            
            if (title.contains(searchPattern)) {
                result.add(question);
            } else if (description.contains(searchPattern)) {
                result.add(question);
            }
        }
        return result;
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
    
    public void resetTest() {
        users.clear();
        questions.clear();
    }
}
