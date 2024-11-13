package com.novel._backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    private User user;

    @BeforeEach
    void setUp() {
        // Initialize the User object before each test
        user = new User("testuser", "testpassword");
        user.setEmail("test@example.com");
        user.setBio("This is a test bio.");
    }

    @Test
    void testGetId() {
        // Test that the ID is initially null
        assertNull(user.getId());

        // Set a new ID and test it
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void testGetUsername() {
        assertEquals("testuser", user.getUsername());

        user.setUsername("newuser");
        assertEquals("newuser", user.getUsername());
    }

    @Test
    void testGetEmail() {
        assertEquals("test@example.com", user.getEmail());

        user.setEmail("new@example.com");
        assertEquals("new@example.com", user.getEmail());
    }

    @Test
    void testGetPassword() {
        assertEquals("testpassword", user.getPassword());

        user.setPassword("newpassword");
        assertEquals("newpassword", user.getPassword());
    }

    @Test
    void testGetBio() {
        assertEquals("This is a test bio.", user.getBio());

        user.setBio("Updated bio.");
        assertEquals("Updated bio.", user.getBio());
    }

    @Test
    void testCreatedAt() {
        // Test that createdAt is set automatically (you may need to mock this)
        assertNotNull(user.getCreatedAt());
    }

    @Test
    void testUpdatedAt() {
        // Test that updatedAt is set automatically (you may need to mock this)
        assertNotNull(user.getUpdatedAt());
    }

    @Test
    void testUserConstructor() {
        User newUser = new User("anotheruser", "anotherpassword");
        assertEquals("anotheruser", newUser.getUsername());
        assertEquals("anotherpassword", newUser.getPassword());
    }
}
