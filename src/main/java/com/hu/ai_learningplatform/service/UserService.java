package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.ForgetUser;
import com.hu.ai_learningplatform.pojo.Users;

import java.util.Map;

public interface UserService {
    //查询用户名密码登陆
    public Users getUserNameAndPassword(String userName,String password);
    //获取用户基本信息
    public Users getBaseInfo(int id);
    //获取所有用户
    PageInfo<Users> getQueryAllUsers(int pageNum, int pageSize,String name);
    //修改用户基本信息
    public boolean updateBaseInfo(Users user);
    //更新用户基本信息
    public boolean updatePassword(ForgetUser forgetUser);
    //注册用户
    public boolean addUser(Users user);
    //删除用户
    public boolean deleteUser(int id);
    //验证邮箱
    public boolean sendMail(Map<String,Object> map);
    //修改头像
    int updateAvatar(int id,String avatar);
}
