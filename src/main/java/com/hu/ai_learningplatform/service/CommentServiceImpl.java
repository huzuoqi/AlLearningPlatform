package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.CommentMapper;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 评论业务类
 * @date: 2022-04-09 18:45
 **/
@Service("commentService")
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentMapper commentMapper;

    @Override
    public int addComment(Comment comment) {
        return commentMapper.addComment(comment);
    }

    @Override
    public int deleteComment(int id) {
        return commentMapper.deleteComment(id);
    }

    @Override
    public List<Comment> getArticleComment(int articleId) {
        List<Comment> lists = commentMapper.getArticleComment(articleId);
        Map<Integer, Comment> map = new HashMap<>();
        List<Comment> result = new ArrayList<>();
        for (Comment c : lists) {
            if ((c.getParentId())==0) {
                result.add(c);
            }
            map.put(c.getId(), c);
        }
        for (Comment c : lists) {
            if (c.getParentId() != 0) {
                Comment parent = map.get(c.getParentId());
                if (parent.getChild() == null) {
                    parent.setChild(new ArrayList<>());
                }
                parent.getChild().add(c);
            }
        }
        return result;
    }

    @Override
    public PageInfo<Comment> getQueryAllComment(int pageNum, int pageSize, String text) {
        PageHelper.startPage(pageNum,pageSize);
        List<Comment> lists = commentMapper.getQueryAllComment("\"%" +text+ "%\"");
        PageInfo<Comment> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public Comment getOneComment(int id) {
        return commentMapper.getOneComment(id);
    }
}
