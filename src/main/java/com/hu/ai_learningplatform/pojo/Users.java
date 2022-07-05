package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.Date;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 用户实体类
 * @date: 2022-03-07 22:28
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    //用户id
    private int id;
    //用户名
    private String userName;
    //用户密码
    private String password;
    //用户昵称
    private String nickName;
    //电话号
    private long telephone;
    //电子邮件
    private String email;
    //年龄
    private int age;
    //出生日期
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd")
    private Date birthday;
    //注册时间
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date registerTime;
    //头像路径
    private String avatar;
}
