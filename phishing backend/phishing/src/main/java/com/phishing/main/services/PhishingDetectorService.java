package com.phishing.main.services;

import com.phishing.main.dto.AnalysisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PhishingDetectorService {

    @Autowired
    private GoogleSafeBrowsingService googleService;

    @Autowired
    private OpenAIService openAIService;

    public AnalysisResponse analyzeText(String text) {
        if (text == null || text.trim().isEmpty()) {
            return new AnalysisResponse("Neutral", "Please provide text to analyze.", 0);
        }

        // 1. URL CHECK (Google)
        String url = extractUrl(text);
        if (url != null) {
            boolean isBlacklisted = googleService.isUrlUnsafe(url);
            if (isBlacklisted) {
                return new AnalysisResponse(
                    "🚨 DANGEROUS", 
                    "**Critical Alert:** This link appears on Google's global blacklist for phishing/malware.\n\nDo not click it.", 
                    100
                );
            }
        }

        // 2. AI CHECK (OpenAI) - Will verify if key exists, otherwise returns null
        String aiResult = openAIService.analyzeWithGPT(text);
        if (aiResult != null) {
            return new AnalysisResponse("🤖 AI Analysis", aiResult, 50);
        }

        // 3. FALLBACK: LOCAL RULE-BASED ENGINE
        // This runs if you don't have keys or internet
        return runHeuristicCheck(text);
    }

    private String extractUrl(String text) {
        Pattern pattern = Pattern.compile("(https?://\\S+)");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group(1) : null;
    }

    private AnalysisResponse runHeuristicCheck(String text) {
        String lower = text.toLowerCase();
        int score = 0;
        StringBuilder report = new StringBuilder("**Local Analysis Report:**\n");

        if(lower.contains("urgent") || lower.contains("immediately") || lower.contains("24 hours")) {
            score += 30;
            report.append("- ⚠️ Detects artificial urgency.\n");
        }
        if(lower.contains("password") || lower.contains("verify") || lower.contains("login")) {
            score += 40;
            report.append("- ⚠️ Requests sensitive actions/data.\n");
        }
        if(lower.contains("http://") || lower.contains("bit.ly")) {
            score += 20;
            report.append("- ⚠️ Contains suspicious/insecure links.\n");
        }

        if (score > 60) {
            return new AnalysisResponse("🚨 Suspicious", report.toString() + "\n**Verdict:** High risk of phishing.", score);
        } else if (score > 20) {
            return new AnalysisResponse("⚠️ Caution", report.toString() + "\n**Verdict:** Be careful, verify sender.", score);
        }
        
        return new AnalysisResponse("✅ Likely Safe", "No obvious phishing keywords detected by local scan.", score);
    }
}