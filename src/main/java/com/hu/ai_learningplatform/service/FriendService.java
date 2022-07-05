package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Friends;

import java.util.List;

public interface FriendService {
    //获取所有关注
    PageInfo<Friends> getAllFriend(int pageNum,int pageSize);
    //获取一个人的所有关注
    PageInfo<Friends> getOneFriend(int pageNum,int pageSize,int userId);
    //获取查询的关注
    PageInfo<Friends> getQueryFriend(int pageNum,int pageSize,String name);
    //获取一个人查询的关注
    PageInfo<Friends> getOneQueryFriend(int pageNum,int pageSize,int userId,String name);
    //取消关注
    int deleteFriend(int id);
    //是否已经关注
    int existFriend(int userId,int friendId);
    //添加关注
    int addFriend(Friends friend);
    //获取管理员的关注数
    int getFriendNum(int adminId);
}
