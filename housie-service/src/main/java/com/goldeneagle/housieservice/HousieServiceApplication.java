package com.goldeneagle.housieservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HousieServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HousieServiceApplication.class, args);
    }

    @org.springframework.context.annotation.Configuration
    class Configuration {
        @Bean
        public Games games() {
            return new Games(1);
        }
    }
}
