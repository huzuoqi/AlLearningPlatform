package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Comment;

import java.util.List;

public interface CommentService {
    //  添加评论
    int addComment(Comment comment);
    //  删除评论
    int deleteComment(int id);
    //  查询一篇文章的评论
    List<Comment> getArticleComment(int articleId);
    //  查询包含text的评论
    PageInfo<Comment> getQueryAllComment(int pageNum,int pageSize,String text);
    //  查询某个评论
    Comment getOneComment(int id);
}
