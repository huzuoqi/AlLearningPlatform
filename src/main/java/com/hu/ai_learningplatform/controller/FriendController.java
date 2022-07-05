package com.hu.ai_learningplatform.controller;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Friends;
import com.hu.ai_learningplatform.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 关注控制类
 * @date: 2022-04-11 17:21
 **/
@Controller
@Slf4j
public class FriendController {

    @Autowired
    FriendService friendService;

    @RequestMapping("/getAllFriend")
    @ResponseBody
    public PageInfo<Friends> getAllFriend(@RequestBody Map<String,Integer> map){
        return friendService.getAllFriend(map.get("pageNum"),map.get("pageSize"));
    }

    @RequestMapping("/getOneFriend")
    @ResponseBody
    public PageInfo<Friends> getOneFriend(@RequestBody Map<String,Integer> map){
        return friendService.getOneFriend(map.get("pageNum"),map.get("pageSize"),map.get("userId"));
    }

    @RequestMapping("/getQueryFriend")
    @ResponseBody
    public PageInfo<Friends> getQueryFriend(@RequestBody Map<String,Object> map){
        return friendService.getQueryFriend(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()),(String)map.get("name"));
    }

    @RequestMapping("/getOneQueryFriend")
    @ResponseBody
    public PageInfo<Friends> getOneQueryFriend(@RequestBody Map<String,Object> map){
        return friendService.getOneQueryFriend(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()), Integer.parseInt(map.get("userId").toString()),(String)map.get("name"));
    }

    @RequestMapping("/friend")
    public String friend(){
        return "friend";
    }

    @RequestMapping("/deleteFriend")
    @ResponseBody
    public int deleteFriend(@RequestBody Map<String,Integer> map){
        return friendService.deleteFriend(map.get("id"));
    }

    @RequestMapping("/addFriend")
    @ResponseBody
    public int addFriend(@RequestBody Friends friend){
        return friendService.addFriend(friend);
    }

    @RequestMapping("/existFriend")
    @ResponseBody
    public int existFriend(@RequestBody Map<String,Integer> map){
        return friendService.existFriend(map.get("userId"),map.get("friendId"));
    }

    @RequestMapping("/getFriendNum")
    @ResponseBody
    public int getFriendNum(@RequestBody Map<String,Integer> map){
        return friendService.getFriendNum(map.get("adminId"));
    }
}
