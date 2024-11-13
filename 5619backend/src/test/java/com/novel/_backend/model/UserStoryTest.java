package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserStoryTest {

    @Test
    void testGettersAndSetters() {
        UserStory userStory = new UserStory();

        // Set userId and verify
        userStory.setUserId(1);
        assertEquals(1, userStory.getUserId());

        // Set storyId and verify
        userStory.setStoryId(2);
        assertEquals(2, userStory.getStoryId());

        // Set canEdit and verify
        userStory.setCanEdit(true);
        assertTrue(userStory.isCanEdit());

        // Create a User and Story for the test
        User user = new User();
        user.setId(1L);
        user.setUsername("testUser");

        Story story = new Story();
        story.setId(2);
        story.setTitle("testStory");

        // Set User and Story
        userStory.setUser(user);
        userStory.setStory(story);

        // Verify User and Story
        assertEquals(user, userStory.getUser());
        assertEquals(story, userStory.getStory());
    }
}
