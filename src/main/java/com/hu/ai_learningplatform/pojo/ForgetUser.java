package com.hu.ai_learningplatform.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 忘记密码实体类
 * @date: 2022-03-15 10:59
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgetUser {
//    用户名
    private String userName;
//    邮箱
    private String email;
//    验证码
    private String confirm;
//    密码
    private String password;
}
