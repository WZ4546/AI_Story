package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReviewIdTest {

    @Test
    public void testGetters() {
        ReviewId reviewId = new ReviewId(1, 2);

        // Verify that getters return the correct values
        assertEquals(1, reviewId.getUserId());
        assertEquals(2, reviewId.getStoryId());
    }

    @Test
    public void testEqualsAndHashCode() {
        ReviewId reviewId1 = new ReviewId(1, 2);
        ReviewId reviewId2 = new ReviewId(1, 2);
        ReviewId reviewId3 = new ReviewId(2, 3);

        // Verify that two identical ReviewId instances are equal
        assertEquals(reviewId1, reviewId2);

        // Verify that two different ReviewId instances are not equal
        assertNotEquals(reviewId1, reviewId3);

        // Verify that hashCode is consistent with equals
        assertEquals(reviewId1.hashCode(), reviewId2.hashCode());
    }
}
