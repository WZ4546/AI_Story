package com.novel._backend.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TagTest {

    private Tag tag;

    @BeforeEach
    public void setUp() {
        tag = new Tag();
    }

    @Test
    public void testGettersAndSetters() {
        // Test id
        tag.setId(1);
        assertEquals(1, tag.getId());

        // Test name
        tag.setName("Adventure");
        assertEquals("Adventure", tag.getName());
    }

    @Test
    public void testToString() {
        tag.setId(1);
        tag.setName("Adventure");
        String expectedString = "Tag{id=1, name='Adventure'}";
        assertEquals(expectedString, tag.toString());
    }
}
