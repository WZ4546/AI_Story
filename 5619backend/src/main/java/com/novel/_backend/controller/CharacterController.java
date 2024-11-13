//package com.novel._backend.controller;
//
//import com.novel._backend.model.Character;
//import com.novel._backend.model.Story;
//import com.novel._backend.repository.CharacterRepository;
//import com.novel._backend.repository.StoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.bind.annotation.*;
//
//import jakarta.validation.Valid;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/characters")
//@CrossOrigin(origins = "http://localhost:5173")
//public class CharacterController {
//
//    @Autowired
//    private CharacterRepository characterRepository;
//
//    @Autowired
//    private StoryRepository storyRepository;
//
//
//
//    @PostMapping("/save")
//    public ResponseEntity<String> saveCharacter(@Valid @RequestBody Character character) {
//        System.out.println("character: " + character.getTags());
//        try {
//            characterRepository.save(character);
//            return new ResponseEntity<>("Character info saved successfully", HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>("Error saving character info", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Character>> getCharacters(@RequestParam(required = false) String name) {
//        List<Character> characters;
//        if (name != null && !name.isEmpty()) {
//            characters = characterRepository.findByNameContainingIgnoreCase(name);
//        } else {
//            characters = characterRepository.findAll();
//        }
//        if (characters.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(characters, HttpStatus.OK);
//    }
//
//    @GetMapping("/latest")
//    public ResponseEntity<List<Character>> getLatestCharacters() {
//        List<Character> characters = characterRepository.findTop5ByOrderByCreatedAtDesc();
//        if (characters.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(characters, HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Character> getCharacterById(@PathVariable("id") Long id) {
//        Optional<Character> character = characterRepository.findById(id);
//
//        if (character.isPresent()) {
//            return new ResponseEntity<>(character.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<String> updateCharacter(@PathVariable("id") Long id, @Valid @RequestBody Character characterDetails) {
//        Optional<Character> characterOptional = characterRepository.findById(id);
//        if (characterOptional.isPresent()) {
//            Character character = characterOptional.get();
//            character.setName(characterDetails.getName());
//            character.setTags(characterDetails.getTags());
//            character.setBackground(characterDetails.getBackground());
//            character.setCreatedAt(characterDetails.getCreatedAt());
//
//            try {
//                characterRepository.save(character);
//                return new ResponseEntity<>("Character updated successfully", HttpStatus.OK);
//            } catch (Exception e) {
//                return new ResponseEntity<>("Error updating character", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        } else {
//            return new ResponseEntity<>("Character not found", HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @GetMapping("/search")
//    public ResponseEntity<List<Story>> searchStories(@RequestParam String storyName) {
//        List<Story> stories = storyRepository.findByTitleContainingIgnoreCase(storyName);
//        return new ResponseEntity<>(stories, HttpStatus.OK);
//    }
//
//
//
//    @Transactional
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteCharacter(@PathVariable("id") Long id) {
//        try {
//            characterRepository.deleteById(id);
//            return new ResponseEntity<>("Character deleted successfully", HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Error deleting character", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//
//
//}


package com.novel._backend.controller;

import com.novel._backend.model.Character;
import com.novel._backend.model.Story;
import com.novel._backend.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "http://localhost:5173")
public class CharacterController {

    @Autowired
    private CharacterRepository characterRepository;

    @PostMapping("/save")
    public ResponseEntity<String> saveCharacter(@Valid @RequestBody Character character) {
        System.out.println("character: " + character.getTags());
        try {
            characterRepository.save(character);
            return new ResponseEntity<>("Character info saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving character info", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Character>> getCharacters(@RequestParam(required = false) String name) {
        List<Character> characters;
        if (name != null && !name.isEmpty()) {
            characters = characterRepository.findByNameContainingIgnoreCase(name);
        } else {
            characters = characterRepository.findAll();
        }
        if (characters.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(characters, HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Character>> getLatestCharacters() {
        List<Character> characters = characterRepository.findTop5ByOrderByCreatedAtDesc();
        if (characters.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(characters, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getCharacterById(@PathVariable("id") Long id) {
        Optional<Character> character = characterRepository.findById(id);

        if (character.isPresent()) {
            return new ResponseEntity<>(character.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCharacter(@PathVariable("id") Long id, @Valid @RequestBody Character characterDetails) {
        Optional<Character> characterOptional = characterRepository.findById(id);
        if (characterOptional.isPresent()) {
            Character character = characterOptional.get();
            character.setName(characterDetails.getName());
            character.setTags(characterDetails.getTags());
            character.setBackground(characterDetails.getBackground());
            character.setCreatedAt(characterDetails.getCreatedAt());

            try {
                characterRepository.save(character);
                return new ResponseEntity<>("Character updated successfully", HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>("Error updating character", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>("Character not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public List<Character> searchCharacters(@RequestParam String name) {
        return characterRepository.findByNameContainingIgnoreCase(name);
    }

}
