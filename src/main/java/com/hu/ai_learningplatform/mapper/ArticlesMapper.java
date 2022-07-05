package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.*;

import java.util.List;
import java.util.zip.Adler32;

public interface ArticlesMapper {
//    获取所有文章
    List<Articles> getAllArticles();
//    获取推荐文章
    List<Articles> getRecommendArticles();
//    获取一篇文章
    Articles getOneArticle(int id);
    //查询搜索文章
    List<Articles> getQueryArticle(String title);
//    阅读量+1
    int addReadNum(int id);
//    点赞量加一
    int addLikeNum(int id);
    //点赞量减1
    int deleteLikeNum(int id);
//    评论+1
    int addCommentNum(int id);
    //评论-1
    int deleteCommentNum(int id);
//    获取标签文章
    List<Articles> getLabelArticles(int labelId);
//    获取某人文章
    List<Articles> getAdminArticles(int adminId);
    //    获取查询的标签文章
    List<Articles> getQueryLabelArticles(int labelId,String title);
    //    获取查询的某人文章
    List<Articles> getQueryAdminArticles(int adminId,String title);
    //    获取查询的某人某标签文章
    List<Articles> getQueryAdminLabelArticles(int adminId,int labelId,String title);
//    更新文章信息
    int updateArticles(Articles article);
//    删除文章信息
    int deleteArticles(int id);
    //    删除文章信息
    int deleteAdminArticles(int adminId);
    //    删除文章信息
    int deleteLabelArticles(int labelId);
//    添加文章信息
    int addArticles(Articles articles);
}
