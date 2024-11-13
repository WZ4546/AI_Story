package com.novel._backend.repository;

import com.novel._backend.model.Story;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer> {
    List<Story> findTop3ByOrderByCreatedAtDesc(); 
    
    @Query("SELECT DISTINCT tags FROM Story WHERE tags IS NOT NULL")
    List<String> findAllTags();

    List<Story> findByTitleContainingIgnoreCase(String title);



}
