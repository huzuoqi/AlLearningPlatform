package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 管理员实体类
 * @date: 2022-03-07 21:24
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    //管理员id
    private int id;
    //管理员用户名
    private String adminName;
    //管理员密码
    private String password;
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
    //管理员注册时间
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date registerTime;
    //头像路径
    private String avatar;
}
