package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.FriendMapper;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Friends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 关注业务类
 * @date: 2022-04-11 17:18
 **/
@Service("friendService")
public class FriendServiceImpl implements FriendService{

    @Autowired
    FriendMapper friendMapper;

    @Override
    public PageInfo<Friends> getAllFriend(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Friends> lists = friendMapper.getAllFriend();
        PageInfo<Friends> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Friends> getOneFriend(int pageNum, int pageSize, int userId) {
        PageHelper.startPage(pageNum,pageSize);
        List<Friends> lists = friendMapper.getOneFriend(userId);
        PageInfo<Friends> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Friends> getQueryFriend(int pageNum, int pageSize, String name) {
        PageHelper.startPage(pageNum,pageSize);
        List<Friends> lists = friendMapper.getQueryFriend("\"%" +name+ "%\"");
        PageInfo<Friends> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Friends> getOneQueryFriend(int pageNum, int pageSize, int userId, String name) {
        PageHelper.startPage(pageNum,pageSize);
        List<Friends> lists = friendMapper.getOneQueryFriend(userId,"\"%" +name+ "%\"");
        PageInfo<Friends> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public int deleteFriend(int id) {
        return friendMapper.deleteFriend(id);
    }

    @Override
    public int existFriend(int userId, int friendId) {
        Friends friend = friendMapper.existFriend(userId,friendId);
        if(friend != null){
            return friend.getId();
        }else {
            return 0;
        }
    }

    @Override
    public int addFriend(Friends friend) {
        return friendMapper.addFriend(friend);
    }

    @Override
    public int getFriendNum(int adminId) {
        return friendMapper.getFriendNum(adminId);
    }
}
