package com.phishing.main.controller;

import com.phishing.main.entitys.UserProfile;
import com.phishing.main.repo.UserProfileRepo;
import com.phishing.main.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    @Autowired
    private UserProfileRepo profileRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String username = authentication.getName();
        return profileRepo.findByUserUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody UserProfile updatedProfile) {

        String username = authentication.getName();

        return profileRepo.findByUserUsername(username).map(profile -> {
            profile.setName(updatedProfile.getName());
            profile.setAbout(updatedProfile.getAbout());
            profile.setProfileImageUrl(updatedProfile.getProfileImageUrl());
            profile.setEmail(updatedProfile.getEmail()); // ✅ Allow email update

            profileRepo.save(profile);
            return ResponseEntity.ok(profile);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/increment-click")
public ResponseEntity<?> incrementClickCount(Authentication authentication) {
    String username = authentication.getName();

    return profileRepo.findByUserUsername(username).map(profile -> {
        profile.setLinksClicked(profile.getLinksClicked() + 1);
        profileRepo.save(profile);
        return ResponseEntity.ok("Click count incremented");
    }).orElse(ResponseEntity.notFound().build());
}

}
