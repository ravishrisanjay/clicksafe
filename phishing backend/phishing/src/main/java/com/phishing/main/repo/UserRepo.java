package com.phishing.main.repo;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.phishing.main.entitys.User; 


public interface UserRepo extends JpaRepository <User,Long> {
    Optional<User> findByUsername(String username);

}
