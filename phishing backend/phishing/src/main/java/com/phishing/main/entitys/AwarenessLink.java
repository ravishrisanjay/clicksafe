package com.phishing.main.entitys;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "awareness_links")
public class AwarenessLink {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String token;
    
    @Column(nullable = false)
    private String originalUrl;
    
    @Column(nullable = false)
    private String platformType; // facebook, netflix, amazon, etc.
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    
    @Column(nullable = false)
    private int maxClicks = 1;
    
    @Column(nullable = false)
    private int currentClicks = 0;
    
    @Column(nullable = false)
    private boolean isActive = true;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    
    @OneToMany(mappedBy = "awarenessLink", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<LinkClick> clicks;
    
    // Constructors
    public AwarenessLink() {}
    
    public AwarenessLink(String token, String originalUrl, String platformType, 
                        LocalDateTime expiresAt, int maxClicks, User user) {
        this.token = token;
        this.originalUrl = originalUrl;
        this.platformType = platformType;
        this.createdAt = LocalDateTime.now();
        this.expiresAt = expiresAt;
        this.maxClicks = maxClicks;
        this.user = user;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getOriginalUrl() { return originalUrl; }
    public void setOriginalUrl(String originalUrl) { this.originalUrl = originalUrl; }
    
    public String getPlatformType() { return platformType; }
    public void setPlatformType(String platformType) { this.platformType = platformType; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    
    public int getMaxClicks() { return maxClicks; }
    public void setMaxClicks(int maxClicks) { this.maxClicks = maxClicks; }
    
    public int getCurrentClicks() { return currentClicks; }
    public void setCurrentClicks(int currentClicks) { this.currentClicks = currentClicks; }
    
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public List<LinkClick> getClicks() { return clicks; }
    public void setClicks(List<LinkClick> clicks) { this.clicks = clicks; }
}
