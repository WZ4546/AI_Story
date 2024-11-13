package com.novel._backend.repository;

import com.novel._backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByUsername(String username);
    User findByEmail(String email);
}
