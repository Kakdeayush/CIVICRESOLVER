package com.civicresolver.backend;

import com.civicresolver.backend.user.Role;
import com.civicresolver.backend.user.User;
import com.civicresolver.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CivicresolverBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivicresolverBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if admin exists
            if (!userRepository.existsByEmail("admin@gmail.com")) {
                User admin = User.builder()
                        .name("Admin")
                        .email("admin@gmail.com")
                        .password(passwordEncoder.encode("admin123")) // automatically encoded
                        .role(Role.ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("✅ Admin created: admin@gmail.com / admin123");
            }
        };
    }
}
