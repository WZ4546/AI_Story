package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CategoryStoryTest {

    @Test
    public void testGettersAndSetters() {
        CategoryStory categoryStory = new CategoryStory();

        // Test data
        Category category = new Category(); // Create an instance of Category
        Story story = new Story(); // Create an instance of Story
        categoryStory.setCategoryId(1);
        categoryStory.setStoryId(2);
        categoryStory.setCategory(category);
        categoryStory.setStory(story);

        // Verify that getters return the correct values
        assertEquals(1, categoryStory.getCategoryId());
        assertEquals(2, categoryStory.getStoryId());
        assertEquals(category, categoryStory.getCategory());
        assertEquals(story, categoryStory.getStory());
    }

    @Test
    public void testEqualsAndHashCode() {
        CategoryStory categoryStory1 = new CategoryStory();
        categoryStory1.setCategoryId(1);
        categoryStory1.setStoryId(2);
        CategoryStory categoryStory2 = new CategoryStory();
        categoryStory2.setCategoryId(1);
        categoryStory2.setStoryId(2);
        CategoryStory categoryStory3 = new CategoryStory();
        categoryStory3.setCategoryId(2);
        categoryStory3.setStoryId(3);

        // Verify that two identical CategoryStory instances are equal
        assertEquals(categoryStory1, categoryStory2);

        // Verify that two different CategoryStory instances are not equal
        assertNotEquals(categoryStory1, categoryStory3);

        // Verify that hashCode is consistent with equals
        assertEquals(categoryStory1.hashCode(), categoryStory2.hashCode());
    }
}
