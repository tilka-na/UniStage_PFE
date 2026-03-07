package com.unistage.api_gateway.config; // Adjust package name to your gateway

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class GatewayCorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // 1. Allow your Angular dev server
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));

        // 2. Allow all common HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3. Allow essential headers (Authorization is for your JWTs)
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));

        // 4. Allow the browser to send cookies or Auth headers
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all routes passing through the gateway
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}