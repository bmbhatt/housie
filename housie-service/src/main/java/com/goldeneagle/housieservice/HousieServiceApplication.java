package com.goldeneagle.housieservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
public class HousieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HousieServiceApplication.class, args);
	}

	@org.springframework.context.annotation.Configuration
	class Configuration {
		@Bean
		public Generator generator() {
			return new Generator();
		}
	}
}
