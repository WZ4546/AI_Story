package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CharacterStoryIdTest {

    @Test
    public void testDefaultConstructor() {
        CharacterStoryId id = new CharacterStoryId();
        // Verify that default values are 0
        assertEquals(0, id.getCharacterId());
        assertEquals(0, id.getStoryId());
    }

    @Test
    public void testParameterizedConstructor() {
        CharacterStoryId id = new CharacterStoryId(1, 2);
        // Verify that the constructor sets values correctly
        assertEquals(1, id.getCharacterId());
        assertEquals(2, id.getStoryId());
    }

    @Test
    public void testGetters() {
        CharacterStoryId id = new CharacterStoryId(1, 2);

        // Verify that getters return the correct values
        assertEquals(1, id.getCharacterId());
        assertEquals(2, id.getStoryId());
    }

    @Test
    public void testEqualsAndHashCode() {
        CharacterStoryId id1 = new CharacterStoryId(1, 2);
        CharacterStoryId id2 = new CharacterStoryId(1, 2);
        CharacterStoryId id3 = new CharacterStoryId(2, 3);

        // Verify that two identical IDs are equal
        assertEquals(id1, id2);

        // Verify that two different IDs are not equal
        assertNotEquals(id1, id3);

        // Verify that an ID is equal to itself
        assertEquals(id1, id1);

        // Verify that an ID is not equal to an object of a different class
        assertNotEquals(id1, new Object());

        // Verify that hashCode is consistent with equals
        assertEquals(id1.hashCode(), id2.hashCode());
    }
}
