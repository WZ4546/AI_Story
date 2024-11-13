package com.novel._backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "`Character`")  // Maps to the `Character` table
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner; // Assuming you have a User entity

    @Column(name = "character_code", unique = true, length = 255)
    private String characterCode;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "tags", columnDefinition = "TEXT")  // Changed from `personality` to `tags`
    private String tags;

    @Column(name = "profileImage", length = 255)  // Changed from `image` to `profileImage`
    private String profileImage;

    @Column(name = "appearance", columnDefinition = "TEXT")
    private String appearance;

    @Column(name = "background", columnDefinition = "TEXT")
    private String background;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    @Column(name = "is_published", nullable = false)
    private boolean isPublished = false;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getCharacterCode() {
        return characterCode;
    }

    public void setCharacterCode(String characterCode) {
        this.characterCode = characterCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTags() {  // Changed from `getPersonality` to `getTags`
        return tags;
    }

    public void setTags(String tags) {  // Changed from `setPersonality` to `setTags`
        this.tags = tags;
    }

    public String getProfileImage() {  // Changed from `getImage` to `getProfileImage`
        return profileImage;
    }

    public void setProfileImage(String profileImage) {  // Changed from `setImage` to `setProfileImage`
        this.profileImage = profileImage;
    }

    public String getAppearance() {
        return appearance;
    }

    public void setAppearance(String appearance) {
        this.appearance = appearance;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean isPublished) {
        this.isPublished = isPublished;
    }
}
