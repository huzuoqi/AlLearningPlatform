package com.hu.ai_learningplatform.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 邮件实体类
 * @date: 2022-03-15 10:42
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Mail {
    //标题
    private String title;
    //内容
    private String content;
    //接收人邮件地址
    private String email;
}
