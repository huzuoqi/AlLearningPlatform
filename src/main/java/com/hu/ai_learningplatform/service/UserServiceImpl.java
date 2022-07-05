package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.mapper.CollectMapper;
import com.hu.ai_learningplatform.mapper.CommentMapper;
import com.hu.ai_learningplatform.mapper.FriendMapper;
import com.hu.ai_learningplatform.mapper.UserMapper;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.ForgetUser;
import com.hu.ai_learningplatform.pojo.Users;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 用户相关操作实体类
 * @date: 2022-03-08 20:50
 **/

@Service("userService")
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    CollectMapper collectMapper;

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    FriendMapper friendMapper;

    @Override
    public Users getUserNameAndPassword(String userName,String password) {
        Users loginUser = userMapper.getUserNameAndPassword(userName);
        if(loginUser == null||!Objects.equals(loginUser.getPassword(), password)){
            return null;
        }else {
            return loginUser;
        }
    }

    @Override
    public Users getBaseInfo(int id) {
        return userMapper.getBaseInfo(id);
    }

    @Override
    public PageInfo<Users> getQueryAllUsers(int pageNum, int pageSize,String name) {
        PageHelper.startPage(pageNum,pageSize);
        List<Users> lists = userMapper.getQueryAllUsers("\"%" +name+ "%\"");
        PageInfo<Users> pageInfo = new PageInfo<>(lists);
        System.out.println(pageInfo);
        return pageInfo;
    }

    @Override
    public boolean updateBaseInfo(Users user) {
        return userMapper.updateBaseInfo(user) > 0;
    }

    @Override
    public boolean updatePassword(ForgetUser forgetUser) {
        Users user = userMapper.getUserNameAndPassword(forgetUser.getUserName());
        if(!Objects.equals(user.getEmail(), forgetUser.getEmail())) {
            return false;
        }
        return userMapper.updatePassword(user.getId(), forgetUser.getPassword())>0;
    }

    @Override
    public boolean addUser(Users user) {
        Users testUser = userMapper.getUserNameAndPassword(user.getUserName());
        if(testUser!=null){
            return false;
        }
        return userMapper.addUser(user) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)//第一种方式
    public boolean deleteUser(int id){
        try {
            collectMapper.deleteUserCollect(id);
            commentMapper.deleteUserComment(id);
            friendMapper.deleteUserFriend(id);
            userMapper.deleteUser(id);
            return true;
        }catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//第二种方式
            log.info("新增异常:",e);
            return false;
        }
    }

    @Override
    public boolean sendMail(Map<String, Object> map) {
        Users user = userMapper.getUserNameAndPassword((String) map.get("userName"));
        if(user==null){
            return false;
        }else {
            return user.getEmail().equals(map.get("email")) ;
        }
    }

    @Override
    public int updateAvatar(int id,String avatar) {
        return userMapper.updateAvatar(id,avatar);
    }
}
