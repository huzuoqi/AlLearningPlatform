package com.hu.ai_learningplatform.service;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {
    /**
     * 发送文本
     * @param subject 主题
     * @param content 内容
     * @param toWho 需要发送的人
     */
    void sendSimpleTextMailActual(String subject,String content,String toWho);

    /**
     * 用于填充简单文本邮件的基本信息
     * @param simpleMailMessage：文本邮件信息对象
     * @param subject：邮件主题
     * @param content：邮件内容
     * @param toWho：收件人
     */
    void handleBasicInfo(SimpleMailMessage simpleMailMessage, String subject, String content, String toWho);
}
