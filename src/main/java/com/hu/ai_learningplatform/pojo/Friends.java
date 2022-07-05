package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 关注列表实体类
 * @date: 2022-03-07 22:25
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friends {
    //关注id
    private int id;
    //关注人id
    private int userId;
    //被关注人id
    private int friendId;
    //被关注人名称
    private String friendName;
    //被关注人名称
    private String friendAvatar;
    //被关注人邮箱
    private String friendEmail;
    //关注时间
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date friendTime;
}
