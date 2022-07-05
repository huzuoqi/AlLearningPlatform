package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Label;

import java.util.List;

public interface LabelService {

    //获取所有标签
    PageInfo<Label> getAllLabel(int pageNum, int pageSize);
    //获取所有标签
    PageInfo<Label> getQueryLabel(int pageNum, int pageSize,String name);
    //获取指定标签
    Label getOneLabel(int id);
    //更新一个标签
    int updateLabel(Label label);
    //删除一个标签
    int deleteLabel(int id);
    //添加一个标签
    int addLabel(Label label);

}
