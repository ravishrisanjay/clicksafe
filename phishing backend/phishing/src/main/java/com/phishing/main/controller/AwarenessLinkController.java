package com.phishing.main.controller;

import com.phishing.main.entitys.AwarenessLink;
import com.phishing.main.services.AwarenessLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/awareness-links")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"})
public class AwarenessLinkController {
    
    @Autowired
    private AwarenessLinkService awarenessLinkService;

    // 🔥 UPDATED: Enhanced click recording endpoint with better debugging
    @PostMapping("/click")
    public ResponseEntity<?> recordClick(@RequestBody Map<String, String> request, 
                                         HttpServletRequest httpRequest) {
        // 🔥 ADDED: Debug logging
        System.out.println("=== CLICK API CALLED ===");
        System.out.println("Request URI: " + httpRequest.getRequestURI());
        System.out.println("Request Method: " + httpRequest.getMethod());
        System.out.println("Origin Header: " + httpRequest.getHeader("Origin"));
        System.out.println("Content-Type: " + httpRequest.getHeader("Content-Type"));
        System.out.println("Authorization Header: " + httpRequest.getHeader("Authorization"));
        System.out.println("Request Body: " + request);
        
        try {
            String token = request.get("token");
            
            if (token == null || token.trim().isEmpty()) {
                System.out.println("ERROR: Token is missing or empty");
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Token is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            System.out.println("Processing token: " + token);
            String result = awarenessLinkService.handleLinkClick(token, getClientIp(httpRequest), httpRequest.getHeader("User-Agent"));
            System.out.println("Service result: " + result);
            
            Map<String, Object> response = new HashMap<>();
            
            if (result.equals("LINK_NOT_FOUND")) {
                response.put("success", false);
                response.put("message", "Link not found or invalid");
            } else if (result.equals("LINK_EXPIRED")) {
                response.put("success", false);
                response.put("message", "Link has expired");
            } else if (result.equals("MAX_CLICKS_REACHED")) {
                response.put("success", false);
                response.put("message", "Maximum clicks reached");
            } else if (result.startsWith("SUCCESS:")) {
                response.put("success", true);
                response.put("message", "Click recorded successfully");
                response.put("platform", result.substring(8));
            } else {
                response.put("success", false);
                response.put("message", "Unknown error: " + result);
            }
            
            System.out.println("Sending response: " + response);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("=== CLICK API ERROR ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Server error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    
    // 🔥 UPDATED: Generate frontend URLs with better error handling
    @PostMapping("/generate")
    public ResponseEntity<?> generateLink(@RequestBody Map<String, Object> request, 
                                        Authentication authentication) {
        System.out.println("=== GENERATE LINK API CALLED ===");
        System.out.println("Request: " + request);
        System.out.println("Authenticated user: " + authentication.getName());
        
        try {
            String platformType = (String) request.get("platformType");
            
            // 🔥 ADDED: Input validation
            if (platformType == null || platformType.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Platform type is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            // 🔥 ADDED: Safe type casting with validation
            Object expiryHoursObj = request.get("expiryHours");
            Object maxClicksObj = request.get("maxClicks");
            
            int expiryHours;
            int maxClicks;
            
            try {
                expiryHours = (expiryHoursObj instanceof Integer) ? (Integer) expiryHoursObj : 
                             Integer.parseInt(String.valueOf(expiryHoursObj));
                maxClicks = (maxClicksObj instanceof Integer) ? (Integer) maxClicksObj : 
                           Integer.parseInt(String.valueOf(maxClicksObj));
            } catch (NumberFormatException e) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid expiry hours or max clicks value");
                return ResponseEntity.badRequest().body(response);
            }
            
            String username = authentication.getName();
            
            AwarenessLink link = awarenessLinkService.generateLink(username, platformType, expiryHours, maxClicks);
            
            // 🔥 IMPROVED: Better URL generation
            String frontendUrl = "http://localhost:5173/" + platformType.toLowerCase() + "?token=" + link.getToken();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("link", frontendUrl);
            response.put("token", link.getToken()); // Also include token separately
            response.put("expiresAt", link.getExpiresAt());
            response.put("maxClicks", link.getMaxClicks());
            response.put("message", "Awareness link generated successfully");
            
            System.out.println("Generated link successfully: " + frontendUrl);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("Error generating link: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to generate link: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    
    // 🔥 UPDATED: Better error handling for getUserLinks
    @GetMapping("/my-links")
    public ResponseEntity<?> getUserLinks(Authentication authentication) {
        System.out.println("=== GET USER LINKS API CALLED ===");
        System.out.println("User: " + authentication.getName());
        
        try {
            String username = authentication.getName();
            List<AwarenessLink> links = awarenessLinkService.getUserLinks(username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("links", links);
            response.put("count", links.size());
            
            System.out.println("Retrieved " + links.size() + " links for user: " + username);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("Error fetching user links: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to fetch links: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    
    // 🔥 ADDED: Helper method to get client IP
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
