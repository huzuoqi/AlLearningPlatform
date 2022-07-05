package com.hu.ai_learningplatform.controller;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Comment;
import com.hu.ai_learningplatform.service.CommentServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 评论控制类
 * @date: 2022-04-09 18:48
 **/
@Controller
@Slf4j
public class CommentController {

    @Autowired
    CommentServiceImpl commentService;

    @RequestMapping(value = "/addComment")
    @ResponseBody
    public int addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @RequestMapping(value = "/deleteComment")
    @ResponseBody
    public int deleteComment(@RequestBody Map<String,Integer>map) {
        return commentService.deleteComment(map.get("id"));
    }


    @RequestMapping(value = "/getArticleComment")
    @ResponseBody
    public List<Comment> getArticleComment(@RequestBody Map<String,Integer>map) {
        return commentService.getArticleComment(map.get("articleId"));
    }

    @RequestMapping(value = "/getOneComment")
    @ResponseBody
    public Comment getOneComment(@RequestBody Map<String,Integer> map) {
        return commentService.getOneComment(map.get("id"));
    }

    @RequestMapping(value = "/getQueryAllComment")
    @ResponseBody
    public PageInfo<Comment> getQueryAllComment(@RequestBody Map<String,Object> map) {
        return commentService.getQueryAllComment(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()),(String) map.get("text"));
    }
}
