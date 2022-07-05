package com.hu.ai_learningplatform.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 文章收藏实体类
 * @date: 2022-03-07 22:22
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Collect {
    //收藏id
    private int id;
    //收藏人ID
    private int collectId;
    //文章ID
    private int articleId;
    //发布人ID
    private int postId;
    // 标签ID
    private int labelId;
    //收藏时间
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    private Date collectTime;
}
