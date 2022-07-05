package com.hu.ai_learningplatform.utils;

import com.hu.ai_learningplatform.pojo.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 登陆页面返回信息
 * @date: 2022-03-11 15:05
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginMsg {
    private int code;
    private Map<String,String> map;
}
