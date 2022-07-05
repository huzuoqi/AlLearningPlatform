package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Admin;
import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.List;
import java.util.Map;

public interface AdminService {
    //获取管理员列表
    PageInfo<Admin> getAllAdmin(int pageNum,int pageSize);
    //获取查询管理员
    PageInfo<Admin> getQueryAdmin(int pageNum,int pageSize,String name);
    //获取指定管理员
    Admin getOneAdmin(int id);
    //管理员登陆
    Admin adminLogin(String adminName, String adminPassword);
    //更新管理员密码
    int updateAdmin(Admin admin);
    //删除管理员
    boolean deleteAdmin(int id);
    //添加管理员
    int addAdmin(Admin admin);
    //更新用户头像
    int updateAdminAvatar(int id,String avatar);
    //更新用户密码
    int updateAdminPassword(String adminName,String password);
    //发送邮件
    boolean sendAdminMail(Map<String,Object> map);
}
