package com.phishing.main.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeWithGPT(String text) {
        // FAIL-SAFE: If key is missing/default, return null to trigger heuristic fallback
        if (apiKey == null || apiKey.contains("INSERT_OPENAI_KEY")) {
            System.out.println("⚠️ OpenAI API Key missing. Switching to local heuristic engine.");
            return null;
        }

        try {
            String endpoint = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            String prompt = "Analyze this text for phishing. Keep it short. Text: \"" + text + "\"";

            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", List.of(message));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            Map response = restTemplate.postForObject(endpoint, entity, Map.class);
            
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> msg = (Map<String, Object>) choices.get(0).get("message");
            return (String) msg.get("content");

        } catch (Exception e) {
            System.err.println("OpenAI API Error (Using fallback): " + e.getMessage());
            return null; // Return null so the main service uses the fallback
        }
    }
}