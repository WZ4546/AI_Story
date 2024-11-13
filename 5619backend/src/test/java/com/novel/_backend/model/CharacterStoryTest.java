package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CharacterStoryTest {

    @Test
    public void testGettersAndSetters() {
        CharacterStory characterStory = new CharacterStory();

        // Test data
        Character character = new Character(); // Create an instance of Character
        Story story = new Story(); // Create an instance of Story
        characterStory.setCharacterId(1);
        characterStory.setStoryId(2);
        characterStory.setCharacter(character);
        characterStory.setStory(story);

        // Verify that getters return the correct values
        assertEquals(1, characterStory.getCharacterId());
        assertEquals(2, characterStory.getStoryId());
        assertEquals(character, characterStory.getCharacter());
        assertEquals(story, characterStory.getStory());
    }

    @Test
    public void testEqualsAndHashCode() {
        CharacterStory characterStory1 = new CharacterStory();
        characterStory1.setCharacterId(1);
        characterStory1.setStoryId(2);

        CharacterStory characterStory2 = new CharacterStory();
        characterStory2.setCharacterId(1);
        characterStory2.setStoryId(2);

        CharacterStory characterStory3 = new CharacterStory();
        characterStory3.setCharacterId(2);
        characterStory3.setStoryId(3);

        // Verify that two identical CharacterStory instances are equal
        assertEquals(characterStory1, characterStory2);

        // Verify that two different CharacterStory instances are not equal
        assertNotEquals(characterStory1, characterStory3);

        // Verify that hashCode is consistent with equals
        assertEquals(characterStory1.hashCode(), characterStory2.hashCode());
    }
}
