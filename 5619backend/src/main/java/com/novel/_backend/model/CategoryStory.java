package com.novel._backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Category_Story")
@IdClass(CategoryStoryId.class)
public class CategoryStory {

    @Id
    @Column(name = "category_id")
    private int categoryId;

    @Id
    @Column(name = "story_id")
    private int storyId;

    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "story_id", insertable = false, updatable = false)
    private Story story;

    // Getters and Setters

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getStoryId() {
        return storyId;
    }

    public void setStoryId(int storyId) {
        this.storyId = storyId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Story getStory() {
        return story;
    }

    public void setStory(Story story) {
        this.story = story;
    }
}
