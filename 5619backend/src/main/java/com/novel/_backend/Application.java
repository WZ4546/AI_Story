package com.novel._backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
@EntityScan("com.novel._backend.model") // Adjust the package to your needs
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
