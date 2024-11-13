package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserStoryIdTest {

    @Test
    void testEqualsAndHashCode() {
        UserStoryId id1 = new UserStoryId(1, 2);
        UserStoryId id2 = new UserStoryId(1, 2);
        UserStoryId id3 = new UserStoryId(2, 3);

        // Test equality
        assertEquals(id1, id2);
        assertNotEquals(id1, id3);

        // Test hash code
        assertEquals(id1.hashCode(), id2.hashCode());
        assertNotEquals(id1.hashCode(), id3.hashCode());
    }

    @Test
    void testGettersAndSetters() {
        UserStoryId id = new UserStoryId();

        // Set userId and verify
        id.setUserId(1);
        assertEquals(1, id.getUserId());

        // Set storyId and verify
        id.setStoryId(2);
        assertEquals(2, id.getStoryId());
    }
}
