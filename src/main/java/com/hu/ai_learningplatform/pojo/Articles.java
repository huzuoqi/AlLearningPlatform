package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 文章实体类
 * @date: 2022-03-07 21:31
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Articles {
    //文章id
    private int id;
    //文章标题
    private String title;
    //文章ID
    private String labelId;
    //文章类型
    private String labelName;
    //文章摘要
    private String digest;
    //阅读量
    private int readNum;
    //点赞量
    private int likeNum;
    //评论量
    private int commentCount;
    //发布日期
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;
    //文章网址
    private String url;
    //发布人ID
    private String adminId;
    //发布人名称
    private String adminName;
    //发布人头像
    private String adminAvatar;
}
