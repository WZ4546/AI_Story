package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Character_Story")
@IdClass(CharacterStoryId.class)
public class CharacterStory {

    @Id
    @Column(name = "character_id")
    private int characterId;

    @Id
    @Column(name = "story_id")
    private int storyId;

    @ManyToOne
    @JoinColumn(name = "character_id", insertable = false, updatable = false)
    private Character character;

    @ManyToOne
    @JoinColumn(name = "story_id", insertable = false, updatable = false)
    private Story story;

    // Getters and Setters

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

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }
}
