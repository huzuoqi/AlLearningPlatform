package com.hu.ai_learningplatform.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageInfo;
import com.hu.ai_learningplatform.pojo.Admin;
import com.hu.ai_learningplatform.pojo.ForgetUser;
import com.hu.ai_learningplatform.pojo.LoginUser;
import com.hu.ai_learningplatform.pojo.Users;
import com.hu.ai_learningplatform.service.MailService;
import com.hu.ai_learningplatform.service.UserServiceImpl;
import com.hu.ai_learningplatform.utils.LoginMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 登陆控制
 * @date: 2022-03-08 21:01
 **/

@Slf4j
@Controller
public class UserController {
    @Autowired
    UserServiceImpl userService;

    /**上传地址*/
    @Value("${file.upload.path}")
    private String filePath;

    @Autowired
    MailService mailService;

    //验证码
    Map<String,String> confirm = new HashMap<>();

    @RequestMapping(value = "toLogin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping(value = "/login")
    @ResponseBody
    public LoginMsg doLogin(@RequestBody LoginUser loginUser, HttpSession session){
        LoginMsg loginMsg = new LoginMsg();
        Map<String,String> map = new HashMap<>();
        Users user = userService.getUserNameAndPassword(loginUser.getUserName(), loginUser.getPassword());
        if (user != null) {
            map.put("msg", "登陆成功");
            loginMsg.setCode(1);
            session.setAttribute("loginUser", user);
            log.info("登陆成功，账号：" + user.getUserName());
        } else {
            map.put("msg", "账号或密码错误");
            loginMsg.setCode(-1);
            log.info("登陆失败");
        }
        loginMsg.setMap(map);
        return loginMsg;
    }

    @RequestMapping(value = "/")
    public String homePage(HttpSession session) {
//        Users user  = new Users(1,"huzuoqi","huzuoqi","slide_fox",17513365649L,"huzuoqi0429@163.com",23,new Date(1999,4,29),new Date(1999,4,29),"test.jpg");
//        session.setAttribute("loginUser", user);
//        Admin admin  = new Admin(1,"admin","123",0,"huzuoqi0429@163.com",23,new Date(1999,4,29),new Date(2022,4,29,0,0,0),"test.jpg");
//        session.setAttribute("loginAdmin", admin);
//        session.setAttribute("power", 1);
        return "admin/adminArticle";
    }

    @RequestMapping(value = "/toRegister")
    public String toRegister(){
        return "register";
    }

    @RequestMapping(value ="/register")
    @ResponseBody
    public LoginMsg doRegister(@RequestBody Users user){
        LoginMsg loginMsg = new LoginMsg();
        Map<String,String> map = new HashMap<>();
        boolean ok = userService.addUser(user);
        if (ok) {
            map.put("msg", "注册成功");
            loginMsg.setCode(1);
            log.info("注册成功，账号：" + user.getUserName());
        } else {
            map.put("msg", "账号已存在");
            loginMsg.setCode(-1);
            log.info("注册失败");
        }
        loginMsg.setMap(map);
        return loginMsg;
    }

    @RequestMapping("/toForget")
    public String toForget(){return "forget";}

    @RequestMapping("/mail")
    @ResponseBody
    public LoginMsg sendMail(@RequestBody Map<String,Object> mail){
        LoginMsg loginMsg = new LoginMsg();
        Map<String,String> map = new HashMap<>();
        boolean ok = userService.sendMail(mail);
        if(ok){
            try {
                confirm.put((String) mail.get("email"), String.valueOf(Math.round((Math.random()+1) * 1000)));
                System.out.println(confirm.get((String) mail.get("email")));
                mailService.sendSimpleTextMailActual("验证码", confirm.get((String) mail.get("email")), URLDecoder.decode((String) mail.get("email"),"utf-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                map.put("msg", "发送失败");
                loginMsg.setCode(-1);
                log.info("发送失败");
                loginMsg.setMap(map);
                return loginMsg;
            }
            map.put("msg", "发送成功");
            loginMsg.setCode(1);
            log.info("发送邮件成功，账号：" + mail.get("email"));
        }else {
            map.put("msg", "账号邮箱不匹配");
            loginMsg.setCode(-1);
            log.info("账号邮箱不匹配");
        }
        loginMsg.setMap(map);
        return loginMsg;
    }

    @RequestMapping("/forget")
    @ResponseBody
    public LoginMsg forget(@RequestBody ForgetUser forgetUser){
        LoginMsg loginMsg = new LoginMsg();
        Map<String,String> map = new HashMap<>();
        if(!Objects.equals(confirm.get(forgetUser.getEmail()), forgetUser.getConfirm())){
            map.put("msg", "验证码错误");
            loginMsg.setCode(-1);
            log.info("验证码错误");
        }else {
            boolean ok = userService.updatePassword(forgetUser);
            if (!ok) {
                map.put("msg", "修改失败");
                loginMsg.setCode(-1);
                log.info("修改失败");
            } else if (ok) {
                map.put("msg", "修改成功");
                loginMsg.setCode(1);
                confirm.remove(forgetUser.getEmail());
                log.info("修改成功，账号：" + forgetUser.getUserName());
            }
        }
        loginMsg.setMap(map);
        System.out.println(loginMsg.toString());
        return loginMsg;
    }

    @RequestMapping(value = "/index")
    public String indexPage(){
        return "index";
    }


    @RequestMapping(value = "/getUserSession")
    public void getUserSession(HttpServletRequest request, HttpServletResponse response)throws Exception{
        //先从session中获取到之前存在session中的用户信息，然后通过ObjectMapper输出返回一个json数据给html页面，由页面去解析这个json数据
        Users user=(Users)request.getSession().getAttribute("loginUser");
        System.out.println(user);
        if(user!=null){
            ObjectMapper objectMapper=new ObjectMapper();
            objectMapper.writeValue(response.getOutputStream(),user);
        }
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpSession session){
        session.removeAttribute("loginUser");
        return "redirect:/login";
    }

    @RequestMapping(value = "/userDetail")
    public String userDetail(){
        return "/userDetail";
    }

    @RequestMapping(value = "/getUserDetail")
    @ResponseBody
    public Users getUserDetail(HttpSession session){
        return (Users) session.getAttribute("loginUser");
    }

    @RequestMapping(value = "/updateUser")
    public String updateUser(){
        return "/updateUser";
    }

    @PostMapping("/changeAvatar")
    public String changeAvatar(@RequestParam("file") MultipartFile file, HttpSession session){
        // 获取上传文件名
        String filename = file.getOriginalFilename();
        if(!Objects.equals(filename, "")){
            // 定义上传文件保存路径
            String path = filePath + "avatar/";
            Users user = (Users) session.getAttribute("loginUser");
            String sub = filename.split("\\.")[1];
            String newFilename = String.valueOf(user.getUserName()) + '.' + sub;
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
            userService.updateAvatar(user.getId(), newFilename);
            user.setAvatar(newFilename);
            session.setAttribute("loginUser",user);
        }
        return "userDetail";
    }

    @RequestMapping(value = "/updateUserInfo")
    @ResponseBody
    public LoginMsg updateUserInfo(@RequestBody Users user,HttpSession session){
        LoginMsg loginMsg = new LoginMsg();
        Map<String,String> map = new HashMap<>();
        boolean ok = userService.updateBaseInfo(user);
        if (ok) {
            map.put("msg", "修改成功");
            loginMsg.setCode(1);
            log.info("修改成功，账号：" + user.getUserName());
        } else {
            map.put("msg", "修改失败");
            loginMsg.setCode(-1);
            log.info("修改失败");
        }
        loginMsg.setMap(map);
        Users loginUser= (Users) session.getAttribute("loginUser");
        loginUser.setBirthday(user.getBirthday());
        loginUser.setAge(user.getAge());
        loginUser.setEmail(user.getEmail());
        loginUser.setNickName(user.getNickName());
        loginUser.setTelephone(user.getTelephone());
        session.setAttribute("loginUser",loginUser);
        return loginMsg;
    }

    @RequestMapping(value = "/confirmPassword")
    @ResponseBody
    public boolean confirmPassword(@RequestBody Map<String,String> map, HttpSession session){
        Users user = (Users) session.getAttribute("loginUser");
        if(Objects.equals(user.getPassword(), map.get("password"))){
            return true;
        }else {
            return false;
        }
    }

    @RequestMapping(value = "/deleteUser")
    @ResponseBody
    public boolean deleteUser(@RequestBody Map<String,Integer> map){
        return userService.deleteUser(map.get("id"));
    }

    @RequestMapping(value = "/getQueryAllUser")
    @ResponseBody
    public PageInfo<Users> getQueryAllUser(@RequestBody Map<String,Object> map){
        return userService.getQueryAllUsers(Integer.parseInt(map.get("pageNum").toString()), Integer.parseInt(map.get("pageSize").toString()),(String) map.get("name"));
    }

    @RequestMapping(value = "/getOneUser")
    @ResponseBody
    public Users getOneUser(@RequestBody Map<String,Integer> map){
        return userService.getBaseInfo(map.get("id"));
    }
}
