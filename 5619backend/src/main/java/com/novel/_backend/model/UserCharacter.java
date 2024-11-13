package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "User_Character")
public class UserCharacter {

    @EmbeddedId
    private UserCharacterId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("characterId")
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;

    @Column(name = "canEdit")
    private boolean canEdit;

    // Getters and Setters

    public UserCharacterId getId() {
        return id;
    }

    public void setId(UserCharacterId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }
}
