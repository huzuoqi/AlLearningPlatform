package com.hu.ai_learningplatform.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.Users;
import com.hu.ai_learningplatform.service.AdminServiceImpl;
import com.hu.ai_learningplatform.service.MailService;
import com.hu.ai_learningplatform.utils.LoginMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 管理员控制层
 * @date: 2022-03-17 17:01
 **/
@Slf4j
@Controller
public class AdminController {

    @Autowired
    AdminServiceImpl adminService;

    @Autowired
    MailService mailService;

    //验证码
    Map<String,String> confirm = new HashMap<>();

    /**上传地址*/
    @Value("${file.upload.path}")
    private String filePath;

    @RequestMapping("getalladmin")
    @ResponseBody
    public PageInfo<Admin> getAllAdmin(@RequestBody Map<String,Integer> map){
        return adminService.getAllAdmin(map.get("pageNum"),map.get("pageSize"));
    }

    @RequestMapping(value = "/postUser")
    public String postUserPage(){
        return "postUser";
    }

    @RequestMapping(value = "/aboutMe")
    public String aboutMePage(){
        return "aboutMe";
    }

    @RequestMapping(value = "/getQueryPostUser")
    @ResponseBody
    public PageInfo<Admin> getQueryPostUser(@RequestBody Map<String,Object> map){
        return adminService.getQueryAdmin(Integer.parseInt(map.get("pageNum").toString()),Integer.parseInt(map.get("pageSize").toString()),(String)map.get("name"));
    }

    @RequestMapping(value = "/postUserDetail")
    public String postUserDetail(){
        return "postUserDetail";
    }

    @RequestMapping(value = "/getPostUserDetail")
    public String getPostUserDetail(int id){
        return "redirect:/postUserDetail?id="+id;
    }

    @RequestMapping(value = "/getOneAdmin")
    @ResponseBody
    public Admin getOneAdmin(@RequestBody Map<String,Integer> map){
        return adminService.getOneAdmin(map.get("id"));
    }

    @RequestMapping(value = "/addAdmin")
    @ResponseBody
    public int addAdmin(@RequestBody Admin admin){
        return adminService.addAdmin(admin);
    }

    @RequestMapping(value = "/updateAdminInfo")
    @ResponseBody
    public Map<String,String> updateAdmin(@RequestBody Admin admin,HttpSession session){
        Map<String,String> map = new HashMap<>();
        int ok = adminService.updateAdmin(admin);
        System.err.println(admin);
        if (ok>0) {
            map.put("code","1");
            map.put("msg", "修改成功");
            log.info("修改成功，账号：" + admin.getAdminName());
        } else {
            map.put("code","0");
            map.put("msg", "修改失败");
            log.info("修改失败");
        }
        Admin loginAdmin = (Admin) session.getAttribute("loginAdmin");
        loginAdmin.setAge(admin.getAge());
        loginAdmin.setBirthday(admin.getBirthday());
        loginAdmin.setEmail(admin.getEmail());
        loginAdmin.setTelephone(admin.getTelephone());
        session.setAttribute("loginAdmin",loginAdmin);
        return map;
    }

    @RequestMapping(value = "/updateAdminAvatar")
    @ResponseBody
    public int updateAdminAvatar(@RequestBody Map<String,Object> map){
        return adminService.updateAdminAvatar((Integer) map.get("id"),(String) map.get("avatar"));
    }

    @RequestMapping(value = "/adminLogin")
    @ResponseBody
    public Map<String, String> adminLogin(@RequestBody Map<String,String> map, HttpSession session){
        Admin admin = adminService.adminLogin(map.get("adminName"),map.get("adminPassword"));
        Map<String,String> msg = new HashMap<>();
        if(admin!=null){
            msg.put("code","1");
            msg.put("msg","登陆成功!");
            session.setAttribute("loginAdmin",admin);
            if(Objects.equals(map.get("adminName"), "admin")) {
                session.setAttribute("power", "1");
            }else {
                session.setAttribute("power","0");
            }
            log.info("登陆成功，账号：" + admin.getAdminName());
        }else {
            msg.put("code","0");
            msg.put("msg","账户或密码错误!");
            log.info("账户或密码错误!");
        }
        return msg;
    }

    @RequestMapping(value = "/toAdminLogin")
    public String toAdminLogin(){
        return "admin/adminLogin";
    }

    @RequestMapping(value = "/toAdminRegister")
    public String toAdminRegister(){
        return "admin/adminRegister";
    }

    @RequestMapping(value = "/adminRegister")
    @ResponseBody
    public Map<String, String> adminRegister(@RequestBody Admin admin){
        Map<String,String> msg = new HashMap<>();
        int result = adminService.addAdmin(admin);
        if(result>0){
            msg.put("code", String.valueOf(1));
            msg.put("msg","注册成功!");
            log.info("注册成功，账号：" + admin.getAdminName());
        }else {
            msg.put("code", String.valueOf(0));
            msg.put("msg","注册失败！");
            log.info("注册失败！");
        }
        return msg;
    }

    @RequestMapping(value = "/toAdminForget")
    public String toAdminForget(){
        return "admin/adminForget";
    }

