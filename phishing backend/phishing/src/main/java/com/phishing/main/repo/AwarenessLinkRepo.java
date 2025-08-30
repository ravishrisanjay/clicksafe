package com.phishing.main.repo;

import com.phishing.main.entitys.AwarenessLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AwarenessLinkRepo extends JpaRepository<AwarenessLink, Long> {
    
    // 🔥 EXISTING: Find active links by token
    Optional<AwarenessLink> findByTokenAndIsActiveTrue(String token);
    
    // 🔥 EXISTING: Find user's links ordered by creation date
    List<AwarenessLink> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    // 🔥 ADDED: Atomic increment method to prevent race conditions
    @Modifying
    @Transactional
    @Query("UPDATE AwarenessLink a SET a.currentClicks = a.currentClicks + 1 WHERE a.id = :id")
    int incrementClickCount(@Param("id") Long id);
    
    // 🔥 ADDED: Atomic deactivation method
    @Modifying
    @Transactional
    @Query("UPDATE AwarenessLink a SET a.isActive = false WHERE a.id = :id")
    int deactivateLink(@Param("id") Long id);
    
    // 🔥 EXISTING: Deactivate expired links (updated with proper annotations)
    @Modifying
    @Transactional
    @Query("UPDATE AwarenessLink a SET a.isActive = false WHERE a.expiresAt < :now")
    void deactivateExpiredLinks(@Param("now") LocalDateTime now);
    
    // 🔥 EXISTING: Count links by user
    long countByUserId(Long userId);
    
    // 🔥 BONUS: Additional useful methods for better functionality
    
    // Find all active links for a user
    @Query("SELECT a FROM AwarenessLink a WHERE a.user.id = :userId AND a.isActive = true ORDER BY a.createdAt DESC")
    List<AwarenessLink> findActiveByUserId(@Param("userId") Long userId);
    
    // Count active links for a user
    @Query("SELECT COUNT(a) FROM AwarenessLink a WHERE a.user.id = :userId AND a.isActive = true")
    long countActiveByUserId(@Param("userId") Long userId);
    
    // Bulk deactivate links that have reached max clicks
    @Modifying
    @Transactional
    @Query("UPDATE AwarenessLink a SET a.isActive = false WHERE a.currentClicks >= a.maxClicks AND a.isActive = true")
    int deactivateMaxClickedLinks();
}
