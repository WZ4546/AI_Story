package com.novel._backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class StoryTest {

    private Story story;

    @BeforeEach
    public void setUp() {
        story = new Story();
    }

    @Test
    public void testGettersAndSetters() {
        // Test title
        String title = "Sample Story Title";
        story.setTitle(title);
        assertEquals(title, story.getTitle());

        // Test thema
        String thema = "Adventure";
        story.setThema(thema);
        assertEquals(thema, story.getThema());

        // Test backgroundImage
        String backgroundImage = "image_url.jpg";
        story.setBackgroundImage(backgroundImage);
        assertEquals(backgroundImage, story.getBackgroundImage());

        // Test published status
        story.setPublished(true);
        assertTrue(story.isPublished());

        // Test createdAt and updatedAt
        LocalDateTime now = LocalDateTime.now();
        story.setCreatedAt(now);
        story.setUpdatedAt(now);
        assertEquals(now, story.getCreatedAt());
        assertEquals(now, story.getUpdatedAt());
    }

    @Test
    public void testLifecycleCallbacks() {
        // Check createdAt is set on persist
        story.onCreate(); // Simulating @PrePersist
        assertNotNull(story.getCreatedAt());
        assertNull(story.getUpdatedAt());

        // Check updatedAt is set on update
        story.onUpdate(); // Simulating @PreUpdate
        assertNotNull(story.getUpdatedAt());
    }
}
