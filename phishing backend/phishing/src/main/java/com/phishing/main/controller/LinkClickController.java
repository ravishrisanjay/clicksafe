package com.phishing.main.controller;

import com.phishing.main.services.AwarenessLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class LinkClickController {
    
    @Autowired
    private AwarenessLinkService awarenessLinkService;
    
    @GetMapping("/awareness/{token}")
    public String handleLinkClick(@PathVariable String token, HttpServletRequest request) {
        String userIp = getClientIP(request);
        String userAgent = request.getHeader("User-Agent");
        
        String result = awarenessLinkService.handleLinkClick(token, userIp, userAgent);
        
        if (result.equals("LINK_NOT_FOUND")) {
            return "redirect:http://localhost:5173/link-not-found";
        } else if (result.equals("LINK_EXPIRED")) {
            return "redirect:http://localhost:5173/link-expired";
        } else if (result.equals("MAX_CLICKS_REACHED")) {
            return "redirect:http://localhost:5173/link-expired";
        } else if (result.startsWith("SUCCESS:")) {
            String platformType = result.substring(8);
            return "redirect:http://localhost:5173/simulation/" + platformType + "?awareness=true";
        }
        
        return "redirect:http://localhost:5173/error";
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
