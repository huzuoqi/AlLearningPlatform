package com.hu.ai_learningplatform.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 类别实体类
 * @date: 2022-03-07 22:34
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Label {
    //分类id
    private int id;
    //类别名
    private String labelName;
    //类别别名
    private String labelNick;
    //类别描述
    private String labelDescribe;
}
