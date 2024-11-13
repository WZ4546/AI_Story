package com.novel._backend.model;

import java.io.Serializable;
import java.util.Objects;

public class CategoryUserId implements Serializable {

    private int categoryId;
    private int userId;

    public CategoryUserId() {
    }

    public CategoryUserId(int categoryId, int userId) {
        this.categoryId = categoryId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CategoryUserId that = (CategoryUserId) o;
        return categoryId == that.categoryId && userId == that.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, userId);
    }

    public int getCategoryId() {
        return categoryId;
    }

    public int getUserId() {
        return userId;
    }
}