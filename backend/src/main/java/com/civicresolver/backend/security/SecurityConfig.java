package com.civicresolver.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // CSRF disabled
                .csrf(csrf -> csrf.disable())
                // Stateless session
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers(
                                "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/h2-console/**"
                        ).permitAll()
                        .requestMatchers("/api/complaints/public").permitAll()
                        // Authenticated endpoints
                        .requestMatchers("/api/test/**").authenticated()
                        // Role-based endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/complaints/**").hasAnyRole("CITIZEN", "ADMIN")
                        .anyRequest().authenticated()
                )
                // H2 console fix: allow frames
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                // HTTP Basic (for Swagger)
                .httpBasic(Customizer.withDefaults());

        // Skip JWT filter for H2 console and Swagger
        // Skip JWT filter for H2 console and Swagger
        http.addFilterBefore(new JwtAuthenticationFilterSkippingPaths(jwtFilter, List.of(
                "/h2-console/**",
                "/swagger-ui/**",
                "/v3/api-docs/**"
        )), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // frontend
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
