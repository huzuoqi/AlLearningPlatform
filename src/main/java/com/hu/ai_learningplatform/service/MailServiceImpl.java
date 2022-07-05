package com.hu.ai_learningplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 邮件业务
 * @date: 2022-03-15 10:46
 **/

@Service("mailService")
public class MailServiceImpl implements MailService{

    //默认编码
    public static final String DEFAULT_ENCODING = "UTF-8";

    //本身邮件的发送者，来自邮件配置
    @Value("${spring.mail.username}")
    private String userName;
    @Value("${spring.mail.nickname}")
    private String nickname;

    //模板引擎解析对象，用于解析模板
    @Autowired
    private TemplateEngine templateEngine;

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Override
    public void sendSimpleTextMailActual(String subject, String content, String toWho) {
        //检验参数：邮件主题、收件人、邮件内容必须不为空才能够保证基本的逻辑执行
        if(subject == null||toWho == null||content == null){
            System.out.println("无法继续执行，因为缺少基本的参数：邮件主题、收件人、邮件内容");
            throw new RuntimeException("模板邮件无法继续发送，因为缺少必要的参数！");
        }
        System.out.println("开始发送简单文本邮件");
        //创建一个简单邮件信息对象
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        //设置邮件的基本信息
        handleBasicInfo(simpleMailMessage,subject,content,toWho);
        //发送邮件
        mailSender.send(simpleMailMessage);
        System.out.println("发送邮件成功");
    }

    @Override
    public void handleBasicInfo(SimpleMailMessage simpleMailMessage, String subject, String content, String toWho) {
        //设置发件人
        simpleMailMessage.setFrom(nickname+'<'+userName+'>');
        //设置邮件的主题
        simpleMailMessage.setSubject(subject);
        //设置邮件的内容
        simpleMailMessage.setText(content);
        //设置邮件的收件人
        simpleMailMessage.setTo(toWho);
    }
}
