package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CategoryTest {

    @Test
    public void testGettersAndSetters() {
        Category category = new Category();

        // Test data
        User user = new User(); // Create an instance of User entity
        category.setId(1);
        category.setUser(user);
        category.setName("Sample Category");
        category.setDescription("This is a sample description.");

        // Verify that getters return the correct values
        assertEquals(1, category.getId());
        assertEquals(user, category.getUser());
        assertEquals("Sample Category", category.getName());
        assertEquals("This is a sample description.", category.getDescription());
    }

    @Test
    public void testEqualsAndHashCode() {
        Category category1 = new Category();
        category1.setId(1);
        Category category2 = new Category();
        category2.setId(1);
        Category category3 = new Category();
        category3.setId(2);

        // Verify that two identical categories are equal
        assertEquals(category1, category2);

        // Verify that two different categories are not equal
        assertNotEquals(category1, category3);

        // Verify that hashCode is consistent with equals
        assertEquals(category1.hashCode(), category2.hashCode());
    }
}
