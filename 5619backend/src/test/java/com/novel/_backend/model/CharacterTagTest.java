package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CharacterTagTest {

    @Test
    public void testGettersAndSetters() {
        CharacterTag characterTag = new CharacterTag();

        // Test data
        Character character = new Character(); // Create an instance of Character
        Tag tag = new Tag(); // Create an instance of Tag
        characterTag.setCharacter(character);
        characterTag.setTag(tag);

        // Verify that getters return the correct values
        assertEquals(character, characterTag.getCharacter());
        assertEquals(tag, characterTag.getTag());
    }

    @Test
    public void testToString() {
        Character character = new Character(); // Create an instance of Character
        Tag tag = new Tag(); // Create an instance of Tag
        CharacterTag characterTag = new CharacterTag();
        characterTag.setCharacter(character);
        characterTag.setTag(tag);

        // Verify the toString method
        String expected = "CharacterTag{character=" + character + ", tag=" + tag + "}";
        assertEquals(expected, characterTag.toString());
    }

    @Test
    public void testEqualsAndHashCode() {
        CharacterTag characterTag1 = new CharacterTag();
        CharacterTag characterTag2 = new CharacterTag();
        CharacterTag characterTag3 = new CharacterTag();

        Character character1 = new Character();
        Tag tag1 = new Tag();

        characterTag1.setCharacter(character1);
        characterTag1.setTag(tag1);

        characterTag2.setCharacter(character1);
        characterTag2.setTag(tag1);

        characterTag3.setCharacter(new Character());
        characterTag3.setTag(new Tag());

        // Verify that two identical CharacterTag instances are equal
        assertEquals(characterTag1, characterTag2);

        // Verify that two different CharacterTag instances are not equal
        assertNotEquals(characterTag1, characterTag3);

        // Verify that hashCode is consistent with equals
        assertEquals(characterTag1.hashCode(), characterTag2.hashCode());
    }
}
