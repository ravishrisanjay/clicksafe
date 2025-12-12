package com.phishing.main.entitys;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "link_clicks")
public class LinkClick {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userIp;
    
    @Column(columnDefinition = "TEXT")
    private String userAgent;
    
    @Column(nullable = false)
    private LocalDateTime clickedAt;
    
    // 🔥 ADDED: The missing successful field that your service code needs
    @Column(nullable = false)
    private boolean successful = true;
    
    @Column(nullable = false)
    private boolean isUnique = true;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "link_id", nullable = false)
    @JsonBackReference
    private AwarenessLink awarenessLink;
    
    // Constructors
    public LinkClick() {}
    
    public LinkClick(String userIp, String userAgent, boolean isUnique, AwarenessLink awarenessLink) {
        this.userIp = userIp;
        this.userAgent = userAgent;
        this.clickedAt = LocalDateTime.now();
        this.isUnique = isUnique;
        this.successful = true;  // 🔥 Initialize successful field
        this.awarenessLink = awarenessLink;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUserIp() { return userIp; }
    public void setUserIp(String userIp) { this.userIp = userIp; }
    
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    
    public LocalDateTime getClickedAt() { return clickedAt; }
    public void setClickedAt(LocalDateTime clickedAt) { this.clickedAt = clickedAt; }
    
    // 🔥 ADDED: The missing getter and setter for successful field
    public boolean isSuccessful() { return successful; }
    public void setSuccessful(boolean successful) { this.successful = successful; }
    
    public boolean isUnique() { return isUnique; }
    public void setUnique(boolean unique) { isUnique = unique; }
    
    public AwarenessLink getAwarenessLink() { return awarenessLink; }
    public void setAwarenessLink(AwarenessLink awarenessLink) { this.awarenessLink = awarenessLink; }
}
