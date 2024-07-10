package com.daewon.xeno_z1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class XenoZ1Application {

	public static void main(String[] args) {
		SpringApplication.run(XenoZ1Application.class, args);
	}

}