    @RequestMapping(value = "/adminForget")
    @ResponseBody
    public Map<String, String> adminForget(@RequestBody Map<String,String> map){
        Map<String,String> msg = new HashMap<>();
        if(!Objects.equals(confirm.get(map.get("email")), map.get("confirm"))){
            msg.put("code", String.valueOf(0));
            msg.put("msg", "验证码错误");
            log.info("验证码错误");
        }else {
            int result = adminService.updateAdminPassword(map.get("adminName"),map.get("password"));
            if (result > 0) {
                msg.put("code", String.valueOf(1));
                msg.put("msg", "重置密码成功!");
                log.info("重置密码成功，账号：" + map.get("adminName"));
            } else {
                msg.put("code", String.valueOf(0));
                msg.put("msg", "重置密码失败！");
                log.info("重置密码失败！");
            }
        }
        return msg;
    }

    @RequestMapping("/adminMail")
    @ResponseBody
    public Map<String, String> sendAdminMail(@RequestBody Map<String,Object> mail){
        Map<String,String> map = new HashMap<>();
        boolean ok = adminService.sendAdminMail(mail);
        if(ok){
            try {
                confirm.put((String) mail.get("email"), String.valueOf(Math.round((Math.random()+1) * 1000)));
                System.out.println(confirm.get((String) mail.get("email")));
                mailService.sendSimpleTextMailActual("验证码", confirm.get((String) mail.get("email")), URLDecoder.decode((String) mail.get("email"),"utf-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                map.put("code","0");
                map.put("msg", "发送失败");
                log.info("发送失败");
                return map;
            }
            map.put("code","1");
            map.put("msg", "发送成功");
            log.info("发送邮件成功，账号：" + mail.get("adminName"));
        }else {
            map.put("code","0");
            map.put("msg", "账号邮箱不匹配");
            log.info("账号邮箱不匹配");
        }
        return map;
    }

    @RequestMapping(value = "/getAdminSession")
    public void getAdminSession(HttpServletRequest request, HttpServletResponse response)throws Exception{
        //先从session中获取到之前存在session中的用户信息，然后通过ObjectMapper输出返回一个json数据给html页面，由页面去解析这个json数据
        Admin admin=(Admin)request.getSession().getAttribute("loginAdmin");
        System.out.println(admin);
        if(admin!=null){
            ObjectMapper objectMapper=new ObjectMapper();
            objectMapper.writeValue(response.getOutputStream(),admin);
        }
    }

    @RequestMapping(value = "/adminLogout")
    public String adminLogout(HttpSession session){
        session.removeAttribute("loginAdmin");
        session.removeAttribute("power");
        return "admin/adminLogin";
    }

    @RequestMapping(value = "/adminUser")
    public String adminUser(){
        return "admin/adminUser";
    }

    @RequestMapping(value = "/adminPostUser")
    public String adminPostUser(){
        return "admin/adminPostUser";
    }

    @RequestMapping(value = "/adminLabel")
    public String adminLabel(){
        return "admin/adminLabel";
    }

    @RequestMapping(value = "/adminComment")
    public String adminComment(){
        return "admin/adminComment";
    }

    @RequestMapping(value = "/adminDetail")
    public String adminDetail(){
        return "admin/adminDetail";
    }

    @RequestMapping(value = "/updateAdmin")
    public String updateAdmin(){
        return "admin/updateAdmin";
    }

    @RequestMapping(value = "/deleteAdminPostUser")
    @ResponseBody
    public boolean deleteAdminPostUser(@RequestBody Map<String,Integer> map){
        return adminService.deleteAdmin(map.get("id"));
    }

    @RequestMapping(value = "/confirmAdminPassword")
    @ResponseBody
    public boolean confirmAdminPassword(@RequestBody Map<String,String> map, HttpSession session){
        Admin admin = (Admin) session.getAttribute("loginAdmin");
        return Objects.equals(admin.getPassword(), map.get("password"));
    }

    @RequestMapping(value = "/deleteAdmin")
    @ResponseBody
    public boolean deleteAdmin(@RequestBody Map<String,Integer> map){
        return adminService.deleteAdmin(map.get("id"));
    }

    @PostMapping("/changeAdminAvatar")
    public String changeAvatar(@RequestParam("file") MultipartFile file, HttpSession session){
        // 获取上传文件名
        String filename = file.getOriginalFilename();
        if(!Objects.equals(filename, "")){
            // 定义上传文件保存路径
            String path = filePath + "avatar/";
            Admin admin = (Admin) session.getAttribute("loginAdmin");
            String sub = filename.split("\\.")[1];
            String newFilename = String.valueOf(admin.getAdminName()) + '.' + sub;
            // 新建文件
            File filepath = new File(path, newFilename);
            // 判断路径是否存在，如果不存在就创建一个
            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();
            }
            try {
                // 写入文件
                file.transferTo(new File(path + File.separator + newFilename));
            } catch (IOException e) {
                e.printStackTrace();
            }
            adminService.updateAdminAvatar(admin.getId(), newFilename);
            admin.setAvatar(newFilename);
            session.setAttribute("loginAdmin",admin);
        }
        return "admin/adminDetail";
    }
}
