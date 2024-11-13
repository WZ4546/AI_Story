package com.novel._backend.model;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserCharacterTest {

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;

    @BeforeEach
    public void setUp() {
        // Initialize the EntityManager
        entityManagerFactory = Persistence.createEntityManagerFactory("test-pu");
        entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
    }

    @AfterEach
    public void tearDown() {
        // Rollback the transaction to clean up
        entityManager.getTransaction().rollback();
        entityManager.close();
        entityManagerFactory.close();
    }

    @Test
    public void testUserCharacterPersistence() {
        // Create a UserCharacterId
        UserCharacterId userCharacterId = new UserCharacterId(1, 1); // Use appropriate IDs

        // Create a User and Character instance (mock or real, depending on your setup)
        User user = new User();
        user.setId(1L); // Assuming ID is set manually for the test
        user.setUsername("testUser");

        Character character = new Character();
        character.setId(1); // Assuming ID is set manually for the test
        character.setName("testCharacter");

        // Create a UserCharacter instance
        UserCharacter userCharacter = new UserCharacter();
        userCharacter.setId(userCharacterId);
        userCharacter.setUser(user);
        userCharacter.setCharacter(character);
        userCharacter.setCanEdit(true);

        // Persist the User and Character first
        entityManager.persist(user);
        entityManager.persist(character);
        entityManager.persist(userCharacter);

        // Flush and clear the EntityManager to ensure persistence
        entityManager.flush();
        entityManager.clear();

        // Retrieve the persisted UserCharacter
        UserCharacter foundUserCharacter = entityManager.find(UserCharacter.class, userCharacterId);

        // Assertions to verify the persistence
        assertNotNull(foundUserCharacter);
        assertEquals(userCharacterId, foundUserCharacter.getId());
        assertEquals(user.getId(), foundUserCharacter.getUser().getId());
        assertEquals(character.getId(), foundUserCharacter.getCharacter().getId());
        assertTrue(foundUserCharacter.isCanEdit());
    }
}
