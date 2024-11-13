package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Story_tag")
public class StoryTag {

    @Id
    @ManyToOne
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;

    @Id
    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    // Getters and Setters

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "StoryTag{" +
                "story=" + story +
                ", tag=" + tag +
                '}';
    }
}
