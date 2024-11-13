package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class CharacterStoryId implements Serializable {

    private int characterId;
    private int storyId;

    public CharacterStoryId() {}

    public CharacterStoryId(int characterId, int storyId) {
        this.characterId = characterId;
        this.storyId = storyId;
    }

    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    public int getStoryId() {
        return storyId;
    }

    public void setStoryId(int storyId) {
        this.storyId = storyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CharacterStoryId that = (CharacterStoryId) o;
        return characterId == that.characterId && storyId == that.storyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(characterId, storyId);
    }
}
