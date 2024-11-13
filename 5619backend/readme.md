# 5619backend

## Libraries and Versions

### Java (Maven Dependencies):
- `spring-boot-starter-data-jpa`: For database integration
- `spring-boot-starter-validation`: For input validation
- `com.h2database:h2`: H2 Database (development/testing)
- `com.mysql:mysql-connector-j`: MySQL Connector (production)
- `spring-boot-starter-web`: Web support
- `spring-boot-starter-test`: Testing utilities
- `org.json:json` (version: 20210307): JSON processing
- `org.apache.httpcomponents.client5:httpclient5` (version: 5.1.3): Apache HttpClient
- `org.apache.httpcomponents.client5:httpclient5-fluent` (version: 5.1.3): Fluent HttpClient
- `spring-boot-maven-plugin`: Spring Boot build tools
- `jacoco-maven-plugin` (version: 0.8.8): Code coverage analysis

### Node.js (Dependencies from package.json):
- `openai`: Version `^4.67.3`
## Working Functionalities

| **Function**              | **Description**                                                                                                       |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------|
| saveCharacter             | Saves character information to the database. Accepts a Character object containing details like name, attributes, and tags. |
| generateStory (String)    | Generates a story based on the given name, description, and character actions. Processes input parameters such as story title and details.    |
| generateStory (Object)    | Creates a story continuation using a constructed prompt, based on data provided in the input map.                     |
| continueStoryWithAI       | Sends existing story content to the OpenAI API and retrieves a continuation response.                                |
| checkUser                 | Verifies user details or checks if a user exists in the system. Processes identification details from the User object. |
| sendPromptToOpenAi        | Sends a prompt to the OpenAI API and retrieves a generated response based on the input text.                         |
| constructPrompt (Object)  | Constructs a general prompt using input elements required to form a coherent query for the AI model.                 |
| constructPrompt (Character) | Creates prompts for character generation, utilizing settings and traits to build character-related dialogues.        |
| createStoryPrompt         | Generates prompts for story development, using the title, description, and other settings provided in the input. |
