package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class UserCharacterId implements Serializable {

    private int userId;
    private int characterId;

    public UserCharacterId() {}

    public UserCharacterId(int userId, int characterId) {
        this.userId = userId;
        this.characterId = characterId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCharacterId that = (UserCharacterId) o;
        return userId == that.userId && characterId == that.characterId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, characterId);
    }
}
