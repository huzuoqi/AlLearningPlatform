package com.hu.ai_learningplatform.controller;

import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Label;
import com.hu.ai_learningplatform.service.LabelService;
import com.hu.ai_learningplatform.service.LabelServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 标签控制层
 * @date: 2022-03-17 16:58
 **/
@Slf4j
@Controller
public class LabelController {

    @Autowired
    LabelServiceImpl labelService;

    @RequestMapping("/getalllabel")
    @ResponseBody
    public PageInfo<Label> getAllLabel(@RequestBody Map<String,Integer> map){
        return labelService.getAllLabel(map.get("pageNum"),map.get("pageSize"));
    }

    @RequestMapping(value = "/label")
    public String labelPage(){
        return "label";
    }

    @RequestMapping("/getOneLabel")
    @ResponseBody
    public Label getOneLabel(@RequestBody Map<String,Integer> map){
        return labelService.getOneLabel(map.get("id"));
    }

    @RequestMapping("/getQueryLabel")
    @ResponseBody
    public PageInfo<Label> getQueryLabel(@RequestBody Map<String,Object> map){
        return labelService.getQueryLabel(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()),(String) map.get("name"));
    }

    @RequestMapping(value = "/labelDetail")
    public String labelDetail(){
        return "labelDetail";
    }

    @RequestMapping(value = "/getLabelDetail")
    public String getLabelDetail(int id){
        return "redirect:/labelDetail?id="+id;
    }

    @RequestMapping("/deleteLabel")
    @ResponseBody
    public int deleteLabel(@RequestBody Map<String,Integer> map){
        return labelService.deleteLabel(map.get("id"));
    }

    @RequestMapping("/addLabel")
    @ResponseBody
    public int addLabel(@RequestBody Label label){
        return labelService.addLabel(label);
    }

    @RequestMapping("/updateLabel")
    @ResponseBody
    public int updateLabel(@RequestBody Label label){
        return labelService.updateLabel(label);
    }
}
