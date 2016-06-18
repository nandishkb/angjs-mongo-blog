package com.codefox.blog.rs;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.codefox.blog.api.Question;
import com.codefox.blog.api.User;
import com.codefox.blog.data.BlogDAO;
import com.codefox.blog.data.BlogDAOTest;
import com.codefox.blog.service.CodeFoxBlog;

import junit.framework.TestCase;

public class BlogTest extends TestCase {

    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }
    
    @Test
    public void testGetUserWithEmail() {
        BlogDAO dao = mock(BlogDAO.class);
        
        User user = new User();
        user.setEmail("nandibal@cisco.com");
        user.setFirstName("nandish");
        user.setLastName("kb");
        user.setPassword("123456");
        user.setPhoneNumber(9741701970L);
        
        when(dao.getUser("nandibal@cisco.com")).thenReturn(user);
        
        
        CodeFoxBlog blog = new CodeFoxBlog();
        blog.setBlogDao(dao);
        User u = blog.getUser("nandibal@cisco.com");
        Assert.assertEquals("nandish", u.getFirstName());
    }
    
    @Test
    public void testAddUser() {
        BlogDAOTest dao = BlogDAOTest.getInstance();
        User user = new User();
        user.setEmail("nandibal@cisco.com");
        user.setFirstName("nandish");
        user.setLastName("kb");
        user.setPassword("123456");
        user.setPhoneNumber(9741701970L);

        CodeFoxBlog blog = new CodeFoxBlog();
        blog.setBlogDao(dao);
        blog.addUser(user);
        User u = blog.getUser("nandibal@cisco.com");
        Assert.assertEquals("nandish", u.getFirstName());
        dao.resetTest();
    }
    
    @Test
    public void testAddQuestion() {
        BlogDAOTest dao = BlogDAOTest.getInstance();
        
        Question question = new Question();
        question.setTitle("I want to learn C++");
        question.setDescription("Ok lets learn C++");
                
        CodeFoxBlog blog = new CodeFoxBlog();
        blog.setBlogDao(dao);
        blog.addQuestion(question);
        
        List<Question> listQuestions = blog.listQuestions();
        
        assertEquals(true, listQuestions.contains(question));
        dao.resetTest();
    }
    
    @Test
    public void testfindQuestion() {
        BlogDAOTest dao = BlogDAOTest.getInstance();
        
        Question question = new Question();
        question.setTitle("I want to learn C++");
        question.setDescription("Ok lets learn C++");
                
        CodeFoxBlog blog = new CodeFoxBlog();
        blog.setBlogDao(dao);
        blog.addQuestion(question);
        List<Question> findQuestions = blog.findQuestions("C++");
        assertEquals(1, findQuestions.size());
        assertEquals(true, findQuestions.contains(question));
        dao.resetTest();
    }
    
    @Test
    public void testgetAllQuestion() {
        BlogDAOTest dao = BlogDAOTest.getInstance();
        CodeFoxBlog blog = new CodeFoxBlog();
        blog.setBlogDao(dao);
        
        Question question = new Question();
        question.setTitle("I want to learn C++");
        question.setDescription("Ok lets learn C++");
        blog.addQuestion(question);

        Question question1 = new Question();
        question1.setTitle("I want to learn Java");
        question1.setDescription("Ok lets learn Java");
        blog.addQuestion(question1);
        
        List<Question> allQuestions = blog.listQuestions();
        assertEquals(2, allQuestions.size());
        dao.resetTest();
    }
}
