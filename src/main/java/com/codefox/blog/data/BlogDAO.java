package com.codefox.blog.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

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
        Datastore dataStore = MongoServiceFactory.getMongoDB();
        dataStore.save(user);
    }
    
    
    public User getUser(int userId) {
        return null;
    }

    public User getUser(String email) {
        List<User> users = MongoServiceFactory.getMongoDB().createQuery(User.class).field("email")
                .equal(email).asList();
        return users.size() > 0 ? users.get(0) : null;
    }

    public List<User> listUsers() {
        return MongoServiceFactory.getMongoDB().createQuery(User.class).asList();
    }

    public void addQuestion(Question question) {
        Datastore dataStore = MongoServiceFactory.getMongoDB();
        dataStore.save(question);
    }

    public List<Question> listQuestions() {
        return MongoServiceFactory.getMongoDB().createQuery(Question.class).asList();
    }

    public List<Question> findQuestions(String searchPattern) {
        Query<Question> query = MongoServiceFactory.getMongoDB().createQuery(Question.class);
        List<Question> list = null;
        query.or(
            query.criteria("title").containsIgnoreCase(searchPattern),
            query.criteria("description").containsIgnoreCase(searchPattern)
        );
        list = query.asList();
        System.out.println("BlogDAO.findQuestions() size = "+list.size());
        return list;
    }
    
    public Question getQuestion(int questionId) {
        List<Question> list = MongoServiceFactory.getMongoDB().createQuery(Question.class).field("questionId").equal(questionId).asList();
        return list.size() > 0 ? list.get(0) : null;
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
