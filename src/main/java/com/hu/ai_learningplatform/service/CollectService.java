package com.hu.ai_learningplatform.service;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Label;

import java.util.List;

public interface CollectService {
    //  添加收藏
    int addCollect(Collect collect);
    //  删除收藏
    int deleteCollect(int id);
    // 获取一个人的所有收藏
    PageInfo<Collect> getOneCollect(int pageNum, int pageSize, int collectId);
    //  获取所有收藏
    PageInfo<Collect> getAllCollect(int pageNum,int pageSize);
    //检查是否存在收藏
    int existCollect(int collectId,int articleId);
    //  获取收藏标签
    List<Label> getCollectLabel(int collectId);
    //  获取收藏发布人
    List<Admin> getCollectPostUser(int collectId);
    // 获取一个人的对某个人的所有收藏
    PageInfo<Collect> getCollectByPostUser(int pageNum, int pageSize,int collectId,int postId);
    // 获取一个人对某个标签的所有收藏
    PageInfo<Collect> getCollectByLabel(int pageNum, int pageSize,int collectId,int labelId);
}
