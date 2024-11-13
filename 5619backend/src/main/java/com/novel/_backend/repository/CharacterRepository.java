package com.novel._backend.repository;

import com.novel._backend.model.Character;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    List<Character> findByNameContainingIgnoreCase(String name);

    List<Character> findTop5ByOrderByCreatedAtDesc();

    Optional<Character> findById(Long id);

    void deleteById(Long id);
}