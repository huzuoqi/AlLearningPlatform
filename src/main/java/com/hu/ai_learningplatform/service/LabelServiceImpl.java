package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.LabelMapper;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Label;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 标签业务
 * @date: 2022-03-17 16:46
 **/
@Service("labelService")
public class LabelServiceImpl implements LabelService {

    @Autowired
    LabelMapper labelMapper;

    @Override
    public PageInfo<Label> getAllLabel(int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Label> lists = labelMapper.getAllLabel();
        PageInfo<Label> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Label> getQueryLabel(int pageNum, int pageSize, String name) {
        PageHelper.startPage(pageNum,pageSize);
        List<Label> lists = labelMapper.getQueryLabel("\"%" +name+ "%\"");
        PageInfo<Label> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public Label getOneLabel(int id) {
        return labelMapper.getOneLabel(id);
    }

    @Override
    public int updateLabel(Label label) {
        return labelMapper.updateLabel(label);
    }

    @Override
    public int deleteLabel(int id) {
        return labelMapper.deleteLabel(id);
    }

    @Override
    public int addLabel(Label label) { return labelMapper.addLabel(label); }
}
