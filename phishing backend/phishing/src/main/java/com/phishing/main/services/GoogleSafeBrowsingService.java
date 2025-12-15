package com.phishing.main.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoogleSafeBrowsingService {

    @Value("${google.safebrowsing.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean isUrlUnsafe(String url) {
        // FAIL-SAFE: If key is missing or default, skip this check (return false)
        if (apiKey == null || apiKey.contains("INSERT_GOOGLE_KEY") || url == null || url.isEmpty()) {
            System.out.println("⚠️ Google API Key missing. Skipping Safe Browsing check.");
            return false;
        }

        String endpoint = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + apiKey;

        try {
            Map<String, Object> client = new HashMap<>();
            client.put("clientId", "clicksafe-app");
            client.put("clientVersion", "1.0.0");

            Map<String, Object> threatEntry = new HashMap<>();
            threatEntry.put("url", url);

            Map<String, Object> threatInfo = new HashMap<>();
            threatInfo.put("threatTypes", List.of("MALWARE", "SOCIAL_ENGINEERING"));
            threatInfo.put("platformTypes", List.of("ANY_PLATFORM"));
            threatInfo.put("threatEntryTypes", List.of("URL"));
            threatInfo.put("threatEntries", List.of(threatEntry));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("client", client);
            requestBody.put("threatInfo", threatInfo);

            Map response = restTemplate.postForObject(endpoint, requestBody, Map.class);
            return response != null && response.containsKey("matches");
        } catch (Exception e) {
            System.err.println("Google API Error (Using fallback): " + e.getMessage());
            return false; // Fail open if API fails
        }
    }
}