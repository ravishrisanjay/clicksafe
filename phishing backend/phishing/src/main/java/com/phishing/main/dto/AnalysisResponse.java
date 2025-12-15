package com.phishing.main.dto;

public class AnalysisResponse {
    private String verdict; 
    private String message; 
    private int riskScore; 

    public AnalysisResponse(String verdict, String message, int riskScore) {
        this.verdict = verdict;
        this.message = message;
        this.riskScore = riskScore;
    }

    public String getVerdict() { return verdict; }
    public String getMessage() { return message; }
    public int getRiskScore() { return riskScore; }
}