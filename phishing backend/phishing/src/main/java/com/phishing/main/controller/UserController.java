package com.phishing.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.phishing.main.entitys.User;
import com.phishing.main.entitys.UserProfile;
import com.phishing.main.repo.UserProfileRepo;
import com.phishing.main.repo.UserRepo;

import org.springframework.security.crypto.password.PasswordEncoder;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        System.out.println(user.getUsername() + " " + user.getPassword());
    
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
    
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setName("New User");
        profile.setAbout("I'm new here.");
        profile.setProfileImageUrl("https://example.com/default.jpg");
        profile.setEmail(user.getUsername()); // 👈 Assuming username is the email
    
        userProfileRepo.save(profile);
    
        return ResponseEntity.ok("User registered successfully");
    }
    

}
