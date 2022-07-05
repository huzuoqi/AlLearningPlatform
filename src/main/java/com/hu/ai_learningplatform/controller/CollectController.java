package com.hu.ai_learningplatform.controller;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.*;
import com.hu.ai_learningplatform.service.CollectServiceImpl;
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
 * @description: 收藏控制类
 * @date: 2022-04-08 22:23
 **/
@Slf4j
@Controller
public class CollectController {

    @Autowired
    CollectServiceImpl collectService;

    @RequestMapping(value = "/collect")
    public String collectPage(){
        return "collect";
    }

    @RequestMapping(value = "/addCollect")
    @ResponseBody
    public int addCollect(@RequestBody Collect collect) {
        return collectService.addCollect(collect);
    }

    @RequestMapping(value = "/deleteCollect")
    @ResponseBody
    public int deleteCollect(@RequestBody Map<String,Integer>map) {
        return collectService.deleteCollect(map.get("id"));
    }

    @RequestMapping(value = "/existCollect")
    @ResponseBody
    public int existCollect(@RequestBody Map<String,Integer>map) {
        return collectService.existCollect(map.get("collectId"),map.get("articleId"));
    }

    @RequestMapping(value = "/getOneCollect")
    @ResponseBody
    public PageInfo<Collect> getOneCollect(@RequestBody Map<String,Integer>map) {
        return collectService.getOneCollect(map.get("pageNum"),map.get("pageSize"),map.get("collectId"));
    }

    @RequestMapping(value = "/getCollectLabel")
    @ResponseBody
    public List<Label> getCollectLabel(@RequestBody Map<String,Integer>map) {
        return collectService.getCollectLabel(map.get("collectId"));
    }

    @RequestMapping(value = "/getCollectPostUser")
    @ResponseBody
    public List<Admin> getCollectPostUser(@RequestBody Map<String,Integer>map) {
        return collectService.getCollectPostUser(map.get("collectId"));
    }

    @RequestMapping(value = "/getCollectByLabel")
    @ResponseBody
    public PageInfo<Collect> getCollectByLabel(@RequestBody Map<String,Integer>map) {
        return collectService.getCollectByLabel(map.get("pageNum"),map.get("pageSize"),map.get("collectId"),map.get("labelId"));
    }

    @RequestMapping(value = "/getCollectByPostUser")
    @ResponseBody
    public PageInfo<Collect> getCollectByPostUser(@RequestBody Map<String,Integer>map) {
        return collectService.getCollectByPostUser(map.get("pageNum"),map.get("pageSize"),map.get("collectId"),map.get("postId"));
    }

}
