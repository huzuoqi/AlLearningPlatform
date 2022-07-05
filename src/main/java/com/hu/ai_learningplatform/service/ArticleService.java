package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Comment;

import java.util.List;

public interface ArticleService {
    //    获取所有文章
    PageInfo<Articles> getAllArticles(int pageNum, int pageSize);
    //    获取推荐文章
    List<Articles> getRecommendArticles();
    //  获取查询文章
    PageInfo<Articles> getQueryArticles(int pageNum, int pageSize,String title);
    //    阅读量+1
    int addReadNum(int id);
    //    点赞量加一
    int addLikeNum(int id);
    //点赞量减一
    int deleteLikeNum(int id);
    //    评论+1
    int addCommentNum(int id);
    //评论-1
    int deleteCommentNum(int id);
    //    获取一篇文章
    Articles getOneArticle(int id);
    //    获取标签文章
    PageInfo<Articles> getLabelArticles(int pageNum, int pageSize,int labelId);
    //    获取某人文章
    PageInfo<Articles> getAdminArticles(int pageNum, int pageSize,int adminId);
    //    获取标签文章
    PageInfo<Articles> getQueryLabelArticles(int pageNum, int pageSize,int labelId,String title);
    //    获取某人文章
    PageInfo<Articles> getQueryAdminArticles(int pageNum, int pageSize,int adminId,String title);
    //    获取查询的某人某标签文章
    PageInfo<Articles> getQueryAdminLabelArticles(int pageNum, int pageSize,int adminId,int labelId,String title);
    //    更新文章信息
    int updateArticles(Articles articles);
    //    删除文章信息
    int deleteArticles(int id);
    //    添加文章信息
    int addArticles(Articles articles);
}
