// 📁 com.phishing.main.repo.UserProfileRepo.java
package com.phishing.main.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.phishing.main.entitys.UserProfile;

public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserUsername(String username);
}
