package com.phishing.main.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔥 FIXED: Updated public endpoints list with correct paths
    private static final List<String> PUBLIC_ENDPOINTS = Arrays.asList(
        "/api/auth",                    // Removed trailing slash
        "/api/users/register",
        "/api/awareness-links/click",   // Exact match
        "/awareness",                   // Removed trailing slash
        "/simulation",                  // Removed trailing slash
        "/link-expired",
        "/link-not-found",
        "/favicon.ico",
        "/robots.txt"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        String requestPath = request.getRequestURI();
        String method = request.getMethod();
        
        System.out.println("=== JWT FILTER DEBUG ===");
        System.out.println("Processing: " + method + " " + requestPath);
        System.out.println("Content-Type: " + request.getHeader("Content-Type"));
        System.out.println("Origin: " + request.getHeader("Origin"));
        
        // 🔥 FIXED: More specific endpoint checking
        // Skip JWT processing for OPTIONS requests (CORS preflight)
        if ("OPTIONS".equals(method)) {
            System.out.println("✅ Skipping JWT for OPTIONS request");
            chain.doFilter(request, response);
            return;
        }
        
        // 🔥 FIXED: Exact match for click endpoint
        if ("/api/awareness-links/click".equals(requestPath) && "POST".equals(method)) {
            System.out.println("✅ Skipping JWT for awareness click endpoint");
            chain.doFilter(request, response);
            return;
        }
        
        // Skip JWT processing for other public endpoints
        if (isPublicEndpoint(requestPath)) {
            System.out.println("✅ Skipping JWT for public endpoint: " + requestPath);
            chain.doFilter(request, response);
            return;
        }

        System.out.println("🔐 Processing JWT authentication for: " + requestPath);

        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println("Extracted username from JWT: " + username);
            } catch (Exception e) {
                System.err.println("Error extracting username from JWT: " + e.getMessage());
            }
        } else {
            System.out.println("No Authorization header found or doesn't start with Bearer");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken token =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(token);
                    System.out.println("✅ JWT authentication successful for: " + username);
                } else {
                    System.out.println("❌ JWT validation failed for: " + username);
                }
            } catch (Exception e) {
                System.err.println("❌ Error during JWT authentication: " + e.getMessage());
                e.printStackTrace();
            }
        }

        chain.doFilter(request, response);
    }

    // 🔥 FIXED: Improved public endpoint checking logic
    private boolean isPublicEndpoint(String requestPath) {
        for (String publicPath : PUBLIC_ENDPOINTS) {
            // Exact match for specific endpoints
            if (requestPath.equals(publicPath)) {
                return true;
            }
            // Prefix match for paths like /api/auth/* 
            if (requestPath.startsWith(publicPath + "/")) {
                return true;
            }
        }
        return false;
    }
}
