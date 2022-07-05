package com.hu.ai_learningplatform.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 登陆时用来接收数据
 * @date: 2022-03-11 14:52
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUser {
    //用户名
    private String userName;
    //用户密码
    private String password;
}
