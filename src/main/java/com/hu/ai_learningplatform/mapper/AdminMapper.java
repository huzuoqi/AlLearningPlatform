package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.Admin;

import java.util.List;

public interface AdminMapper {
    //获取管理员列表
    List<Admin> getAllAdmin();
    //获取查询管理员
    List<Admin> getQueryAdmin(String name);
    //获取指定管理员
    Admin getOneAdmin(int id);
    //管理员登陆
    Admin adminLogin(String adminName);
    //更新管理员密码
    int updateAdmin(Admin admin);
    //删除管理员
    int deleteAdmin(int id);
    //添加管理员
    int addAdmin(Admin admin);
     //更新用户头像
    int updateAdminAvatar(int id,String avatar);
    //更新用户密码
    int updateAdminPassword(String adminName,String password);
}
