package com.novel._backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class AIStoryService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private RestTemplate restTemplate = new RestTemplate();

    @Autowired
    public AIStoryService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;  // 初始化 final 字段
    }

   
    /**
     * Generates a story based on the given name, description, and character actions.
     * @param storyName The title of the story.
     * @param description A brief description of the story's theme or plot.
     * @param characterActionsList A list of maps where each map contains a character's name and their corresponding action.
     * @return The generated story text or an error message if the story generation fails.
     */
    public String generateStory(String storyName, String description, List<Map<String, String>> characterActionsList) {
        try {
            Map<String, String> characterActions = new HashMap<>();
            for (Map<String, String> character : characterActionsList) {
                String name = character.get("name");
                String action = character.get("action");
                if (name != null && action != null) {
                    characterActions.put(name, action);
                }
            }

            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + openAiApiKey);
            headers.set("Content-Type", "application/json");

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo"); 
            body.put("messages", List.of(
                Map.of("role", "system", "content", createStoryPrompt(storyName, description, characterActions)),
                Map.of("role", "user", "content", "Generate the story based on the information provided.")
            ));
            body.put("max_tokens", 500);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    url, HttpMethod.POST, entity, Map.class);

            if (response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                return (String) ((Map) ((List) responseBody.get("choices")).get(0)).get("message").toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating story: " + e.getMessage();
        }

        return null;
    }

    /**
     * Creates a structured prompt for generating a story based on the provided details.
     * @param storyName The title of the story.
     * @param description A brief description of the story's theme or plot.
     * @param characterActions A map where the key is the character's name and the value is their action.
     * @return A string prompt that will be sent to the AI model for story generation.
     */
    private String createStoryPrompt(String storyName, String description, Map<String, String> characterActions) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Create a story titled \"").append(storyName).append("\". ");
        prompt.append("The story has the following description: ").append(description).append(". ");
        prompt.append("Here are the characters and what they do:\n");

        characterActions.forEach((character, action) -> {
            prompt.append("- ").append(character).append(" does: ").append(action).append("\n");
        });

        return prompt.toString();
    }
}
