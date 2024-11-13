package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReviewTest {

    @Test
    public void testGettersAndSetters() {
        Review review = new Review();

        // Test data
        review.setUserId(1);
        review.setStoryId(2);
        review.setRating(5);
        review.setComment("Great story!");

        // Verify that getters return the correct values
        assertEquals(1, review.getUserId());
        assertEquals(2, review.getStoryId());
        assertEquals(5, review.getRating());
        assertEquals("Great story!", review.getComment());
    }

    @Test
    public void testCreatedAtIsSetOnPrePersist() {
        Review review = new Review();
        review.setUserId(1);
        review.setStoryId(2);
        review.setRating(5);
        review.setComment("Great story!");

        // Simulate the pre-persist operation
        review.onCreate();

        // Verify that createdAt is set
        assertNotNull(review.getCreatedAt());
    }

    @Test
    public void testUserAndStoryRelationship() {
        Review review = new Review();
        User user = new User(); // Create a mock or a real User instance
        Story story = new Story(); // Create a mock or a real Story instance

        review.setUser(user);
        review.setStory(story);

        // Verify that the relationships are set correctly
        assertEquals(user, review.getUser());
        assertEquals(story, review.getStory());
    }

    @Test
    public void testToString() {
        Review review = new Review();
        review.setUserId(1);
        review.setStoryId(2);
        review.setRating(5);
        review.setComment("Great story!");

        String expected = "Review{" +
                "userId=1" +
                ", storyId=2" +
                ", rating=5" +
                ", comment='Great story!'" +
                ", createdAt=" + review.getCreatedAt() +
                '}';
        assertEquals(expected, review.toString());
    }
}
