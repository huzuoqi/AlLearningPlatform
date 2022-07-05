package com.hu.ai_learningplatform.mapper;

import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Collect;
import com.hu.ai_learningplatform.pojo.Label;

import java.util.List;

public interface CollectMapper {
    //  添加收藏
    int addCollect(Collect collect);
    //  删除收藏
    int deleteCollect(int id);
    //  删除某人的收藏
    int deleteUserCollect(int userId);
    //  删除管理员有关收藏
    int deleteAdminCollect(int adminId);
    //  删除标签有关的收藏
    int deleteLabelCollect(int labelId);
    //检查是否存在收藏
    Collect existCollect(int collectId,int articleId);
    // 获取一个人的所有收藏
    List<Collect> getOneCollect(int collectId);
    //  获取所有收藏
    List<Collect> getAllCollect();
    //  获取收藏标签
    List<Label> getCollectLabel(int collectId);
    //  获取收藏发布人
    List<Admin> getCollectPostUser(int collectId);
    // 获取一个人的对某个人的所有收藏
    List<Collect> getCollectByPostUser(int collectId,int postId);
    // 获取一个人对某个标签的所有收藏
    List<Collect> getCollectByLabel(int collectId,int labelId);
}