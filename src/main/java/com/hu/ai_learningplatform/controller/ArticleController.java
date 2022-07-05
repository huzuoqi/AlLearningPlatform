package com.hu.ai_learningplatform.controller;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Users;
import com.hu.ai_learningplatform.service.ArticleServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 文章控制类
 * @date: 2022-03-16 15:56
 **/
@Slf4j
@Controller
public class ArticleController {
    @Autowired
    ArticleServiceImpl articleService;

    @RequestMapping("/getallarticles")
    @ResponseBody
    public PageInfo<Articles> getAllArticles(@RequestBody Map<String,Integer> map){
        return articleService.getAllArticles(map.get("pageNum"),map.get("pageSize"));
    }

    @RequestMapping("/getQueryArticles")
    @ResponseBody
    public PageInfo<Articles> getQueryArticles(@RequestBody Map<String,Object> map){
        return articleService.getQueryArticles(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()),(String)map.get("title"));
    }

    @RequestMapping("/getLabelArticles")
    @ResponseBody
    public PageInfo<Articles> getlabelArticles(@RequestBody Map<String,Integer> map){
        return articleService.getLabelArticles(map.get("pageNum"),map.get("pageSize"),map.get("labelId"));
    }

    @RequestMapping("/getAdminArticles")
    @ResponseBody
    public PageInfo<Articles> getAdminArticles(@RequestBody Map<String,Integer> map){
        return articleService.getAdminArticles(map.get("pageNum"),map.get("pageSize"),map.get("adminId"));
    }

    @RequestMapping("/getQueryLabelArticles")
    @ResponseBody
    public PageInfo<Articles> getQueryLabelArticles(@RequestBody Map<String,Object> map){
        return articleService.getQueryLabelArticles(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()), Integer.parseInt(map.get("labelId").toString()),(String) map.get("title"));
    }

    @RequestMapping("/getQueryAdminArticles")
    @ResponseBody
    public PageInfo<Articles> getQueryAdminArticles(@RequestBody Map<String,Object> map){
        return articleService.getQueryAdminArticles(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()), Integer.parseInt(map.get("adminId").toString()),(String) map.get("title"));
    }

    @RequestMapping("/getQueryAdminLabelArticles")
    @ResponseBody
    public PageInfo<Articles> getQueryAdminLabelArticles(@RequestBody Map<String,Object> map){
        return articleService.getQueryAdminLabelArticles(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()), Integer.parseInt(map.get("adminId").toString()),Integer.parseInt(map.get("labelId").toString()),(String) map.get("title"));
    }

    @RequestMapping("/getrecommendarticles")
    @ResponseBody
    public List<Articles> getRecommendArticles(){
        return articleService.getRecommendArticles();
    }

    @RequestMapping(value = "/getArticleDetail")
    public String getArticleDetail(int id){
        return "redirect:/articleDetail?id="+id;
    }

    @RequestMapping(value = "/articleDetail")
    public String articleDetail(){
        return "articleDetail";
    }

    @RequestMapping("/getOneArticle")
    @ResponseBody
    public Articles getOneArticle(@RequestBody Map<String,Integer> map){
        return articleService.getOneArticle(map.get("id"));
    }

    @RequestMapping("/addReadNum")
    @ResponseBody
    public int addReadNum(@RequestBody Map<String,Integer> map){
        return articleService.addReadNum(map.get("id"));
    }

    @RequestMapping("/addLikeNum")
    @ResponseBody
    public int addLikeNum(@RequestBody Map<String,Integer> map){
        return articleService.addLikeNum(map.get("id"));
    }

    @RequestMapping("/addCommentNum")
    @ResponseBody
    public int addCommentNum(@RequestBody Map<String,Integer> map){
        return articleService.addCommentNum(map.get("id"));
    }

    @RequestMapping("/deleteCommentNum")
    @ResponseBody
    public int deleteCommentNum(@RequestBody Map<String,Integer> map){
        return articleService.deleteCommentNum(map.get("id"));
    }

    @RequestMapping("/deleteLikeNum")
    @ResponseBody
    public int deleteLikeNum(@RequestBody Map<String,Integer> map){
        return articleService.deleteLikeNum(map.get("id"));
    }

    @RequestMapping("/adminArticle")
    public String adminArticle(){
        return "admin/adminArticle";
    }

    @RequestMapping("/deleteArticle")
    @ResponseBody
    public int deleteArticle(@RequestBody Map<String,Integer> map){
        return articleService.deleteArticles(map.get("id"));
    }

    @RequestMapping("/addArticle")
    @ResponseBody
    public int addArticle(@RequestBody Articles articles){
        return articleService.addArticles(articles);
    }

    @RequestMapping("/updateArticle")
    @ResponseBody
    public int updateArticle(@RequestBody Articles articles){
        return articleService.updateArticles(articles);
    }
}
