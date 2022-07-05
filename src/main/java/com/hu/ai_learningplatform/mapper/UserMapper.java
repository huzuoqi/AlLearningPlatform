package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.Users;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

//@Mapper
public interface UserMapper {
    //查询用户名密码登陆
    Users getUserNameAndPassword(String userName);
    //获取用户基本信息
    Users getBaseInfo(int id);
    //获取所有用户
    List<Users> getQueryAllUsers(String name);
    //修改用户基本信息
    int updateBaseInfo(Users user);
    //更新用户基本信息
    int updatePassword(int id,String password);
    //注册用户
    int addUser(Users user);
    //删除用户
    int deleteUser(int id);
    //修改头像
    int updateAvatar(int id,String avatar);
}
