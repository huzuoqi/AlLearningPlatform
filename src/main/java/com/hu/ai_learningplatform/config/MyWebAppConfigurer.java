package com.hu.ai_learningplatform.config;

/**
 * @program: AI_LearningPlatform
 * @author: huzuoiqi
 * @description: 自定义配置类
 * @date: 2022-04-10 17:44
 **/

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 资源映射路径
 */
@Configuration
public class MyWebAppConfigurer implements WebMvcConfigurer {

    /**上传地址*/
    @Value("${file.upload.path}")
    private String filePath;
    /**显示相对地址*/
    @Value("${file.upload.relative}")
    private String fileRelativePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(
                        "classpath:/META-INF/resources/",
                        "classpath:/resources/",
                        "classpath:/static/",
                        "classpath:/public/",
                        "classpath:META-INF/resources/"
                );
        registry.addResourceHandler("/img/**").addResourceLocations("file:"+filePath);
    }
}
