package com.codefox.blog.service;

import java.util.List;

import com.codefox.blog.api.Answer;
import com.codefox.blog.api.BlogException;
import com.codefox.blog.api.Question;
import com.codefox.blog.api.User;
import com.codefox.blog.api.UserDTO;
import com.codefox.blog.api.WebBlog;
import com.codefox.blog.data.BlogDAO;
import com.codefox.blog.data.DAO;

public class CodeFoxBlog implements WebBlog {

    public CodeFoxBlog() {
    }
    
    private DAO dao = BlogDAO.getInstance();

    @Override
    public void addQuestion(Question question) throws BlogException {
        dao.addQuestion(question);
    }

    @Override
    public List<Question> findQuestions(String searchString) {
        return dao.findQuestions(searchString);
    }

    @Override
    public List<Question> listQuestions() {
        return dao.listQuestions();
    }

    @Override
    public void addUser(User user) {
        if (user == null || user.getEmail() == null || user.getEmail().equals("") ||
                user.getPhoneNumber() <= 0 || user.getPassword() == null || user.getPassword().length() < 6) {
            throw new BlogException("Invalid User Data");
        }
        if (dao.getUser(user.getEmail()) != null) {
            throw new BlogException("Duplicate User");
        }
        dao.addUser(user);
    }

    @Override
    public User getUser(String email) {
        return dao.getUser(email);
    }

    @Override
    public List<User> listUsers() {
        return dao.listUsers();
    }

    @Override
    public void addAnswer(Answer answer) {
    	System.out.println("CodeFoxBlog.addAnswer() "+answer);
        dao.addAnswer(answer);
    }

    @Override
    public List<Question> findQuestions(int userId) {
        return dao.findQuestions(userId);
    }

    
    @Override
    public List<Answer> findAnswers(int questionId) {
        return dao.findAnswers(questionId);
    }
    
    public void setBlogDao(DAO dao) {
        this.dao = dao;
    }

    @Override
    public UserDTO getUserDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

}
