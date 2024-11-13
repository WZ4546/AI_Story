package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Character_tag")
public class CharacterTag {

    @Id
    @ManyToOne
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;

    @Id
    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    // Getters and Setters

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "CharacterTag{" +
                "character=" + character +
                ", tag=" + tag +
                '}';
    }
}
