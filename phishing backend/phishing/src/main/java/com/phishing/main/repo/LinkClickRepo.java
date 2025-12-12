package com.phishing.main.repo;

import com.phishing.main.entitys.LinkClick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface LinkClickRepo extends JpaRepository<LinkClick, Long> {
    
    List<LinkClick> findByAwarenessLinkIdOrderByClickedAtDesc(Long linkId);
    
    @Query("SELECT COUNT(lc) FROM LinkClick lc WHERE lc.awarenessLink.id = :linkId AND lc.userIp = :userIp AND lc.clickedAt > :since")
    long countRecentClicksByIpAndLink(@Param("linkId") Long linkId, 
                                      @Param("userIp") String userIp, 
                                      @Param("since") LocalDateTime since);
    
    @Query("SELECT SUM(CASE WHEN lc.isUnique = true THEN 1 ELSE 0 END) FROM LinkClick lc WHERE lc.awarenessLink.user.id = :userId")
    Long countUniqueClicksByUserId(@Param("userId") Long userId);
}
