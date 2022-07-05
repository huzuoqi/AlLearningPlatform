package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.Comment;

import java.util.List;

public interface CommentMapper {

    //  添加评论
    int addComment(Comment comment);
    //  删除评论
    int deleteComment(int id);
    //  删除发布人文章的所有评论
    int deletePostComment(int postId);
    //  删除user评论
    int deleteUserComment(int userId);
    //  删除文章评论
    int deleteArticleComment(int articleId);
    //  查询一篇文章的评论
    List<Comment> getArticleComment(int articleId);
    //  查询包含text的评论
    List<Comment> getQueryAllComment(String text);
    //  查询某个评论
    Comment getOneComment(int id);
}
