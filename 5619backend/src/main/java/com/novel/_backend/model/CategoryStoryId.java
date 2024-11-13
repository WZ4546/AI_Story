package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class CategoryStoryId implements Serializable {

    private int categoryId;
    private int storyId;

    public CategoryStoryId() {
    }

    public CategoryStoryId(int categoryId, int storyId) {
        this.categoryId = categoryId;
        this.storyId = storyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CategoryStoryId that = (CategoryStoryId) o;
        return categoryId == that.categoryId && storyId == that.storyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, storyId);
    }

    public int getCategoryId() {
        return categoryId;
    }

    public int getStoryId() {
        return storyId;
    }
}
