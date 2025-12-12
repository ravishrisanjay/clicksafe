package com.phishing.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
@EntityScan(basePackages = "com.phishing.main.entitys")
public class PhishingApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhishingApplication.class, args);
	}

}
