# Work Trial: Intermediate Software Developer - Redaction Feature

## Objective

Implement redaction and word highlighting functionalities within a post-call analytics platform for call centre data.

## Context

You will be working with an existing platform that analyses call centre audio and generates transcriptions. The platform currently displays call details, including speech segments with transcriptions. Your task is to enhance this platform by adding redaction capabilities, allowing users to mask sensitive information in both text and audio, and to implement word-level highlighting synchronised with audio playback.

## Provided Resources

* **GitHub Repository:** The project repository is available on GitHub (You will receive access before starting). Clone the repository and set up the project locally.
* **`db.json`:** The project includes a JSON file representing a database, which the platform interacts with using the `json-server` package.
* **Call Database:** Each call entry in the database contains an array of speech segment objects, which have several fields, including:
    * `redaction`: A string representing the redacted version of the transcription.
    * `transcription`: A string representing the original, unredacted transcription.
    * `words`: An array of objects, each containing word-level timestamps (`start`, `end`) and the word itself.
    * `emotion`, `start`, `end`, `speaker`, `language`, `translation`: Other fields that may be present but are not the focus of this task.
* **Organisation Settings:** The database also includes a JSON object representing the organisation’s settings. This object specifies the types of entities to be redacted (e.g., names, locations, etc.).
* **`.env.local` file:** This file contains environment variables. Modify the ports within this file to match the ports you are using for your local development environment.

## Specific Tasks

### Redacted Transcription Display

* The default view of the call details screen should display the `redaction` field of each speech segment.
* Implement the redaction logic based on the organisation's settings. Only the entity types specified in the organisation settings should be redacted.

### Reveal Redacted Entities Button

* Add a button to the call details screen labelled "Reveal Redacted Entities" (or similar).
* When this button is clicked, the display should switch to showing the original `transcription` field, revealing the redacted entities.
* Implement a toggle so that the button can switch back to the redacted view.

### Audio Redaction

* Utilise the `words` array (word-level timestamps) to implement audio redaction.
* When the "Reveal Redacted Entities" button is clicked, the audio should play the original unredacted audio.
* When the default view is present, the audio should be redacted by muting the audio between the redacted words.

### Word Highlighting

* Use the `words` array (word-level timestamps) to highlight the words in the transcription as they are played in the audio.
* The highlighting should be synchronised with the audio playback.
* The highlighting should be visible in both redacted and unredacted views.

### Database Interaction

* The existing platform uses `json-server` to interact with the JSON database. Ensure your changes are compatible with this setup.
* Modify the `.env.local` file with the correct ports that your local environment is using.

### Code Quality

* Write clean, maintainable, and well-documented code.
* Follow best practices for React and Next.js (or the relevant framework).

## Bonus Tasks

### Smooth Transcript Scrolling

* Improve the smoothness of the transcript scrolling as the audio plays. Ensure the highlighted word is always visible within the viewport without jarring jumps.

### Word Level Confidence Display

* The word objects within the `words` array also contain a "score" field, representing the accuracy of the transcription and time-alignment for that word. Write a paragraph explaining how you would display this confidence information to the user. Consider different visual representations and user experience implications.

## Evaluation Criteria

* **Functionality:** Correct implementation of redaction and the reveal/hide feature.
* **Code Quality:** Cleanliness, readability, and maintainability of the code.
* **Adherence to Requirements:** Following the instructions and utilising the provided resources effectively.
* **Completion of Bonus Tasks:** Quality and effectiveness of solutions for bonus tasks.

## Submission

* Submit a link to your forked repository containing your completed work.
* Include a brief description of any challenges you faced and how you overcame them.

This trial is designed to assess your ability to understand existing code, implement new features, and solve problems in a real-world development scenario.
