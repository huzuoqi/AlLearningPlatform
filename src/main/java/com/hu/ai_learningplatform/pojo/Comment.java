package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 文章评论实体类
 * @date: 2022-03-07 22:14
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    //评论id
    private int id;
    //评论人ID
    private int commentId;
    //文章ID
    private int articleId;
    //发布人ID
    private int postId;
    //发布人名称
    private String commentName;
    //发布人头像
    private String commentAvatar;
    //父评论ID
    private int parentId;
    //评论正文
    private String comment;
    //评论时间
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date commentTime;
    //子评论
    List<Comment> child;
}
