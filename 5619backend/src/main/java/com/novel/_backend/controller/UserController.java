package com.novel._backend.controller;

import com.novel._backend.model.User;
import com.novel._backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Verifies user details or checks if a user exists in the system.
     * @param user User object containing identification details.
     * @return Response indicating if the user exists or if the operation was successful.
     */
    @PostMapping("/signin")
    public ResponseEntity<String> checkUser(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.BAD_REQUEST);
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }
}
