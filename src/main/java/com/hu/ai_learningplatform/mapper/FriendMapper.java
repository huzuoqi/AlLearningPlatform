package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.Friends;

import java.util.List;

public interface FriendMapper {

    //获取所有关注
    List<Friends> getAllFriend();
    //获取一个人的所有关注
    List<Friends> getOneFriend(int userId);
    //获取查询的关注
    List<Friends> getQueryFriend(String name);
    //获取查询的关注
    List<Friends> getOneQueryFriend(int userId,String name);
    //取消关注
    int deleteFriend(int id);
    //取消关注
    int deleteUserFriend(int userId);
    //取消关注
    int deleteAdminFriend(int adminId);
    //是否已经关注
    Friends existFriend(int userId,int friendId);
    //添加关注
    int addFriend(Friends friend);
    //获取管理员的关注数
    int getFriendNum(int adminId);

}
