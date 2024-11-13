package com.novel._backend.controller;

import com.novel._backend.model.Story;
import com.novel._backend.repository.StoryRepository;
import com.novel._backend.service.AIStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class StoryController {

    @Autowired
    private AIStoryService aiStoryService;

    @Autowired
    private StoryRepository storyRepository;

    /**
     * Generates a story using AI based on provided parameters.
     * 
     * @param storyRequest Map containing story name, background image, description,
     *                     and characters' background information.
     * @return Response containing the generated story or an error message if the
     *         operation fails.
     */
    @PostMapping("/generate-story")
    public ResponseEntity<Map<String, String>> generateStory(@RequestBody Map<String, Object> storyRequest) {
        try {
            // 从前端获取故事名称和描述
            String storyName = (String) storyRequest.get("storyName");
            String backgroundImage = (String) storyRequest.get("backgroundImage");
            String description = (String) storyRequest.get("storyBackground");

            List<Map<String, String>> charactersList = (List<Map<String, String>>) storyRequest
                    .get("charactersBackground");

            String story = aiStoryService.generateStory(storyName, description, charactersList);

            String cleanedStory = cleanStory(story);

            Story newStory = new Story();
            newStory.setTitle(storyName);
            newStory.setThema(cleanedStory);
            newStory.setPublished(false);
            newStory.setBackgroundImage(backgroundImage);

            return new ResponseEntity<>(Map.of("story", cleanedStory), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // 打印异常以便调试
            return new ResponseEntity<>(Map.of("error", "Failed to generate story: " + e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Story>> getLatestStories() {
        List<Story> stories = storyRepository.findTop3ByOrderByCreatedAtDesc();
        for (Story story : stories) {
            System.out.println("Story: " + story.getTitle() + ", is_published: " + story.isPublished());
        }
        return new ResponseEntity<>(stories, HttpStatus.OK); 
    }

    @GetMapping("/story/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable int id) {
        Optional<Story> story = storyRepository.findById(id); 

        if (story.isPresent()) {
            System.out.println("Found story with ID: " + id); 
            return new ResponseEntity<>(story.get(), HttpStatus.OK); 
        } else {
            System.out.println("Story not found with ID: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/story/{id}")
    public ResponseEntity<String> updateStoryThema(@PathVariable int id, @RequestBody Map<String, String> request) {
        Optional<Story> storyOpt = storyRepository.findById(id);

        if (storyOpt.isPresent()) {
            Story story = storyOpt.get();
            
            String newThema = request.get("thema");
            story.setThema(newThema);

            storyRepository.save(story);
            return new ResponseEntity<>("Story thema updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Story not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/stories")
    public ResponseEntity<String> saveStory(@RequestBody Story story) {
        try {
            storyRepository.save(story);
            return new ResponseEntity<>("Story saved successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error saving story: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/tags")
    public ResponseEntity<List<String>> getAllTags() {
        List<String> allTags = new ArrayList<>();
        List<String> tagsList = storyRepository.findAllTags();

        Set<String> uniqueTags = new HashSet<>();
        for (String tags : tagsList) {
            if (tags != null && !tags.isEmpty()) {
                for (String tag : tags.split(",")) {
                    uniqueTags.add(tag.trim()); 
                }
            }
        }
        allTags.addAll(uniqueTags);

        return new ResponseEntity<>(allTags, HttpStatus.OK);
    }
    
    @GetMapping("/stories")
    public ResponseEntity<List<Story>> getAllStories() {
        List<Story> stories = storyRepository.findAll();
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Story>> searchStories(@RequestParam String storyName) {
        List<Story> stories = storyRepository.findByTitleContainingIgnoreCase(storyName);
        return new ResponseEntity<>(stories, HttpStatus.OK);
    }



    private String cleanStory(String story) {
        if (story != null && story.contains("role=assistant")) {
            int startIndex = story.indexOf("content="); 
            int endIndex = story.indexOf(", refusal="); 
            if (startIndex != -1 && endIndex != -1) {
                return story.substring(startIndex + 8, endIndex).trim(); 
            }
        }
        return story;
    }


    @PutMapping("/story/{id}/publish")
    public ResponseEntity<String> publishStory(@PathVariable int id) {
        Optional<Story> storyOpt = storyRepository.findById(id);

        if (storyOpt.isPresent()) {
            Story story = storyOpt.get();
            story.setPublished(true); // Set is_published to true (1)
            storyRepository.save(story);
            return new ResponseEntity<>("Story published successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Story not found", HttpStatus.NOT_FOUND);
        }
    }

}
