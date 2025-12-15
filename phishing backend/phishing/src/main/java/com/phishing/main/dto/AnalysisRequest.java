package com.phishing.main.dto;

public class AnalysisRequest {
    private String text;
    private String imageUrl; 

    // Getters and Setters
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}