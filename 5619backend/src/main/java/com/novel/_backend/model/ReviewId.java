package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class ReviewId implements Serializable {

    private int userId;
    private int storyId;

    public ReviewId() {
    }

    public ReviewId(int userId, int storyId) {
        this.userId = userId;
        this.storyId = storyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ReviewId that = (ReviewId) o;
        return userId == that.userId && storyId == that.storyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, storyId);
    }

    public int getUserId() {
        return userId;
    }

    public int getStoryId() {
        return storyId;
    }
}
