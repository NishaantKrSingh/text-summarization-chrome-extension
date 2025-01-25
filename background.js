// Create the context menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "simplifyText",
    title: "Summarize Text",
    contexts: ["selection"] // Only show the option when text is selected
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "simplifyText" && info.selectionText) {
    const API_URL =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"; // Replace with your API endpoint
    const API_KEY = "API_KEY"; // Replace with your actual API key

    try {
      // Notify the content script to show the loading animation
      chrome.tabs.sendMessage(tab.id, { type: "showLoading" });
      // Construct the payload
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Provide a concise explanation for this: ${info.selectionText}` // Dynamically insert the selected text
              }
            ]
          }
        ]
      };

      console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

      // Make the API request
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const rawResponse = await response.text(); // Log the raw response for debugging
      console.log("Raw Response from API:", rawResponse);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${rawResponse}`);
      }

      const data = JSON.parse(rawResponse); // Parse the JSON response
      console.log("Parsed Response from API:", data);

      // Extract the simplified text
      const simplifiedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No simplification provided.";

      // Send the simplified text to the content script
      chrome.tabs.sendMessage(tab.id, { simplifiedText });
    } catch (error) {
      console.error("Error calling Gemini AI API:", error);

      // Send an error message to the content script
      chrome.tabs.sendMessage(tab.id, { error: "Error simplifying text. Please check the console for details." });
    }
  }
});
