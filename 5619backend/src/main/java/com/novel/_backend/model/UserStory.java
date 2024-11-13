package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "User_Story")
@IdClass(UserStoryId.class)
public class UserStory {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Id
    @Column(name = "story_id")
    private int storyId;

    @Column(name = "canEdit")
    private boolean canEdit;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "story_id", insertable = false, updatable = false)
    private Story story;

    // Getters and Setters

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getStoryId() {
        return storyId;
    }

    public void setStoryId(int storyId) {
        this.storyId = storyId;
    }

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }
}
