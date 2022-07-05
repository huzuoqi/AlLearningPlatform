package com.hu.ai_learningplatform;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.hu.ai_learningplatform.mapper")
public class AiLearningPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiLearningPlatformApplication.class, args);
    }

}
