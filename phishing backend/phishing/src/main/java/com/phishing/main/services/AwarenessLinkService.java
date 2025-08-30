package com.phishing.main.services;

import com.phishing.main.entitys.AwarenessLink;
import com.phishing.main.entitys.LinkClick;
import com.phishing.main.entitys.User;
import com.phishing.main.entitys.UserProfile;
import com.phishing.main.repo.AwarenessLinkRepo;
import com.phishing.main.repo.LinkClickRepo;
import com.phishing.main.repo.UserProfileRepo;
import com.phishing.main.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AwarenessLinkService {
    
    @Autowired
    private AwarenessLinkRepo awarenessLinkRepo;
    
    @Autowired
    private LinkClickRepo linkClickRepo;
    
    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private UserProfileRepo userProfileRepo;
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int TOKEN_LENGTH = 32;
    private static final SecureRandom random = new SecureRandom();
    
    @Transactional
    public AwarenessLink generateLink(String username, String platformType, int expiryHours, int maxClicks) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        String token = generateUniqueToken();
        String originalUrl = "http://localhost:5173/simulation/" + platformType;
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(expiryHours);
        
        AwarenessLink awarenessLink = new AwarenessLink(token, originalUrl, platformType, expiresAt, maxClicks, user);
        awarenessLink = awarenessLinkRepo.save(awarenessLink);
        
        // Update user profile in separate transaction
        updateUserProfileLinksCreatedAsync(user.getUsername());
        
        return awarenessLink;
    }
    
    // 🔥 FIXED: Optimized handleLinkClick method to prevent deadlocks
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public String handleLinkClick(String token, String userIp, String userAgent) {
        try {
            System.out.println("=== HANDLING LINK CLICK START ===");
            System.out.println("Token: " + token + ", IP: " + userIp);
            
            // 🔥 STEP 1: Find and validate link
            Optional<AwarenessLink> linkOpt = awarenessLinkRepo.findByTokenAndIsActiveTrue(token);
            
            if (linkOpt.isEmpty()) {
                System.out.println("Link not found for token: " + token);
                return "LINK_NOT_FOUND";
            }
            
            AwarenessLink link = linkOpt.get();
            System.out.println("Found link ID: " + link.getId() + ", Current clicks: " + link.getCurrentClicks());
            
            // 🔥 STEP 2: Check expiry (read-only check first)
            if (LocalDateTime.now().isAfter(link.getExpiresAt())) {
                System.out.println("Link expired, deactivating");
                return deactivateLinkAndReturn(link, "LINK_EXPIRED");
            }
            
            // 🔥 STEP 3: Check max clicks (read-only check first)
            if (link.getCurrentClicks() >= link.getMaxClicks()) {
                System.out.println("Max clicks reached, deactivating");
                return deactivateLinkAndReturn(link, "MAX_CLICKS_REACHED");
            }
            
            // 🔥 STEP 4: Record click first (separate from link update)
            LinkClick linkClick = createLinkClick(link, userIp, userAgent);
            boolean isUniqueClick = isUniqueClick(link, userIp);
            
            // 🔥 STEP 5: Update link click count (single atomic operation)
            int newClickCount = incrementLinkClickCount(link);
            System.out.println("Updated click count to: " + newClickCount);
            
            // 🔥 STEP 6: Check if needs deactivation after increment
            if (newClickCount >= link.getMaxClicks()) {
                System.out.println("Max clicks reached after increment, deactivating");
                deactivateLink(link.getId());
            }
            
            // 🔥 STEP 7: Update user profile asynchronously (separate transaction)
            if (isUniqueClick) {
                updateUserProfileLinksClickedAsync(link.getUser().getUsername());
            }
            
            System.out.println("=== HANDLING LINK CLICK SUCCESS ===");
            return "SUCCESS:" + link.getPlatformType();
            
        } catch (Exception e) {
            System.err.println("=== HANDLING LINK CLICK ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to handle link click: " + e.getMessage(), e);
        }
    }
    
    // 🔥 ADDED: Separate method to create link click
    private LinkClick createLinkClick(AwarenessLink link, String userIp, String userAgent) {
        LinkClick linkClick = new LinkClick();
        linkClick.setUserIp(userIp);
        linkClick.setUserAgent(userAgent);
        linkClick.setSuccessful(true);
        linkClick.setAwarenessLink(link);
        linkClick.setClickedAt(LocalDateTime.now());
        
        return linkClickRepo.save(linkClick);
    }
    
    // 🔥 ADDED: Check for unique clicks
    private boolean isUniqueClick(AwarenessLink link, String userIp) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long recentClicks = linkClickRepo.countRecentClicksByIpAndLink(link.getId(), userIp, oneHourAgo);
        return recentClicks == 0;
    }
    
    // 🔥 ADDED: Atomic increment operation
    @Transactional
    public int incrementLinkClickCount(AwarenessLink link) {
        // Use atomic update query to prevent race conditions
        int updatedRows = awarenessLinkRepo.incrementClickCount(link.getId());
        if (updatedRows == 0) {
            throw new RuntimeException("Failed to increment click count for link ID: " + link.getId());
        }
        
        // Return the new click count
        Optional<AwarenessLink> updatedLink = awarenessLinkRepo.findById(link.getId());
        return updatedLink.map(AwarenessLink::getCurrentClicks).orElse(0);
    }
    
    // 🔥 ADDED: Separate deactivation method
    @Transactional
    public void deactivateLink(Long linkId) {
        awarenessLinkRepo.deactivateLink(linkId);
    }
    
    // 🔥 ADDED: Helper method for deactivation with return
    private String deactivateLinkAndReturn(AwarenessLink link, String result) {
        try {
            deactivateLink(link.getId());
        } catch (Exception e) {
            System.err.println("Error deactivating link: " + e.getMessage());
        }
        return result;
    }
    
    // 🔥 ADDED: Async profile update methods to prevent deadlocks
    @Transactional
    public void updateUserProfileLinksCreatedAsync(String username) {
        try {
            Optional<UserProfile> profileOpt = userProfileRepo.findByUserUsername(username);
            if (profileOpt.isPresent()) {
                UserProfile profile = profileOpt.get();
                profile.setLinksCreated(profile.getLinksCreated() + 1);
                userProfileRepo.save(profile);
            }
        } catch (Exception e) {
            System.err.println("Error updating user profile links created: " + e.getMessage());
            // Don't throw - this is non-critical
        }
    }
    
    @Transactional
    public void updateUserProfileLinksClickedAsync(String username) {
        try {
            Optional<UserProfile> profileOpt = userProfileRepo.findByUserUsername(username);
            if (profileOpt.isPresent()) {
                UserProfile profile = profileOpt.get();
                profile.setLinksClicked(profile.getLinksClicked() + 1);
                userProfileRepo.save(profile);
            }
        } catch (Exception e) {
            System.err.println("Error updating user profile links clicked: " + e.getMessage());
            // Don't throw - this is non-critical
        }
    }
    
    public List<AwarenessLink> getUserLinks(String username) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return awarenessLinkRepo.findByUserIdOrderByCreatedAtDesc(userOpt.get().getId());
    }
    
    private String generateUniqueToken() {
        StringBuilder token = new StringBuilder(TOKEN_LENGTH);
        for (int i = 0; i < TOKEN_LENGTH; i++) {
            token.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return token.toString();
    }
    
    // 🔥 DEPRECATED: Removed direct profile update methods to prevent deadlocks
    private void updateUserProfileLinksCreated(User user) {
        updateUserProfileLinksCreatedAsync(user.getUsername());
    }
    
    private void updateUserProfileLinksClicked(User user) {
        updateUserProfileLinksClickedAsync(user.getUsername());
    }
}
