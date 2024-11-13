package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class UserStoryId implements Serializable {

    private int userId;
    private int storyId;

    public UserStoryId() {}

    public UserStoryId(int userId, int storyId) {
        this.userId = userId;
        this.storyId = storyId;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserStoryId that = (UserStoryId) o;
        return userId == that.userId && storyId == that.storyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, storyId);
    }
}
