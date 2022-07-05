package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.*;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Articles;
import com.hu.ai_learningplatform.pojo.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 管理员业务类
 * @date: 2022-03-17 16:50
 **/
@Service("adminService")
@Slf4j
public class AdminServiceImpl implements AdminService{

    @Autowired
    AdminMapper adminMapper;

    @Autowired
    FriendMapper friendMapper;

    @Autowired
    CollectMapper collectMapper;

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    ArticlesMapper articlesMapper;

    @Override
    public PageInfo<Admin> getAllAdmin(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Admin> lists = adminMapper.getAllAdmin();
        PageInfo<Admin> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public PageInfo<Admin> getQueryAdmin(int pageNum, int pageSize, String name) {
        PageHelper.startPage(pageNum,pageSize);
        List<Admin> lists = adminMapper.getQueryAdmin("\"%" +name+ "%\"");
        PageInfo<Admin> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public Admin getOneAdmin(int id) {
        return adminMapper.getOneAdmin(id);
    }

    @Override
    public Admin adminLogin(String adminName, String adminPassword) {
        Admin admin = adminMapper.adminLogin(adminName);
        if(Objects.equals(admin.getPassword(), adminPassword)){
            return admin;
        }else {
            return null;
        }
    }

    @Override
    public int updateAdmin(Admin admin) {
        return adminMapper.updateAdmin(admin);
    }

    @Override
    public boolean deleteAdmin(int id) {
        try {
            collectMapper.deleteAdminCollect(id);
            friendMapper.deleteAdminFriend(id);
            articlesMapper.deleteAdminArticles(id);
            commentMapper.deletePostComment(id);
            adminMapper.deleteAdmin(id);
            return true;
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//第二种方式
            log.info("新增异常:",e);
            return false;
        }
    }

    @Override
    public int addAdmin(Admin admin) {
        return adminMapper.addAdmin(admin);
    }

    @Override
    public int updateAdminAvatar(int id, String avatar) {
        return adminMapper.updateAdminAvatar(id,avatar);
    }

    @Override
    public boolean sendAdminMail(Map<String, Object> map) {
        Admin admin = adminMapper.adminLogin((String) map.get("adminName"));
        if(admin==null){
            return false;
        }else {
            return admin.getEmail().equals(map.get("email")) ;
        }
    }

    @Override
    public int updateAdminPassword(String adminName, String password) {
        return adminMapper.updateAdminPassword(adminName,password);
    }

}
