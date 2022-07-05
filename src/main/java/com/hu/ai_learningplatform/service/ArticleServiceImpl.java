package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.ArticlesMapper;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 文章业务
 * @date: 2022-03-16 15:53
 **/
@Service("articleService")
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    ArticlesMapper articlesMapper;

    @Override
    public PageInfo<Articles> getAllArticles(int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getAllArticles();
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public List<Articles> getRecommendArticles() {
        return articlesMapper.getRecommendArticles();
    }

    @Override
    public PageInfo<Articles> getQueryArticles(int pageNum, int pageSize, String title) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getQueryArticle("\"%" +title+ "%\"");
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public int addReadNum(int id) {
        return articlesMapper.addReadNum(id);
    }

    @Override
    public int addLikeNum(int id) {
        return articlesMapper.addLikeNum(id);
    }

    @Override
    public int deleteLikeNum(int id) {
       return  articlesMapper.deleteLikeNum(id);
    }

    @Override
    public int addCommentNum(int id) {
        return articlesMapper.addCommentNum(id);
    }

    @Override
    public int deleteCommentNum(int id) {
        return articlesMapper.deleteCommentNum(id);
    }

    @Override
    public Articles getOneArticle(int id) {
        return articlesMapper.getOneArticle(id);
    }

    @Override
    public PageInfo<Articles> getLabelArticles(int pageNum, int pageSize,int labelId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getLabelArticles(labelId);
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Articles> getAdminArticles(int pageNum, int pageSize,int adminId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getAdminArticles(adminId);
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Articles> getQueryLabelArticles(int pageNum, int pageSize, int labelId, String title) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getQueryLabelArticles(labelId,"\"%" +title+ "%\"");
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Articles> getQueryAdminArticles(int pageNum, int pageSize, int adminId, String title) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists = articlesMapper.getQueryAdminArticles(adminId,"\"%" +title+ "%\"");
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Articles> getQueryAdminLabelArticles(int pageNum, int pageSize,int adminId, int labelId, String title) {
        PageHelper.startPage(pageNum,pageSize);
        List<Articles> lists;
        if(labelId==0) {
            lists = articlesMapper.getQueryAdminArticles(adminId,"\"%" +title+ "%\"");
        }else {
            lists = articlesMapper.getQueryAdminLabelArticles(adminId, labelId, "\"%" + title + "%\"");
        }
        PageInfo<Articles> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public int updateArticles(Articles articles) {
        return articlesMapper.updateArticles(articles);
    }

    @Override
    public int deleteArticles(int id) {
        return articlesMapper.deleteArticles(id);
    }

    @Override
    public int addArticles(Articles articles) {
        return articlesMapper.addArticles(articles);
    }
}
