package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CategoryUserTest {

    @Test
    public void testGettersAndSetters() {
        CategoryUser categoryUser = new CategoryUser();

        // Test data
        Category category = new Category(); // Create an instance of Category
        User user = new User(); // Create an instance of User
        categoryUser.setCategoryId(1);
        categoryUser.setUserId(2);
        categoryUser.setCategory(category);
        categoryUser.setUser(user);

        // Verify that getters return the correct values
        assertEquals(1, categoryUser.getCategoryId());
        assertEquals(2, categoryUser.getUserId());
        assertEquals(category, categoryUser.getCategory());
        assertEquals(user, categoryUser.getUser());
    }

    @Test
    public void testEqualsAndHashCode() {
        CategoryUser categoryUser1 = new CategoryUser();
        categoryUser1.setCategoryId(1);
        categoryUser1.setUserId(2);

        CategoryUser categoryUser2 = new CategoryUser();
        categoryUser2.setCategoryId(1);
        categoryUser2.setUserId(2);

        CategoryUser categoryUser3 = new CategoryUser();
        categoryUser3.setCategoryId(2);
        categoryUser3.setUserId(3);

        // Verify that two identical CategoryUser instances are equal
        assertEquals(categoryUser1, categoryUser2);

        // Verify that two different CategoryUser instances are not equal
        assertNotEquals(categoryUser1, categoryUser3);

        // Verify that hashCode is consistent with equals
        assertEquals(categoryUser1.hashCode(), categoryUser2.hashCode());
    }
}
