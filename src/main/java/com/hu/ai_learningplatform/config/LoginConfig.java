package com.hu.ai_learningplatform.config;

import com.hu.ai_learningplatform.interceptor.UserLoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 登陆拦截器配置
 * @date: 2022-04-14 12:53
 **/

@Configuration
public class LoginConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //注册TestInterceptor拦截器
        InterceptorRegistration registration = registry.addInterceptor(new UserLoginInterceptor());
        registration.addPathPatterns("/**"); //所有路径都被拦截
        registration.excludePathPatterns(    //添加不拦截路径
                "/login",                    //登录路径
                "/toLogin",
                "/toRegister",                 //注册
                "/register",
                "/",
                "/toForget",                    //找回密码
                "/forget",
                "/mail",
                "/adminMail",
                "/adminLogin",                  //管理员登陆
                "/toAdminLogin",
                "/toAdminRegister",             //管理员注册
                "/adminRegister",
                "/toAdminForget",            //管理员找回密码
                "/adminForget",
                "/**/*.html",                //html静态资源
                "/**/*.js",                  //js静态资源
                "/**/*.css"                  //css静态资源
        );
    }
}
