package com.phishing.main.config;

import com.phishing.main.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // 🔥 CRITICAL: Allow OPTIONS requests for CORS preflight (MUST BE FIRST)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // 🔥 PUBLIC ENDPOINTS - No authentication required (ORDER MATTERS!)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/users/register").permitAll()
                
                // 🔥 FIXED: Multiple ways to ensure click endpoint is public
                .requestMatchers("/api/awareness-links/click").permitAll()              // Any method
                .requestMatchers(HttpMethod.POST, "/api/awareness-links/click").permitAll() // Specific POST
                
                .requestMatchers("/awareness/**").permitAll()
                .requestMatchers("/simulation/**").permitAll()
                .requestMatchers("/link-expired", "/link-not-found").permitAll()
                .requestMatchers("/favicon.ico", "/robots.txt").permitAll()
                .requestMatchers("/error").permitAll()  // Added error page
                
                // 🔥 PROTECTED ENDPOINTS - Authentication required
                .requestMatchers("/api/awareness-links/generate").authenticated()
                .requestMatchers("/api/awareness-links/my-links").authenticated()
                .requestMatchers("/api/user/**").authenticated()
                
                // 🔥 FIXED: Change this to permitAll() for debugging, then back to authenticated()
                .anyRequest().permitAll()  // 🚨 TEMPORARILY ALLOW ALL - CHANGE BACK TO authenticated() LATER
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        // Add JWT filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
        throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 🔥 FIXED: More permissive CORS for debugging
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // Very permissive for debugging
        
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"
        ));
        
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization", "Content-Type", "X-Requested-With"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
