package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

public class CharacterTest {

    @Test
    public void testGettersAndSetters() {
        Character character = new Character();

        // Test data
        User owner = new User(); // Create an instance of User
        character.setId(1);
        character.setOwner(owner);
        character.setCharacterCode("C001");
        character.setName("Sample Character");
        character.setTags("Brave, Kind");
        character.setProfileImage("profile_image_url");
        character.setAppearance("Tall with blue eyes");
        character.setBackground("Born in a small village");
        character.setPublished(true);
        character.setPublishedAt(LocalDateTime.now().plusDays(1)); // Future date for publishedAt

        // Verify that getters return the correct values
        assertEquals(1, character.getId());
        assertEquals(owner, character.getOwner());
        assertEquals("C001", character.getCharacterCode());
        assertEquals("Sample Character", character.getName());
        assertEquals("Brave, Kind", character.getTags());
        assertEquals("profile_image_url", character.getProfileImage());
        assertEquals("Tall with blue eyes", character.getAppearance());
        assertEquals("Born in a small village", character.getBackground());
        assertTrue(character.isPublished());
        assertNotNull(character.getPublishedAt());
    }

    @Test
    public void testCreatedAtAndUpdatedAt() {
        Character character = new Character();
        character.onCreate(); // Simulate PrePersist

        // Check that createdAt is set
        assertNotNull(character.getCreatedAt());

        // Simulate an update
        character.onUpdate(); // Simulate PreUpdate

        // Check that updatedAt is set
        assertNotNull(character.getUpdatedAt());
    }

    @Test
    public void testEqualsAndHashCode() {
        Character character1 = new Character();
        character1.setId(1);
        Character character2 = new Character();
        character2.setId(1);
        Character character3 = new Character();
        character3.setId(2);

        // Verify that two identical Characters are equal
        assertEquals(character1, character2);

        // Verify that two different Characters are not equal
        assertNotEquals(character1, character3);

        // Verify that hashCode is consistent with equals
        assertEquals(character1.hashCode(), character2.hashCode());
    }
}
