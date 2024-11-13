package com.novel._backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserCharacterIdTest {

    @Test
    void testEqualsAndHashCode() {
        UserCharacterId id1 = new UserCharacterId(1, 2);
        UserCharacterId id2 = new UserCharacterId(1, 2);
        UserCharacterId id3 = new UserCharacterId(2, 3);

        // Test equality
        assertEquals(id1, id2);
        assertNotEquals(id1, id3);

        // Test hash code
        assertEquals(id1.hashCode(), id2.hashCode());
        assertNotEquals(id1.hashCode(), id3.hashCode());
    }

    @Test
    void testGettersAndSetters() {
        UserCharacterId id = new UserCharacterId();

        // Set userId and verify
        id.setUserId(1);
        assertEquals(1, id.getUserId());

        // Set characterId and verify
        id.setCharacterId(2);
        assertEquals(2, id.getCharacterId());
    }
}
