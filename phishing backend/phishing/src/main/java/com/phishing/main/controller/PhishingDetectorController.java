package com.phishing.main.controller;

import com.phishing.main.dto.AnalysisRequest;
import com.phishing.main.dto.AnalysisResponse;
import com.phishing.main.services.PhishingDetectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detector")
@CrossOrigin(origins = "http://localhost:5173") // Enables React to talk to Java
public class PhishingDetectorController {

    @Autowired
    private PhishingDetectorService detectorService;

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyze(@RequestBody AnalysisRequest request) {
        AnalysisResponse response = detectorService.analyzeText(request.getText());
        return ResponseEntity.ok(response);
    }
}