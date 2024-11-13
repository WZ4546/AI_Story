package com.novel._backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class StoryTagTest {

    private StoryTag storyTag;
    private Story story;
    private Tag tag;

    @BeforeEach
    public void setUp() {
        storyTag = new StoryTag();
        story = new Story();
        tag = new Tag(); // Ensure you have a Tag class defined
    }

    @Test
    public void testGettersAndSetters() {
        // Test story
        storyTag.setStory(story);
        assertEquals(story, storyTag.getStory());

        // Test tag
        storyTag.setTag(tag);
        assertEquals(tag, storyTag.getTag());
    }

    @Test
    public void testToString() {
        storyTag.setStory(story);
        storyTag.setTag(tag);
        String expectedString = "StoryTag{story=" + story + ", tag=" + tag + "}";
        assertEquals(expectedString, storyTag.toString());
    }
}
