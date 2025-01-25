# Text Summarizer Chrome Extension

A Chrome extension that simplifies selected text using AI. With this extension, you can right-click on any selected text, choose "Summarize Text," and receive a concise summary directly on the webpage.

## Features

- Adds a "Summarize Text" option to the right-click context menu.
- Uses the Gemini AI API to generate concise summaries.
- Displays the summarized text with a sleek, dismissible UI.
- Includes a loading animation for better user experience.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the folder containing this extension.
5. The extension will be added to Chrome, and the "Summarize Text" option will appear in the context menu.

## File Structure

- **manifest.json**: Defines the extension's metadata and permissions.
- **background.js**: Handles background tasks, including API calls and context menu events.
- **content.js**: Manages the user interface, including the loading animation and response display.
- **icon.png**: The icon for the extension (optional, replace with your own).

## Usage

1. Highlight any text on a webpage.
2. Right-click and select **Summarize Text**.
3. Wait for the AI-generated summary to appear on the webpage.

## Dependencies

- Gemini AI API: Used for text summarization. Make sure to replace the `API_KEY` in `background.js` with your own API key.



## Acknowledgments

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Gemini AI API Documentation](https://developers.generative.ai/)

---
