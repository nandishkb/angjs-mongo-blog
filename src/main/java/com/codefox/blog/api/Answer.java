package com.codefox.blog.api;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("answers")
public class Answer {

    @Id
    protected int answerId;
    
    protected String answerData;
    
	protected String userName;
    
	protected int questionId;
    
    /**
     * Gets the value of the answerId property.
     * 
     */
    public int getAnswerId() {
        return answerId;
    }

    /**
     * Sets the value of the answerId property.
     * 
     */
    public void setAnswerId(int value) {
        this.answerId = value;
    }

    /**
     * Gets the value of the answerData property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAnswerData() {
        return answerData;
    }

    /**
     * Sets the value of the answerData property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAnswerData(String value) {
        this.answerData = value;
    }

    /**
     * Gets the value of the username property.
     * 
     * @return
     *     possible object is
     *     {@link User }
     *     
     */
    public String getUsername() {
        return userName;
    }

    /**
     * Sets the value of the username property.
     * 
     * @param value
     *     allowed object is
     *     {@link User }
     *     
     */
    public void setUsername(String userName) {
        this.userName = userName;
    }

	@Override
	public String toString() {
		return "Answer [answerId=" + answerId + ", answerData=" + answerData + ", user=" + userName + ", questionId="
				+ questionId + "]";
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

}
