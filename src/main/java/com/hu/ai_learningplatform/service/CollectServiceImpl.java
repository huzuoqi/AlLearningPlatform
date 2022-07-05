package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.CollectMapper;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Label;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 收藏列表业务
 * @date: 2022-04-08 22:16
 **/
@Service("collectService")
public class CollectServiceImpl implements CollectService{

    @Autowired
    CollectMapper collectMapper;

    @Override
    public int addCollect(Collect collect) {
        return collectMapper.addCollect(collect);
    }

    @Override
    public int deleteCollect(int id) {
        return collectMapper.deleteCollect(id);
    }

    @Override
    public PageInfo<Collect> getOneCollect(int pageNum,int pageSize,int collectId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Collect> lists = collectMapper.getOneCollect(collectId);
        PageInfo<Collect> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Collect> getAllCollect(int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Collect> lists = collectMapper.getAllCollect();
        PageInfo<Collect> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public int existCollect(int collectId, int articleId) {
        Collect collect = collectMapper.existCollect(collectId,articleId);
        if (collect !=null){
            return collect.getId();
        }else {
            return 0;
        }
    }

    @Override
    public List<Label> getCollectLabel(int collectId) {
        return collectMapper.getCollectLabel(collectId);
    }

    @Override
    public List<Admin> getCollectPostUser(int collectId) {
        return collectMapper.getCollectPostUser(collectId);
    }

    @Override
    public PageInfo<Collect> getCollectByPostUser(int pageNum, int pageSize,int collectId, int postId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Collect> lists = collectMapper.getCollectByPostUser(collectId,postId);
        PageInfo<Collect> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Collect> getCollectByLabel(int pageNum, int pageSize,int collectId, int labelId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Collect> lists = collectMapper.getCollectByLabel(collectId,labelId);
        PageInfo<Collect> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }
}
